import yaml from 'js-yaml';
import fs from 'fs';

export const Example = {
  load_yaml: (yaml_path: string) => {
    const yaml_obj = yaml.load(fs.readFileSync(yaml_path).toString()) as any;
    return yaml_obj;
  }
}
