import { OpenAPIV2 } from 'openapi-types'
import { Config, MockConfig } from './src/utils'

declare function freeSwagger(
  config: Config | string
): Promise<OpenAPIV2.Document>

declare function mock(config: MockConfig | string): Promise<void>

export default freeSwagger
export { mock }
