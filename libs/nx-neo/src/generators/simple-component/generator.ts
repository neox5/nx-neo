import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from "@nrwl/devkit";
import * as path from "path";
import { SimpleComponentGeneratorSchema } from "./schema";
import { NormalizedSchema, normalizeOptions } from "../../utils";

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: "",
  };
  generateFiles(
    tree,
    path.join(__dirname, "files"),
    options.projectRoot,
    templateOptions
  );
}

export default async function (
  tree: Tree,
  options: SimpleComponentGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, getWorkspaceLayout(tree).libsDir ,options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: "library",
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: "@nx-neo/nx-neo:build",
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
