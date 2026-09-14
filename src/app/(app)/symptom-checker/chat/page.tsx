// 'use client';

// import React, {
//   Suspense,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { symptoms } from '@/data/symptoms';
// import { symptomQuestions } from '@/data/questions';
// import { evaluateSymptomTriage } from '@/lib/triage';
// import { SymptomOutcome } from '@/lib/types';

// interface Message {
//   id: string;
//   sender: 'user' | 'bot';
//   text: string;
//   options?: string[];
//   questionId?: string;
// }

// interface AssessmentResult {
//   outcome: SymptomOutcome;
//   title: string;
//   guidance: string;
// }

// function SymptomCheckerChatPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const symptomId = searchParams.get('symptom') || '';

//   const currentSymptom = symptoms.find((s) => s.id === symptomId);
//   const questions = symptomId
//     ? symptomQuestions[symptomId] || []
//     : [];

//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [inputText, setInputText] = useState('');
//   const [assessmentResult, setAssessmentResult] =
//     useState<AssessmentResult | null>(null);

//   // Initialize chat dynamically: works for specific symptoms OR direct open
//   const [messages, setMessages] = useState<Message[]>(() => {
//     if (currentSymptom) {
//       const initial: Message[] = [
//         {
//           id: '1',
//           sender: 'user',
//           text: `I've been feeling ${currentSymptom.name.toLowerCase()}.`,
//         },
//         {
//           id: '2',
//           sender: 'bot',
//           text: "I'm sorry to hear that. Let's figure out what might be going on. You can tap an option or type your response below.",
//         },
//       ];

//       if (questions.length > 0) {
//         initial.push({
//           id: `q-${questions[0].id}`,
//           sender: 'bot',
//           text: questions[0].question,
//           options: questions[0].options,
//           questionId: questions[0].id,
//         });
//       }

//       return initial;
//     }

//     // Direct access fallback greeting
//     return [
//       {
//         id: '1',
//         sender: 'bot',
//         text: "Hello! I'm your symptom assistant. What are you experiencing today? Type your symptoms below.",
//       },
//     ];
//   });

//   const chatEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }, [messages, assessmentResult]);

//   const handleAnswerSubmit = (
//     answerText: string,
//     questionId?: string
//   ) => {
//     if (!answerText.trim()) return;

//     const userMsg: Message = {
//       id: Date.now().toString(),
//       sender: 'user',
//       text: answerText,
//     };

//     if (symptomId && questions.length > 0) {
//       const targetQuestionId =
//         questionId || questions[currentStepIndex]?.id;

//       if (!targetQuestionId) return;

//       const updatedAnswers = {
//         ...answers,
//         [targetQuestionId]: answerText,
//       };

//       setAnswers(updatedAnswers);

//       if (currentStepIndex < questions.length - 1) {
//         const nextStep = currentStepIndex + 1;
//         setCurrentStepIndex(nextStep);

//         const nextQ = questions[nextStep];

//         const nextBotMsg: Message = {
//           id: `q-${nextQ.id}`,
//           sender: 'bot',
//           text: nextQ.question,
//           options: nextQ.options,
//           questionId: nextQ.id,
//         };

//         setMessages((prev) => [
//           ...prev,
//           userMsg,
//           nextBotMsg,
//         ]);
//       } else {
//         setMessages((prev) => [...prev, userMsg]);

//         const finalResult = evaluateSymptomTriage({
//           symptomId,
//           answers: updatedAnswers,
//         });

//         setAssessmentResult(finalResult);
//       }
//     } else {
//       // General conversational flow if no specific symptom was pre-selected
//       const botReply: Message = {
//         id: (Date.now() + 1).toString(),
//         sender: 'bot',
//         text: 'Thank you for describing how you feel. How long have you had these symptoms, and are you experiencing any pain or discomfort?',
//       };

//       setMessages((prev) => [
//         ...prev,
//         userMsg,
//         botReply,
//       ]);
//     }

//     setInputText('');
//   };

//   return (
//     <div className="mx-auto max-w-2xl px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-4rem)]">
//       {/* Top Header */}
//       <div className="flex items-center justify-between border-b border-brand-line/60 pb-4">
//         <button
//           type="button"
//           onClick={() => router.back()}
//           className="flex items-center gap-1.5 rounded-full p-2 text-brand-ink/70 hover:bg-black/5"
//         >
//           <svg
//             className="h-5 w-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>

//           <span className="hidden sm:inline text-xs font-semibold">
//             Back
//           </span>
//         </button>

//         <div className="text-center">
//           <h1 className="font-display text-base sm:text-lg font-bold text-brand-ink">
//             {currentSymptom
//               ? currentSymptom.name
//               : 'Symptom Checker'}
//           </h1>
//         </div>

//         <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
//           Verified
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 space-y-4 py-4 overflow-y-auto">
//         {messages.map((msg) => (
//           <div key={msg.id} className="space-y-3">
//             <div
//               className={`flex ${
//                 msg.sender === 'user'
//                   ? 'justify-end'
//                   : 'justify-start'
//               }`}
//             >
//               <div
//                 className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm ${
//                   msg.sender === 'user'
//                     ? 'bg-emerald-700 font-medium text-white'
//                     : 'border border-brand-line/60 bg-white text-brand-ink/90'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>

//             {msg.options &&
//               msg.questionId &&
//               !answers[msg.questionId] && (
//                 <div className="flex flex-wrap gap-2 pl-2">
//                   {msg.options.map((opt) => (
//                     <button
//                       key={opt}
//                       type="button"
//                       onClick={() =>
//                         handleAnswerSubmit(
//                           opt,
//                           msg.questionId
//                         )
//                       }
//                       className="rounded-xl border border-emerald-600/30 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-600 hover:text-white transition-all"
//                     >
//                       {opt}
//                     </button>
//                   ))}
//                 </div>
//               )}
//           </div>
//         ))}

//         {assessmentResult && (
//           <div
//             className={`space-y-2 rounded-2xl border p-5 shadow-sm ${
//               assessmentResult.outcome === 'urgent'
//                 ? 'border-red-200 bg-red-50 text-red-950'
//                 : assessmentResult.outcome ===
//                     'seek-care-soon'
//                 ? 'border-amber-200 bg-amber-50 text-amber-950'
//                 : 'border-emerald-200 bg-emerald-50 text-emerald-950'
//             }`}
//           >
//             <h3 className="font-display text-sm font-bold">
//               {assessmentResult.title}
//             </h3>

//             <p className="text-xs sm:text-sm leading-relaxed opacity-90">
//               {assessmentResult.guidance}
//             </p>
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>

//       {/* Input Bar */}
//       {!assessmentResult && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleAnswerSubmit(inputText);
//           }}
//           className="sticky bottom-2 mt-auto pt-2 bg-brand-paper/80 backdrop-blur"
//         >
//           <div className="relative flex items-center">
//             <input
//               type="text"
//               value={inputText}
//               onChange={(e) =>
//                 setInputText(e.target.value)
//               }
//               placeholder="Type your message or answer..."
//               className="w-full rounded-2xl border border-brand-line/80 bg-white py-3.5 pl-4 pr-12 text-xs sm:text-sm font-medium text-brand-ink placeholder:text-brand-ink/40 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
//             />

//             <button
//               type="submit"
//               disabled={!inputText.trim()}
//               className="absolute right-2 rounded-xl bg-emerald-700 p-2 text-white transition-opacity disabled:opacity-30 hover:bg-emerald-800"
//             >
//               <svg
//                 className="h-4 w-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <Suspense fallback={null}>
//       <SymptomCheckerChatPage />
//     </Suspense>
//   );
// }


'use client';

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { symptoms } from '@/data/symptoms';
import { symptomQuestions } from '@/data/questions';
import { evaluateSymptomTriage } from '@/lib/triage';
import { SymptomOutcome } from '@/lib/types';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  options?: string[];
  questionId?: string;
}

interface AssessmentResult {
  outcome: SymptomOutcome;
  title: string;
  guidance: string;
}

/**
 * Maps free-form user text to a recognized symptom ID using keyphrase detection.
 */
function detectSymptomFromText(inputText: string): string | null {
  const text = inputText.toLowerCase();

  const keywordMap: Record<string, string[]> = {
    headache: [
      'headache',
      'head pain',
      'migraine',
      'headache since',
      'throbbing head',
    ],
    nausea: [
      'nausea',
      'vomiting',
      'throw up',
      'sick to my stomach',
      'morning sickness',
    ],
    swelling: [
      'swelling',
      'swollen',
      'puffy feet',
      'swollen hands',
      'edema',
    ],
    fever: ['fever', 'high temperature', 'chills', 'feverish'],
    cramping: ['cramps', 'cramping', 'pelvic pain', 'lower belly pain'],
  };

  for (const [symptomId, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return symptomId;
    }
  }

  return null;
}

function SymptomCheckerChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active symptom ID (from URL parameter or dynamically detected)
  const [activeSymptomId, setActiveSymptomId] = useState<string>(
    searchParams.get('symptom') || ''
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState('');
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat state on mount
  useEffect(() => {
    const initialSymptom = searchParams.get('symptom') || '';

    if (initialSymptom) {
      setActiveSymptomId(initialSymptom);
      const matchedSymptom = symptoms.find((s) => s.id === initialSymptom);
      const questions = symptomQuestions[initialSymptom] || [];

      const initial: Message[] = [
        {
          id: '1',
          sender: 'user',
          text: `I've been feeling ${
            matchedSymptom?.name.toLowerCase() || initialSymptom
          }.`,
        },
        {
          id: '2',
          sender: 'bot',
          text: "I'm sorry to hear that. Let's ask a few questions to evaluate your symptoms.",
        },
      ];

      if (questions.length > 0) {
        initial.push({
          id: `q-${questions[0].id}`,
          sender: 'bot',
          text: questions[0].question,
          options: questions[0].options,
          questionId: questions[0].id,
        });
      }

      setMessages(initial);
    } else {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: "Hello! I'm your symptom assistant. What are you experiencing today? Type your symptoms below.",
        },
      ]);
    }
  }, [searchParams]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, assessmentResult]);

  const handleAnswerSubmit = (
    answerText: string,
    questionId?: string
  ) => {
    if (!answerText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: answerText,
    };

    let currentId = activeSymptomId;

    // Smart Matching: Detect symptom if not set
    if (!currentId) {
      const detectedId = detectSymptomFromText(answerText);

      if (detectedId) {
        currentId = detectedId;
        setActiveSymptomId(detectedId);

        const questions = symptomQuestions[detectedId] || [];

        const botAckMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `I understand you're experiencing symptoms related to ${detectedId}. Let me ask you a few targeted questions to evaluate how you're feeling.`,
        };

        if (questions.length > 0) {
          const firstQuestionMsg: Message = {
            id: `q-${questions[0].id}`,
            sender: 'bot',
            text: questions[0].question,
            options: questions[0].options,
            questionId: questions[0].id,
          };

          setMessages((prev) => [
            ...prev,
            userMsg,
            botAckMsg,
            firstQuestionMsg,
          ]);
        } else {
          setMessages((prev) => [...prev, userMsg, botAckMsg]);
        }

        setInputText('');
        return;
      }
    }

    // Process structured questions if a symptom is active
    const questions = currentId ? symptomQuestions[currentId] || [] : [];

    if (currentId && questions.length > 0) {
      const targetQuestionId =
        questionId || questions[currentStepIndex]?.id;

      if (!targetQuestionId) return;

      const updatedAnswers = {
        ...answers,
        [targetQuestionId]: answerText,
      };

      setAnswers(updatedAnswers);

      if (currentStepIndex < questions.length - 1) {
        const nextStep = currentStepIndex + 1;
        setCurrentStepIndex(nextStep);

        const nextQ = questions[nextStep];

        const nextBotMsg: Message = {
          id: `q-${nextQ.id}`,
          sender: 'bot',
          text: nextQ.question,
          options: nextQ.options,
          questionId: nextQ.id,
        };

        setMessages((prev) => [...prev, userMsg, nextBotMsg]);
      } else {
        setMessages((prev) => [...prev, userMsg]);

        const finalResult = evaluateSymptomTriage({
          symptomId: currentId,
          answers: updatedAnswers,
        });

        setAssessmentResult(finalResult);
      }
    } else {
      // General fallback if no keyword is recognized
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "Could you describe your symptoms in a bit more detail? For example, let me know if you are experiencing a headache, nausea, swelling, or cramping.",
      };

      setMessages((prev) => [...prev, userMsg, botReply]);
    }

    setInputText('');
  };

  const activeSymptomObj = symptoms.find((s) => s.id === activeSymptomId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-brand-line/60 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 rounded-full p-2 text-brand-ink/70 hover:bg-black/5"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>

          <span className="hidden sm:inline text-xs font-semibold">
            Back
          </span>
        </button>

        <div className="text-center">
          <h1 className="font-display text-base sm:text-lg font-bold text-brand-ink capitalize">
            {activeSymptomObj
              ? activeSymptomObj.name
              : activeSymptomId || 'Symptom Checker'}
          </h1>
        </div>

        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Verified
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 py-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-3">
            <div
              className={`flex ${
                msg.sender === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 font-medium text-white'
                    : 'border border-brand-line/60 bg-white text-brand-ink/90'
                }`}
              >
                {msg.text}
              </div>
            </div>

            {msg.options &&
              msg.questionId &&
              !answers[msg.questionId] && (
                <div className="flex flex-wrap gap-2 pl-2">
                  {msg.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        handleAnswerSubmit(opt, msg.questionId)
                      }
                      className="rounded-xl border border-emerald-600/30 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}

        {assessmentResult && (
          <div
            className={`space-y-2 rounded-2xl border p-5 shadow-sm ${
              assessmentResult.outcome === 'urgent'
                ? 'border-red-200 bg-red-50 text-red-950'
                : assessmentResult.outcome === 'seek-care-soon'
                ? 'border-amber-200 bg-amber-50 text-amber-950'
                : 'border-emerald-200 bg-emerald-50 text-emerald-950'
            }`}
          >
            <h3 className="font-display text-sm font-bold">
              {assessmentResult.title}
            </h3>

            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {assessmentResult.guidance}
            </p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      {!assessmentResult && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnswerSubmit(inputText);
          }}
          className="sticky bottom-2 mt-auto pt-2 bg-brand-paper/80 backdrop-blur"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message or answer..."
              className="w-full rounded-2xl border border-brand-line/80 bg-white py-3.5 pl-4 pr-12 text-xs sm:text-sm font-medium text-brand-ink placeholder:text-brand-ink/40 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-2 rounded-xl bg-emerald-700 p-2 text-white transition-opacity disabled:opacity-30 hover:bg-emerald-800"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SymptomCheckerChatPage />
    </Suspense>
  );
}