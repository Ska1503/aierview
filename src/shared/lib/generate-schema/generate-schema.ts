import { Thing, WithContext } from 'schema-dts'

// Extracted constant for the context URL
const SCHEMA_ORG_CONTEXT = 'https://schema.org'

/**
 * Adds @context property to a schema object.
 * @param schema - A valid schema object of type `Thing`
 * @returns A schema object with the @context added.
 */
const generateSchema = (schema: Thing): WithContext<Thing> => {
  if (!schema || typeof schema !== 'object') {
    throw new Error('Schema must be a non-null object')
  }

  return {
    '@context': SCHEMA_ORG_CONTEXT,
    ...schema
  }
}

export default generateSchema
