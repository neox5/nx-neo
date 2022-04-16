import { names, Tree, readJson } from "@nrwl/devkit";
import { SimpleComponentGeneratorSchema } from "../generators/simple-component/schema";
import { NormalizedSchema } from "./normalize-schema.interface";

export function normalizeOptions(
  tree: Tree,
  projectBase: string,
  options: SimpleComponentGeneratorSchema
): NormalizedSchema {
  const nxJson = readJson(tree, "nx.json");
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp("/", "g"), "-");
  const projectRoot = `${projectBase}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(",").map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    npmScope: nxJson.npmScope,
  };
}
