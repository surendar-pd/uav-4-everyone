import { type SchemaTypeDefinition } from 'sanity'
import { pageType } from './page'
import { calloutBlock } from './blocks/calloutBlock'
import { codeBlock } from './blocks/codeBlock'
import { imageBlock } from './blocks/imageBlock'
import { tableBlock } from './blocks/tableBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageType,
    calloutBlock,
    codeBlock,
    imageBlock,
    tableBlock,
  ],
}
