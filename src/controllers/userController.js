import * as userService from "../services/userService.js";


export const getProfile = async (req, res, next) => {
try {
const user = await userService.getUserById(req.user.id);
res.json({ id: user.id, name: user.name, email: user.email, balance: user.balance });
} catch (err) {
next(err);
}
};


export const updateProfile = async (req, res, next) => {
try {
const { name } = req.body;
const updated = await userService.updateUser(req.user.id, { name });
res.json(updated);
} catch (err) {
next(err);
}
};


export const deleteAccount = async (req, res, next) => {
try {
await userService.deleteUser(req.user.id);
res.json({ message: "Account deleted" });
} catch (err) {
next(err);
}
};