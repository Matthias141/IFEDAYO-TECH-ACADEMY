import assert from "node:assert/strict";
import { test, type TestContext } from "node:test";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/bookings/route";

const supabaseUrl = "https://supabase.test";
const anonKey = "test-anon-key";
const authorization = "Bearer test-user-token";
const userId = "5b29d574-4d17-45f9-9a06-6cc8c3f5fc8d";
const ownBooking = { id: "bcdd6ff7-1669-46dc-ad2d-f73bf07aa2b4", user_id: userId };
const otherBooking = {
  id: "848c63ab-3308-438e-acc3-f468ddafb69e",
  user_id: "f943f2e0-8ed3-4b49-8203-d11793ffa0a5",
};

function mockSupabase(t: TestContext) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrl;
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = anonKey;

  const requests: Request[] = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    requests.push(request);
    const url = new URL(request.url);

    if (url.pathname === "/auth/v1/user") {
      return request.headers.get("authorization") === authorization
        ? Response.json({ id: userId })
        : Response.json({ code: "bad_jwt", message: "Invalid token" }, { status: 401 });
    }

    if (url.pathname === "/rest/v1/bookings") {
      const ownerFilter = url.searchParams.get("user_id");
      const booking = [ownBooking, otherBooking].find(
        (row) =>
          url.searchParams.get("id") === `eq.${row.id}` &&
          (!ownerFilter || ownerFilter === `eq.${row.user_id}`)
      );
      return booking
        ? Response.json(booking)
        : Response.json({ code: "PGRST116", message: "No rows found" }, { status: 406 });
    }

    throw new Error(`Unexpected Supabase path: ${url.pathname}`);
  });
  return requests;
}

function bookingRequest(id?: string, token?: string) {
  const url = new URL("http://localhost/api/bookings");
  if (id) url.searchParams.set("id", id);
  return new NextRequest(url, { headers: token ? { authorization: token } : {} });
}

function assertScopedRead(requests: Request[], id: string) {
  assert.deepEqual(requests.map((request) => new URL(request.url).pathname), [
    "/auth/v1/user",
    "/rest/v1/bookings",
  ]);
  for (const request of requests) {
    assert.equal(new URL(request.url).origin, supabaseUrl);
    assert.equal(request.headers.get("apikey"), anonKey);
    assert.equal(request.headers.get("authorization"), authorization);
  }
  const { searchParams } = new URL(requests[1].url);
  assert.deepEqual(searchParams.getAll("id"), [`eq.${id}`]);
  assert.deepEqual(searchParams.getAll("user_id"), [`eq.${userId}`]);
}

test("anonymous requests get 401 without querying Supabase", async (t) => {
  const requests = mockSupabase(t);
  const response = await GET(bookingRequest(ownBooking.id));

  assert.equal(response.status, 401);
  assert.equal(response.headers.get("WWW-Authenticate"), "Bearer");
  assert.deepEqual(await response.json(), { success: false, error: "Authentication required" });
  assert.equal(requests.length, 0);
});

test("malformed authorization gets 401 without querying Supabase", async (t) => {
  const requests = mockSupabase(t);
  const response = await GET(bookingRequest(ownBooking.id, "Bearer token extra"));

  assert.equal(response.status, 401);
  assert.equal(requests.length, 0);
});

test("an invalid token gets 401 without querying bookings", async (t) => {
  const requests = mockSupabase(t);
  const response = await GET(bookingRequest(ownBooking.id, "Bearer invalid-token"));

  assert.equal(response.status, 401);
  assert.deepEqual(requests.map((request) => new URL(request.url).pathname), ["/auth/v1/user"]);
});

test("an authenticated request without a booking ID gets 400", async (t) => {
  const requests = mockSupabase(t);
  const response = await GET(bookingRequest(undefined, authorization));

  assert.equal(response.status, 400);
  assert.deepEqual(requests.map((request) => new URL(request.url).pathname), ["/auth/v1/user"]);
});

test("an authenticated request for another user's booking gets 404", async (t) => {
  const requests = mockSupabase(t);
  const response = await GET(bookingRequest(otherBooking.id, authorization));

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { success: false, error: "Booking not found" });
  assertScopedRead(requests, otherBooking.id);
});

test("an owner can read their booking and the response cannot be cached", async (t) => {
  const requests = mockSupabase(t);
  const response = await GET(bookingRequest(ownBooking.id, authorization));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.deepEqual(await response.json(), { success: true, data: ownBooking });
  assertScopedRead(requests, ownBooking.id);
});
