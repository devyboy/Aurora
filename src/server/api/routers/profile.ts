import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const profileRouter = createTRPCRouter({
    getProfileById: publicProcedure.input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const user = await clerkClient.users.getUser(input.id)

            return user
        }),
});
