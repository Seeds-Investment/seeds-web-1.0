export function getErrorMessage(error: unknown): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (Boolean(((error as any).response?.data?.message)))
    ) {
      return String((error as any).response.data.message);
    }
  
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string'
    ) {
      return (error as any).message;
    }
  
    return 'Something went wrong. Please try again.';
  }
  
