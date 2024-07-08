export interface IAppError {
  message: string
  code?: string
  details?: SQLiteError
}

export interface SQLiteError {
  name: string
  parent: ErrorDetails
  original: ErrorDetails
  sql: string
  parameters: Record<string, any>
  table?: string
  fields?: string[]
  value?: any
  index?: string
  reltype?: string
}

interface ErrorDetails {
  message: string
  errno: number
  code: string
  sql: string
}
