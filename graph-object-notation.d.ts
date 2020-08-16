declare module "graph-object-notation" {
  import { stringify, parse } from "graph-object-notation";

  function stringify(
    objectToSerialize: object,
    replacer?: null,
    spaces?: number,
    target?: string
  ): string;

  function parse(stringToBeParsed: string): { data: object | array };

  export { stringify, parse };
}
