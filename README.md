# Migration Instructions

This document provides instructions on how to migrate the vocabulary data from the TypeScript file to the SQLite database.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm

## Steps

1. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

2. **Run Migration Script**

   Run the following command to execute the migration script:

   ```bash
   npm run migrate
   ```

   This will move the data from `src/data/vocabularyData.ts` to the SQLite database.

3. **Start the Application**

   Run the following command to start the application:

   ```bash
   npm run dev
   ```

   The application should now fetch data from the SQLite database instead of the TypeScript file.
