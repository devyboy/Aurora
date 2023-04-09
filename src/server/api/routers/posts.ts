import clerkClient, { type User } from "@clerk/clerk-sdk-node";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const userListFilter = (user: User) => {
    return {
        id: user.id,
        username: user.username || user.emailAddresses[0]?.emailAddress || '',
        profileImageUrl: user.profileImageUrl,
        firstName: user.firstName
    }
}


export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100
        })

        const userIds = (await clerkClient.users.getUserList({
            userId: posts.map((post) => post.authorId),
            limit: 100
        })).map(userListFilter)

        return posts.map((post) => ({
            post,
            author: userIds.find((user) => user.id === post.authorId)
        }))
    }),
});
