import { GQLResolvers } from "__generated__/resolvers-types";
import { UsersResolver } from "./UsersResolver";
import { mergeDeep } from "@utils/deepMerge.js";

const resolversMerge = {};
mergeDeep(resolversMerge, UsersResolver);

export const resolvers: GQLResolvers = resolversMerge;
