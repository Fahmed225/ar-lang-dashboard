import { insertVocabularyItem } from './db';
import { VocabularyItem } from './data/vocabularyData';
import vocabularyData from './data/vocabularyData';

const migrateData = async () => {
  for (const item of vocabularyData) {
    await insertVocabularyItem(item as VocabularyItem);
  }
  console.log('Data migration completed.');
};

migrateData().catch((error) => {
  console.error('Data migration failed:', error);
});
