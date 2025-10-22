import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";


export const createUser = async ({ name, email, password }) => {
const existing = await prisma.user.findUnique({ where: { email } });
if (existing) throw Object.assign(new Error("Email already in use"), { status: 400 });


const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { name, email, password: hashed } });
// don't return password in service-level objects
return { id: user.id, name: user.name, email: user.email, balance: user.balance };
};


export const getUserByEmail = async (email) => {
return prisma.user.findUnique({ where: { email } });
};


export const getUserById = async (id) => {
return prisma.user.findUnique({ where: { id } });
};


export const updateUser = async (id, data) => {
return prisma.user.update({ where: { id }, data });
};


export const deleteUser = async (id) => {
return prisma.user.delete({ where: { id } });
};