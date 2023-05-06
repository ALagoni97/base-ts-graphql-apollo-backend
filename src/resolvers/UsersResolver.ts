import { GQLResolvers } from "__generated__/resolvers-types";

export const UsersResolver: GQLResolvers = {
  Query: {
    fetchUser: async (_, { userId }, ctx) => {
      const user = await ctx.database.user.findFirstOrThrow({
        where: {
          id: userId,
        },
        include: {
          UserDetails: true,
        },
      });
      return {
        userId: user.id,
        age: user.UserDetails?.age,
        weight: user.UserDetails?.weight,
        height: user.UserDetails?.height,
        sex: user.UserDetails?.sex,
        ...user,
      };
    },
  },
  Mutation: {
    updateUser: async (_, { userId, input }, ctx) => {
      await ctx.database.userDetails.update({
        where: {
          userId: userId,
        },
        data: {
          name: input.name,
        },
      });

      return true;
    },
  },
};
