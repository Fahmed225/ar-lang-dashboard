type Conjugation = {
  I: string;
  he: string;
  she: string;
  "they (m)": string;
  "they (f)": string;
  we: string;
  "you (m)": string;
  "you (f)": string;
};

type VerbConjugations = {
  present: Conjugation;
  past: Conjugation;
};

type NounForms = {
  singular: string;
  plural: string;
};

type VocabularyItemType = string;

interface VocabularyItem {
  id: number;
  arabic: string;
  english: string[];
  categories: string[];
  type: VocabularyItemType;
  conjugations?: VerbConjugations;
  forms?: NounForms;
}

export type { VocabularyItem, Conjugation, VerbConjugations, NounForms };
