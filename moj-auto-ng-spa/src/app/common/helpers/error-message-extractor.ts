import { HttpErrorResponse } from '@angular/common/http';

export function extractErrorMessageFromResponse(error: HttpErrorResponse, defaultMessage?: string): string {
    if (error.status === 500) {
        return 'Greška na serveru. Kontaktirajte podršku';
    }

    if (error.status === 401) {
        return 'Neovlašćen pristup!';
    }

    if (!!error.error && error.error.Message) {
        return error.error.Message;
    }

    if (defaultMessage) {
        return defaultMessage;
    }

    return error.message;
}
