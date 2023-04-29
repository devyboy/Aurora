import type { User } from "@clerk/nextjs/dist/api";
import type { AuthorType } from "~/server/api/routers/posts";

const filterUsersToAuthor = (user: User): AuthorType => {
    return {
        id: user.id,
        username: user.username || undefined,
        emailAddress: user.emailAddresses[0]?.emailAddress,
        profileImageUrl: user.profileImageUrl,
        firstName: user.firstName,
    };
};

export default filterUsersToAuthor