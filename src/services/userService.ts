import prisma from "../lib/prisma";

export const userService = {

    async getAllUsers() {
        return prisma.user.findMany({
            orderBy: {
                id: 'asc' 
            }
        });
    }

}