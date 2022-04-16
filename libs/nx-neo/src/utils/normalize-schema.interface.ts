import { SimpleComponentGeneratorSchema } from "../generators/simple-component/schema";

export interface NormalizedSchema extends SimpleComponentGeneratorSchema {
  npmScope?: boolean
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
}