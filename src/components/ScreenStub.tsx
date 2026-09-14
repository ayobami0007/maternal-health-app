interface ScreenStubProps {
  title: string;
  painPoint: string;
  status: string;
  children?: React.ReactNode;
}

/**
 * Placeholder shell for a screen that isn't built yet.
 * Swap this out for the real screen once its persona/journey work is done.
 */
export default function ScreenStub({
  title,
  painPoint,
  status,
  children,
}: ScreenStubProps) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm tracking-wide text-brand-clay uppercase">
        {status}
      </p>
      <h1 className="mt-3 font-display text-3xl text-brand-indigo">
        {title}
      </h1>
      <p className="mt-4 text-brand-ink/80">{painPoint}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}