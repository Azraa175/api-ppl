import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { createError } from "../utilities/createError";
import { UserData } from "../types/user";

export const userService = {
  // GET all users
  async getAllUsers() {
    return prisma.user.findMany({
      orderBy: {
        id: 'asc'
      }
    })
  },

  // GET user by ID
  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        notelp: true,
      },
    });

    if (!user) createError("id tidak ditemukan", 404);

    return user;
  },

  // UPDATE user by ID
  async updateUserById(id: number, data: UserData) {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) createError("id tidak ditemukan", 404);

    //cek duplikat email
    if(data.email) {
      const emailExist = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: {
            id
          }
        }
      });

      if(emailExist) createError("email sudah digunakan", 400)
    }

    if (data.password) {
      if(data.password.length < 6) createError ("password minimal 6 karakter", 400);
      data.password = await bcrypt.hash(data.password, 10)
    }

    return prisma.user.update({
      where: { id },
      data,
    });
  },

  // DELETE user by ID
  async deleteUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) createError("id tidak ditemukan", 404);

    return prisma.user.delete({
      where: { id },
    });
  },
};