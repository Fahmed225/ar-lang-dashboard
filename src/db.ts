import Database from 'better-sqlite3';
import { VocabularyItem } from "./data/vocabularyData";

const db = new Database("vocabulary.db", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS vocabulary (
    id INTEGER PRIMARY KEY,
    arabic TEXT NOT NULL,
    english TEXT NOT NULL,
    categories TEXT NOT NULL,
    type TEXT NOT NULL,
    conjugations TEXT,
    forms TEXT
  )
`);

export function getVocabularyData(): VocabularyItem[] {
  const stmt = db.prepare("SELECT * FROM vocabulary");
  const rows = stmt.all();
  return rows.map((row) => ({
    ...row,
    english: JSON.parse(row.english),
    categories: JSON.parse(row.categories),
    conjugations: row.conjugations ? JSON.parse(row.conjugations) : undefined,
    forms: row.forms ? JSON.parse(row.forms) : undefined,
  }));
}

export function insertVocabularyItem(item) {
  const stmt = db.prepare(`
    INSERT INTO vocabulary (arabic, english, categories, type, conjugations, forms)
    VALUES (@arabic, @english, @categories, @type, @conjugations, @forms)
  `);
  stmt.run({
    ...item,
    english: JSON.stringify(item.english),
    categories: JSON.stringify(item.categories),
    conjugations: item.conjugations ? JSON.stringify(item.conjugations) : null,
    forms: item.forms ? JSON.stringify(item.forms) : null,
  });
}
