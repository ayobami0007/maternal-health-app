import { journalPrompts } from "@/data/journalPrompts";
import ScreenStub from "@/components/ScreenStub";

export default function JournalPage() {
  return (
    <ScreenStub
      status="Stub — pending interviews"
      title="Prompted journal"
      painPoint="Blank journals get abandoned. Prompts give structure while still leaving room for the two things people actually want: emotional processing now, and a family medical record later."
    >
      <div>
        <h2 className="font-display text-lg text-brand-indigo">
          Sample prompts (mock data)
        </h2>
        <ul className="mt-2 space-y-1 text-sm text-brand-ink/70">
          {journalPrompts.map((p) => (
            <li key={p.id}>· {p.text}</li>
          ))}
        </ul>
      </div>
    </ScreenStub>
  );
}