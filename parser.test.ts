import { parseMessage, ExtractedData, ErrorResponse } from '../parser';

describe('Message Parsing', () => {
  test('Valid message should return correct extracted data', () => {
    const message = `MSG|^~&|SenderSystem|Location|ReceiverSystem|Location|20230502112233
                    ||DATA^TYPE|123456|P|2.5
                    EVT|TYPE|20230502112233
                    PRS|1|9876543210^^^Smith^John^A|||M|19800101|
                    DET|1|I|^^MainDepartment^101^Room 1|Common Cold`;

    const result = parseMessage(message);

    expect((result as ExtractedData).fullName).toEqual({
      lastName: 'Smith',
      firstName: 'John',
      middleName: 'A',
    });
    expect((result as ExtractedData).dateOfBirth).toBe('1980-01-01');
    expect((result as ExtractedData).primaryCondition).toBe('Common Cold');
  });

  test('Invalid PRS segment should return error', () => {
    const message = `PRS|1|9876543210^^^Smith^John^A|||M|19800101|`;

    const result = parseMessage(message);
    expect((result as ErrorResponse).error).toBe('Invalid PRS segment: Less than 8 parts');
  });

  test('Missing fields should return error', () => {
    const message = `PRS|1|9876543210^^^Smith^John|||M|19800101|`;

    const result = parseMessage(message);
    expect((result as ErrorResponse).error).toBe('Missing required fields');
  });

  test('Invalid date format should return error', () => {
    const message = `PRS|1|9876543210^^^Smith^John^A|||M|1980-01-01|`;

    const result = parseMessage(message);
    expect((result as ErrorResponse).error).toBe('Invalid date of birth format');
  });
})

