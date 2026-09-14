import { symptoms } from '@/data/symptoms';

// Common synonyms mapping to main symptom IDs
const synonymMap: Record<string, string> = {
  // Headaches
  migraine: 'headache',
  headache: 'headache',
  throbbing: 'headache',
  'head pressure': 'headache',

  // Nausea / Digestive
  nausea: 'nausea',
  vomiting: 'nausea',
  'throwing up': 'nausea',
  'sick to stomach': 'nausea',
  queasy: 'nausea',

  // Back Pain
  'back pain': 'back-pain',
  'back ache': 'back-pain',
  'lower back': 'back-pain',
  lumbago: 'back-pain',

  // Swelling / Edema
  swelling: 'swelling',
  edema: 'swelling',
  'puffy feet': 'swelling',
  'swollen ankles': 'swelling',
};

export interface SymptomSearchResult {
  id: string;
  name: string;
  description?: string;
  isExactMatch: boolean;
}

export function searchSymptoms(query: string): SymptomSearchResult[] {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) return [];

  // 1. Direct synonym lookup
  const matchedIdFromSynonym = synonymMap[cleanQuery];

  // 2. Filter base symptoms list
  return symptoms
    .filter((symptom) => {
      const nameMatch = symptom.name.toLowerCase().includes(cleanQuery);
      const idMatch = symptom.id.toLowerCase().includes(cleanQuery);
      const isSynonymMatch = matchedIdFromSynonym === symptom.id;
      return nameMatch || idMatch || isSynonymMatch;
    })
    .map((symptom) => ({
      id: symptom.id,
      name: symptom.name,
      description: symptom.description,
      isExactMatch:
        symptom.id === matchedIdFromSynonym ||
        symptom.name.toLowerCase() === cleanQuery,
    }));
}