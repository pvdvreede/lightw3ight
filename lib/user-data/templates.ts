import { readFileSync } from "fs";


function readTemplate(templateName: string): string {
  return readFileSync(path);
}

function parseCfnSignal(asgLogicalName: string): string {
  return eval(readTemplate("cfn-signal"));
}

export class TemplateBuilder {

}
