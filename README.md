# Message Parser Application

## Overview
This application processes plain-text messages to extract specific patient information, including patient name, date of birth, and admitting diagnosis. The extracted information is then formatted and returned as a JSON object.

## Application structure
For a larger application, we would separate the code into different layers:

**API Layer**: Handles incoming requests and sends responses.
**Business Logic Layer**: Contains the core parsing and extraction logic.
**Data Access Layer**: Mock database interaction for storing extracted data.
**Utility/Helper Layer**: Additional helpers for validations and format conversions.

## Code Structure
1. **parser.ts**: Contains the core parsing and extraction logic.
2. **parser.test.ts**: Includes tests for the core logic.
3. **server.ts**: (Optional) Sets up an Express.js API to accept plain-text messages, parse them using the core logic, and return the extracted data.

## Project Structure
project-root/
├── src/
│   ├── parser.ts
│   ├── server.ts
│   └── __tests__/
│       └── parser.test.ts
├── tsconfig.json
├── package.json
└── jest.config.js


## Design Considerations
1. **Separation of Concerns:**
   - Core business logic (message parsing) is isolated in `parser.ts`.
   - Presentation logic (API handling) is kept in `server.ts`, ensuring maintainability.
   - This separation ensures that each module has a single responsibility.

2. **Error Handling and Validation:**
   - Thorough validation is performed for name fields, date format, and diagnosis.
   - Errors are handled gracefully, providing meaningful error messages to clients.

3. **Modularity and Scalability:**
   - The code is modular, allowing for easy extension (e.g., adding new fields, supporting new message formats).
   - Scalability is considered by separating business logic from the API layer.

4. **Testing:**
   - Unit tests are written using `jest` to ensure correctness of the message parsing functionality.

5. **Future Extensions:**
   - Support for additional message segments or fields can be added without affecting existing functionality.
   - Database integration could be added by implementing an ORM such as Sequelize or TypeORM.


## Running the Tests
# Install dependencies
npm install

# Run unit tests
npm test

# Testing API end point
# Start the Express Server
npm run start

# Invoke Webrequest - powershell
Invoke-WebRequest -Uri http://localhost:3000/process-message `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body '{"message":"MSG|^~&|SenderSystem|Location|ReceiverSystem|Location|20230502112233\n||DATA^TYPE|123456|P|2.5\nEVT|TYPE|20230502112233\nPRS|1|9876543210^^^Smith^John^A|||M|19800101|\nDET|1|I|^^MainDepartment^101^Room 1|Common Cold"}'
