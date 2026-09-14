import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-brand-paper px-4 py-6 font-sans text-brand-ink sm:px-6 md:px-12">
      <section className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-brand-line bg-white md:min-h-[620px] md:flex-row">
        {/* Image */}
        <div className="relative h-[320px] w-full sm:h-[400px] md:h-auto md:w-1/2">
          <Image
            src="/pregnant_wom.png"
            alt="Pregnant woman sitting surrounded by leafy plants"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:w-1/2 md:px-12 lg:px-16">
          <div className="max-w-md">
            <p className="mb-4 text-sm font-medium tracking-wide text-brand-clay">
              Maternal health
            </p>

            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-brand-indigo sm:text-5xl">
              Know what needs attention.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-brand-ink/70 sm:text-lg">
              Clear guidance for the moments when you&apos;re wondering if
              something is normal.
            </p>

            <div className="mt-8">
              <Link
                href="/onboarding"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-clay px-7 py-4 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-clay focus:ring-offset-2 active:translate-y-0 sm:w-auto"
              >
                <span>Get started</span>

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
