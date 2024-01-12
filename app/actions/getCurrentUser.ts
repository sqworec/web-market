import {authOptions} from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb";
import {getServerSession} from "next-auth";
import {exportAppRoute} from "next/dist/export/routes/app-route";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null
        }

        return currentUser
    } catch (error: any) {
        return null
    }
}