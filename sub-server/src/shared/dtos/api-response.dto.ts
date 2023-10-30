export class ApiResponse<T> {
  code: number
  result?: T[] | T

  constructor(code: number, result?: T[] | T) {
    this.code = code
    this.result = result
  }
}
