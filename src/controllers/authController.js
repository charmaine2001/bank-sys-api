import { createUser, getUserByEmail } from "../services/userService.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });


const user = await createUser({ name, email, password });
res.status(201).json({ message: "User created", user });
} catch (err) {
next(err);
}
};


export const login = async (req, res, next) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: "Missing fields" });


const user = await getUserByEmail(email);
if (!user) return res.status(400).json({ message: "Invalid credentials" });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: "Invalid credentials" });


const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, balance: user.balance } });
} catch (err) {
next(err);
}
};