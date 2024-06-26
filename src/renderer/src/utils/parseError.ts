import { IAppError } from "@backend/interface/IAppError";

export function parseError(err: unknown): IAppError {
    const e = err as Error;
    const match = e.message.match(/Error: (.*)$/);
    const errorMessage = match ? match[1] : 'Ocorreu um erro desconhecido.';
    try {
      return JSON.parse(errorMessage) as IAppError;
    } catch {
      return { message: errorMessage };
    }
  }