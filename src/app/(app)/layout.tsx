'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Symptom checker', href: '/symptom-checker' },
  { name: 'Journal', href: '/journal' },
  { name: 'Appointments & costs', href: '/appointments' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-brand-paper font-sans text-brand-ink">

      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-brand-line/60 bg-white/50 p-6">
        <div className="space-y-8">
          <Link href="/dashboard" className=" font-display text-2xl font-black text-brand-indigo tracking-tight ">
            maternal.
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  pathname === item.href
                    ? 'bg-brand-sage/15 text-brand-ink shadow-sm'
                    : 'text-brand-ink/60 hover:bg-black/5 hover:text-brand-ink'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-brand-ink/40">A calm place to keep track of your care.</p>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 pb-24 md:pb-12">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-line bg-white/95 backdrop-blur-md px-4 py-3 md:hidden">
        <nav className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-semibold ${
                pathname === item.href ? 'text-brand-clay' : 'text-brand-ink/40'
              }`}
            >
              {item.name.split(' ')[0]}
            </Link>
          ))}
        </nav>
      </div>

    </div>
  );
}