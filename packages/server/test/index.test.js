import path from "path";
import fs from "fs";
// import inquirer from "inquirer";
import freeSwagger from "../src/main";
// import { init } from "../src/bin/init";
import { rc } from "../src/default/rc";

const wait = time =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, time)
  );

const assertFiles = async (dirPath, apiFilesList,shouldInclude = false) => {
  const filesPath = fs.readdirSync(dirPath);
  if(shouldInclude){
    apiFilesList.forEach(filePath => {
      expect(filesPath.includes(filePath)).toBe(true);
    })
  }else{
    expect(filesPath).toEqual(apiFilesList);
  }
  await wait(100);
  filesPath.forEach(filename => {
    if(filename === 'interface'){
    const file = fs.readFileSync(path.resolve(dirPath, filename,'index.ts'), "utf-8");
    expect(file).toMatchSnapshot();
        return
    }
    if(filename === 'typedef'){
      const file = fs.readFileSync(path.resolve(dirPath, filename,'index.js'), "utf-8");
      expect(file).toMatchSnapshot();
      return
    }
    const file = fs.readFileSync(path.resolve(dirPath, filename), "utf-8");
    expect(file).toMatchSnapshot();
  });
};

describe("pkg", () => {
  beforeAll(() => {
    rc.reset();
    global.__DEV__ = true
  });

  test("base option", async () => {
    const dirname = "swaggerPetstore";
    const dirPath = path.resolve(__dirname, "api", "pkg", dirname);
    await freeSwagger({
      source: require(`./json/${dirname}`),
      root: dirPath,
    });
    await assertFiles(dirPath, ["pet.js", "store.js", "user.js"]);
  });

  test("jsdoc", async () => {
    const dirname = "swaggerPetstore";
    const dirPath = path.resolve(__dirname, "api", "pkg", dirname + "1");
    await freeSwagger({
      source: require(`./json/${dirname}`),
      root: dirPath,
      useJsDoc:true
    });
    await assertFiles(dirPath, ["pet.js", "store.js","typedef", "user.js",
    ]);
  });

  test("ts language", async () => {
    const dirname = "uberApi";
    const dirPath = path.resolve(__dirname, "api", "pkg", dirname);
    await freeSwagger({
      source: require(`./json/${dirname}`),
      lang: "ts",
      root: dirPath,
    });
    await assertFiles(dirPath, [
      "auditLog.ts",
      "device.ts",
      "interface",
      "mappers.ts",
      "ymTicketTypical.ts"
    ]);
  });

  test("custom ts template", async () => {
    const dirname = "homeIotApi";
    const dirPath = path.resolve(__dirname, "api", "pkg", dirname);

    await freeSwagger({
      source: require(`./json/${dirname}`),
      root: dirPath,
      lang: "ts",
      templateFunction: ({
                           url,
                           summary,
                           method,
                           name,
                           responseType,
                           deprecated,
                           pathParams,
                           IResponse,
                           IQueryParams,
                           IBodyParams,
                           IPathParams
                         }) => {
        // 处理路径参数
        // `/pet/{id}` => `/pet/${id}`
        const parsedUrl = url.replace(/{(.*?)}/g, '${$1}');

        const onlyIQueryParams = IQueryParams && !IBodyParams
        const onlyIBodyParams = IBodyParams && !IQueryParams
        const multipleParams = IQueryParams && IBodyParams

        return `
  ${deprecated ? `/**deprecated*/` : ""}
  ${summary ? `// ${summary}` : ""}  
  export const ${name} = (${
  onlyIQueryParams
    ? `params: ${IQueryParams},`
    : onlyIBodyParams 
    ? `params: ${IBodyParams},`
    : multipleParams
    ? `params: ${IQueryParams},`
    // no params
    :  IPathParams
    ? "params:{[key:string]: never},"
    : ""
}${
  pathParams.length ? `{${pathParams.join(",")}}: ${IPathParams},` : multipleParams ? "pathParams:{[key:string]: never}," : ""
}${
  multipleParams
    ? `bodyParams: ${IBodyParams}`
    : ""
}) => http.request<${IResponse || "any"},AxiosResponse<${IResponse ||
"any"}>>({
     url: \`${parsedUrl}\`,
     method: "${method}",
     params:${`${ multipleParams ? "queryParams" : IQueryParams ? "params," : "{},"}`}
     data:${`${ multipleParams ? "bodyParams" : IBodyParams ? "params," : "{},"}`}
     ${responseType === "json" ? "" : `responseType: ${responseType}`}
 })`;
},
      customImportCode: `
            import {AxiosResponse} from 'axios'
            import http from 'http'
        `
        ,
    });

    await assertFiles(dirPath, [
      "device.ts",
      "environment.ts",
      "interface",
      "zWave.ts",
      "zones.ts"
    ]);
  });

  test("should work with only one string params", async () => {
    const dirname = "swaggerPetstore1";
    await freeSwagger(path.resolve(__dirname, "json", `${dirname}.json`));
    await assertFiles(path.resolve(__dirname, "api/pkg/default"), ["pet.js", "store.js", "user.js"],true);
  });

  test("should work with only one json params", async () => {
    const dirname = "uberApi1";
    await freeSwagger(require(path.resolve(__dirname, "json", `${dirname}.json`)));
    await assertFiles(path.resolve(__dirname, "api/pkg/default"), [
      "auditLog.js",
      "device.js",
      "mappers.js",
      "ymTicketTypical.js"
    ],true);
  });
});

// todo 缓存测试
// describe("bin", () => {
//   let backup;
//   beforeAll(() => {
//     rc.reset();
//     backup = inquirer.prompt;
//     global.__DEV__ = true
//   });
//   afterAll(() => {
//     inquirer.prompt = backup;
//     rc.reset();
//     global.__DEV__ = false
//   });
//
//   test("zero config", done => {
//     const dirname = "swaggerPetstore";
//     const dirPath = path.resolve(__dirname, "api", "bin", dirname);
//
//     const fnSpy = jest.fn(() =>
//       Promise.resolve({
//         root: dirPath,
//         source: path.resolve(__dirname, `./json/${dirname}.json`)
//       })
//     );
//     inquirer.prompt = fnSpy;
//     init(async () => {
//       await assertFiles(dirPath, ["pet.js", "store.js", "user.js"]);
//       expect(fnSpy).toBeCalledTimes(1);
//       done();
//     });
//   });
//
//   test("can remember previous configuration", () => {
//     expect(rc.configData).toMatchSnapshot();
//   });
//
//   test("ts language", done => {
//     const dirname = "uberApi";
//     const dirPath = path.resolve(__dirname, "api", "bin", dirname);
//
//     inquirer.prompt = () =>
//       Promise.resolve({
//         lang: "ts",
//         root: dirPath,
//         source: path.resolve(__dirname, `./json/${dirname}.json`),
//       });
//     init(async() => {
//      await assertFiles(dirPath, [
//         "auditLog.ts",
//         "device.ts",
//         "interface",
//         "mappers.ts",
//         "ymTicketTypical.ts"
//       ]);
//       done();
//     });
//   });
//
//   test("can remember previous(ts language) configuration", () => {
//     expect(rc.configData).toMatchSnapshot();
//   });
// });
