import { type SearchOptions } from 'flexsearch'

declare module 'flexsearch' {
  export interface Document<T = any> {
    add(doc: T): void
    search(query: string, options?: SearchOptions): Array<{
      result: Array<{
        id: string
        doc: T
      }>
    }>
  }

  interface FlexSearchConstructor {
    Document: new <T = any>(options?: any) => Document<T>
  }

  const FlexSearch: FlexSearchConstructor
  export default FlexSearch
}

declare module '@/markdoc/search.mjs' {
  export type Result = {
    url: string
    title: string
    pageTitle?: string
  }

  export function search(query: string, options?: SearchOptions): Array<Result>
}
