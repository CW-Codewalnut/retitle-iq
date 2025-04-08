import { createClerkClient } from "@clerk/react-router/api.server";

export const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
});

export function getUserData(userId: string) {
	return clerkClient.users.getUser(userId);
}
