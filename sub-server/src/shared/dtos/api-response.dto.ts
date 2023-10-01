export class ApiResponse<T> {
  code: number
  result?: T[] | T
}
