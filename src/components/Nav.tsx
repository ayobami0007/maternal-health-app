import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/symptom-checker", label: "Is this normal?" },
  { href: "/journal", label: "Journal" },
  { href: "/appointments", label: "Appointments & costs" },
];

export default function Nav() {
  return (
    <header className="border-b border-brand-line">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg text-brand-indigo">
          [App Name] · maternal health
        </Link>
        <nav className="hidden gap-6 text-sm sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-ink/70 transition-colors hover:text-brand-indigo"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}