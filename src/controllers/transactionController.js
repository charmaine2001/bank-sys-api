import * as txService from "../services/transactionService.js";


export const deposit = async (req, res, next) => {
try {
const { amount, note } = req.body;
const tx = await txService.deposit(req.user.id, Number(amount), note || null);
res.status(201).json({ message: "Deposit successful", tx });
} catch (err) {
next(err);
}
};


export const withdraw = async (req, res, next) => {
try {
const { amount, note } = req.body;
const tx = await txService.withdraw(req.user.id, Number(amount), note || null);
res.status(201).json({ message: "Withdraw successful", tx });
} catch (err) {
next(err);
}
};


export const transfer = async (req, res, next) => {
try {
const { toEmail, amount, note } = req.body;
const result = await txService.transfer(req.user.id, toEmail, Number(amount), note || null);
res.status(201).json({ message: "Transfer successful", result });
} catch (err) {
next(err);
}
};


export const history = async (req, res, next) => {
try {
const txs = await txService.getTransactionsByUser(req.user.id);
res.json(txs);
} catch (err) {
next(err);
}
};