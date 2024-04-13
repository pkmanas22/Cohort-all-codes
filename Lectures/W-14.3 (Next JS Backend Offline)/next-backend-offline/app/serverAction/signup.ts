"use server"

import prisma from "@/db";

export async function signup(username: string, password: string) {

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        });

        return true;
    } catch (error) {
        return false;
    }
}