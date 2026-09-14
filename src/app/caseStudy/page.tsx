import Link from "next/link";

const screens = [
  {
    href: "/onboarding",
    title: "Onboarding",
    description:
      "A few honest questions instead of a generic sign-up — due date, first pregnancy or not, and what's actually worrying you.",
  },
  {
    href: "/dashboard",
    title: "Home dashboard",
    description:
      "Where you land each visit: this week, what's normal right now, and what's next.",
  },
  {
    href: "/symptom-checker",
    title: '"Is this normal?"',
    description:
      "Log a symptom, get plain-language reassurance — or a clear signal to seek care, no scare tactics either way.",
  },
  {
    href: "/journal",
    title: "Prompted journal",
    description:
      "Structure instead of a blank page. A record for you now, and maybe for your kids later.",
  },
  {
    href: "/appointments",
    title: "Appointments & costs",
    description:
      "Track antenatal contacts against WHO's 8-contact model, and log costs as they come — no surprises left unwritten.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="py-20 sm:py-28">
        <p className="mb-4 text-sm tracking-wide text-clay uppercase">
          Built on real pain points, not assumptions
        </p>
        <h1 className="max-w-2xl font-display text-4xl leading-tight text-indigo sm:text-5xl">
          Pregnancy is unpredictable enough. Your app shouldn&apos;t add to the guessing.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/80">
          A pregnancy companion designed around what Nigerian mothers actually
          struggle with — anxiety between appointments, generic advice that
          doesn&apos;t match real life, and costs that show up unannounced.
        </p>
      </section>

      <section className="border-t border-ink/10 py-16">
        <h2 className="mb-8 font-display text-2xl text-indigo">
          Five screens, each tied to a validated pain point
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {screens.map((screen) => (
            <Link
              key={screen.href}
              href={screen.href}
              className="group rounded-lg border border-ink/10 p-5 transition-colors hover:border-indigo"
            >
              <h3 className="font-display text-lg text-indigo">
                {screen.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                {screen.description}
              </p>
              <span className="mt-4 inline-block text-sm text-clay">
                View stub →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
