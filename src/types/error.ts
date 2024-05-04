import { CustomError } from "ts-custom-error";
import { httpErrorMessages } from "../consts/error";

type HttpErrorMessages = typeof httpErrorMessages;
type HttpErrorCode = keyof HttpErrorMessages;
type HttpErrorMessage<Code extends HttpErrorCode> = HttpErrorMessages[Code];

export class HttpError<
  Code extends HttpErrorCode,
  Message extends HttpErrorMessage<Code>
> extends CustomError {
  code: Code;
  private _message: Message;
  private _customMessage?: string;

  constructor({ code, message }: { code: Code; message?: string }) {
    super();
    this._message = httpErrorMessages[code] as Message;
    this._customMessage = message;
    this.code = code;
  }

  get message() {
    return this._customMessage ?? this._message;
  }
}
