import {
  GQLLoginProviders,
  GQLResolvers,
} from "../__generated__/resolvers-types";

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
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId },
        include: { UserDetails: true },
      });
      await ctx.database.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name || undefined,
        },
      });
      if (!user.UserDetails) {
        // No userdetails created so we create
        await ctx.database.userDetails.create({
          data: {
            userId: userId,
            age: input.age,
            weight: input.weight,
            height: input.height,
            sex: input.sex,
          },
        });
      } else {
        // No userdetails created so we create
        await ctx.database.userDetails.update({
          where: {
            userId: userId,
          },
          data: {
            age: input.age,
            weight: input.weight,
            height: input.height,
            sex: input.sex,
          },
        });
      }

      return true;
    },
  },
};
