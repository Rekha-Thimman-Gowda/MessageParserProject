// Define interfaces for the extracted data
export interface FullName {
  lastName: string;
  firstName: string;
  middleName?: string;
}

export interface ExtractedData {
  fullName: FullName;
  dateOfBirth: string;
  primaryCondition: string;
}

export interface ErrorResponse {
  error: string;
}

// Function to format date of birth
export function formatDateOfBirth(dob: string): string | null {
  if (/^\d{8}$/.test(dob)) {
    return `${dob.slice(0, 4)}-${dob.slice(4, 6)}-${dob.slice(6, 8)}`;
  }
  return null;
}

// Function to parse the incoming message
export function parseMessage(message: string): ExtractedData | ErrorResponse {
  try {
    const lines = message.split('\n');
    let fullName: FullName | null = null;
    let dateOfBirth: string | null = null;
    let primaryCondition: string | null = null;

    for (const line of lines) {
      const parts = line.split('|').map(part => part.trim());

      // Log the parts for debugging
      console.log('Parts:', parts);

      if (parts[0] === 'PRS') {
        if (parts.length < 7) throw new Error('Invalid PRS segment: Less than 7 parts');

        const nameParts = parts[2]?.split('^^^');
        if (nameParts && nameParts.length > 0) {
          const names = nameParts[nameParts.length - 1].split('^');
          if (names.length < 3) throw new Error('Invalid name format in PRS segment');

          fullName = {
            lastName: names[0],
            firstName: names[1],
            middleName: names[2],
          };
          dateOfBirth = parts[6].trim();
        } else {
          throw new Error('Invalid name format in PRS segment');
        }
      }

      if (parts[0] === 'DET') {
        if (parts.length < 5) throw new Error('Invalid DET segment: Less than 5 parts');
        primaryCondition = parts[4].trim();
      }
    }

    // Validate required fields
    if (!fullName || !dateOfBirth || !primaryCondition) {
      throw new Error('Missing required fields');
    }

    const formattedDOB = formatDateOfBirth(dateOfBirth);
    if (!formattedDOB) throw new Error('Invalid date of birth format');

    return {
      fullName,
      dateOfBirth: formattedDOB,
      primaryCondition,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}