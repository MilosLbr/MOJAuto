import { HttpErrorResponse } from '@angular/common/http';

export function extractErrorMessageFromResponse(
  error: HttpErrorResponse,
  defaultMessage?: string
): string {
  if (error.status === 500) {
    return 'Internal server error. Contact support.';
  }

  if (!!error.error && error.error.Message) {
    return error.error.Message;
  }

  if (defaultMessage) {
    return defaultMessage;
  }

  return error.message;
}
