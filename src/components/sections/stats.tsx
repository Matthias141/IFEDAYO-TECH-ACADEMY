"use client";

const stats = [
  {
    value: "50+",
    label: "Students Mentored",
  },
  {
    value: "200+",
    label: "Hours Delivered",
  },
  {
    value: "95%",
    label: "Success Rate",
  },
  {
    value: "5+",
    label: "Years Experience",
  },
];

export function Stats() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple horizontal divider line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
