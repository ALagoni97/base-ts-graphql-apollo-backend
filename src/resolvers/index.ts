import { GQLResolvers } from "__generated__/resolvers-types.js";
import { UsersResolver } from "./UsersResolver";
import { mergeDeep } from "utils";

const resolversMerge = {};
mergeDeep(resolversMerge, UsersResolver);

export const resolvers: GQLResolvers = resolversMerge;
