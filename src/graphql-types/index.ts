import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import * as path from "path";

const filepath = path.join("./src/graphql-types", "*.graphql");
const typesArray = loadFilesSync(filepath);
export const typeDefs = mergeTypeDefs(typesArray);
