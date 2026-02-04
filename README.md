# Ifedayo Tech Academy

A client acquisition website for DevOps training and career coaching services in Nigeria.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Paystack (Nigerian payments)
- **Email**: Resend (transactional emails)

## Features

- Dark theme landing page with glassmorphism design
- Multi-step booking flow for services
- Paystack payment integration (cards, bank transfer, USSD)
- Email confirmations and receipts
- Mobile-responsive design

## Services Offered

1. **DevOps 1-on-1 Mentoring** - ₦15,000 / 60 min (video call)
2. **Tech CV Review** - ₦7,500 / 48hr delivery (async)
3. **Career Strategy Session** - ₦10,000 / 45 min (video call)
4. **DevOps Fundamentals Course** - ₦25,000 (self-paced)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Paystack account
- Resend account

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `PAYSTACK_SECRET_KEY` - Paystack secret key
- `PAYSTACK_PUBLIC_KEY` - Paystack public key
- `PAYSTACK_WEBHOOK_SECRET` - Paystack webhook secret
- `RESEND_API_KEY` - Resend API key
- `NEXT_PUBLIC_APP_URL` - Your app URL

### Database Setup

Run the SQL schema in your Supabase SQL editor:

```bash
# See supabase/schema.sql
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── book/           # Booking flow pages
│   └── page.tsx        # Landing page
├── components/
│   ├── sections/       # Page sections (Hero, Services, etc.)
│   └── ui/             # Reusable UI components
├── lib/                # Utilities and configurations
└── types/              # TypeScript type definitions
```

## Deployment

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Make sure to configure all environment variables in your Vercel project settings.

## License

MIT
