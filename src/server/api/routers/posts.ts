import clerkClient from "@clerk/clerk-sdk-node";
import type { Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import filterUsersToAuthor from "~/utils/filterUsersToAuthor";

const createPostValidator = z.object({ content: z.string().min(1).max(200) });

const AuthorZodType = {
	username: z.optional(z.string()),
	id: z.string(),
	emailAddress: z.optional(z.string()),
	profileImageUrl: z.string(),
	firstName: z.string().nullable()
}

export interface AuthorType {
	username?: string;
	id: string;
	emailAddress?: string;
	profileImageUrl: string;
	firstName: string | null;
}

const addUserDataToPosts = async (posts: Post[], user?: AuthorType) => {
	if (user) {

		return posts.map((post) => ({
			post,
			author: {
				...user,
				username: user.username ?? user.emailAddress,
			},
		}))
	}

	const userIds = posts.map((post) => post.authorId);

	const users = (
		await clerkClient.users.getUserList({
			userId: userIds
		})
	).map(filterUsersToAuthor);

	return posts.map((post) => {
		const author = users.find((user) => user.id === post.authorId);

		if (!author) {
			console.error("AUTHOR NOT FOUND", post);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Author for post not found. POST ID: ${post.id}, USER ID: ${post.authorId}`,
			});
		}

		if (!author.username) {
			if (!author.emailAddress) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Author has no Gmail Account: ${author.id}`,
				});
			}
			author.username = author.emailAddress;
		}
		
		return {
			post,
			author: {
				...author,
				username: author.username ?? "(username not found)",
			},
		};
	});
};

export const postsRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const posts = await ctx.prisma.post.findMany();
		return addUserDataToPosts(posts);
	}),

	getPostById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const post = await ctx.prisma.post.findUnique({
				where: { id: input.id },
			});

			if (!post) throw new TRPCError({ code: "NOT_FOUND" });

			return (await addUserDataToPosts([post]))[0];
		}),

	getPostsByUser: publicProcedure
		.input(z.object({ user: z.object(AuthorZodType) }))
		.query(async ({ ctx, input }) => {
			const posts = await ctx.prisma.post.findMany({
				where: { authorId: input.user.id },
			});

			if (!posts) throw new TRPCError({ code: "NOT_FOUND" });

			return addUserDataToPosts(posts, input.user)
		}),

	createPost: privateProcedure
		.input(createPostValidator)
		.mutation(async ({ ctx, input }) => {
			const authorId = ctx.userId;

			const post = await ctx.prisma.post.create({
				data: {
					content: input.content,
					authorId,
				},
			});

			return post;
		}),
});
