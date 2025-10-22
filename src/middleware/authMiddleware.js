import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";


const authMiddleware = async (req, res, next) => {
try {
const header = req.headers.authorization;
if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });


const token = header.split(" ")[1];
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await prisma.user.findUnique({ where: { id: payload.userId } });
if (!user) return res.status(401).json({ message: "Unauthorized" });


req.user = user; // attach full user object (beware of sensitivity)
next();
} catch (err) {
console.error(err);
return res.status(401).json({ message: "Invalid or expired token" });
}
};


export default authMiddleware;