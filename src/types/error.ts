import { CustomError } from 'ts-custom-error'

type HttpErrorMessages = typeof httpErrorMessages
type HttpErrorCode = keyof HttpErrorMessages
type HttpErrorMessage<TCode extends HttpErrorCode> = HttpErrorMessages[TCode]


export class HttpError<
  TCode extends HttpErrorCode,
  TMessage extends HttpErrorMessage<TCode>,
> extends CustomError {
  code: TCode
  private _message: TMessage
  private _customMessage?: string

  constructor({ code, message }: { code: TCode; message?: string }) {
    super()
    this._message = httpErrorMessages[code] as TMessage
    this._customMessage = message
    this.code = code
  }

  get message() {
    return this._customMessage ?? this._message
  }
}