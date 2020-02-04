import { OpenAPIV2 } from "openapi-types";
import { TemplateFunction, tsTemplate, jsTemplate } from "free-swagger-client";
import { Config } from "../utils";
import { rc } from "./rc";
import path from "path";

export const DEFAULT_CUSTOM_IMPORT_CODE_TS = `import axios,{ AxiosResponse } from "axios";`;
export const DEFAULT_CUSTOM_IMPORT_CODE_JS = `import axios from "axios";`;

const getDefaultConfig = (
  config: Config
): Required<Omit<Config, "source">> => ({
  root: path.resolve(process.cwd(), "src/api"),
  customImportCode:
    config.lang === "ts"
      ? DEFAULT_CUSTOM_IMPORT_CODE_TS
      : DEFAULT_CUSTOM_IMPORT_CODE_JS,
  lang: "js",
  templateFunction: eval(jsTemplate),
  chooseAll: false
});

export const mergeDefaultConfig = async (
  config: Config | string
): Promise<Required<Config>> => {
  let mergedConfig: Config = <Config>{};

  if (typeof config === "string") {
    mergedConfig.source = config;
    rc.recordHash(mergedConfig.source);
  } else {
    mergedConfig = config;
  }

  let templateFunction: TemplateFunction;
  if (mergedConfig.templateFunction) {
    templateFunction = mergedConfig.templateFunction;
  } else if (!mergedConfig.lang) {
    templateFunction = eval(jsTemplate);
  } else {
    templateFunction = mergedConfig.lang === "ts" ? eval(tsTemplate) : eval(jsTemplate);
  }

  return {
    ...getDefaultConfig(mergedConfig),
    templateFunction,
    ...(<Config<OpenAPIV2.Document>>mergedConfig)
  };
};
