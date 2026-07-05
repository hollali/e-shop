import { type SchemaTypeDefinition } from 'sanity'

import product from '../schemas/product'
import category from '../schemas/category'
import banner from '../schemas/banner'
import vendor from '../schemas/vendor'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, banner, vendor],
}
