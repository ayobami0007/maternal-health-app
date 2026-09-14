import type { JournalPrompt } from "@/lib/types";

/**
 * Starter prompts — designed to give structure instead of a blank page
 * (the #1 reason journaling gets abandoned, per research).
 */
export const journalPrompts: JournalPrompt[] = [
  {
    id: "how-are-you-really",
    text: "How are you really feeling today — physically and emotionally?",
  },
  {
    id: "surprised-you",
    text: "What surprised you about this week?",
  },
  {
    id: "worry-on-your-mind",
    text: "Is there a worry on your mind right now? You don't have to solve it here, just name it.",
  },
  {
    id: "trimester-1-isolation",
    text: "If you haven't told people yet, what's it been like carrying this on your own?",
    trimester: 1,
  },
  {
    id: "message-to-baby",
    text: "Write a short note to your baby about today.",
  },
];