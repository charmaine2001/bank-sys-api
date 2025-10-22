import prisma from "../config/prisma.js";


const WITHDRAWAL_LIMIT = 20; 


export const createTransaction = async (data) => {
return prisma.transaction.create({ data });
};


export const getTransactionsByUser = async (userId) => {
return prisma.transaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
};


export const deposit = async (userId, amount, note) => {
if (amount <= 0) throw Object.assign(new Error("Deposit amount must be positive"), { status: 400 });


const user = await prisma.user.findUnique({ where: { id: userId } });
const newBalance = user.balance + amount;


await prisma.user.update({ where: { id: userId }, data: { balance: newBalance } });
return prisma.transaction.create({ data: { type: "deposit", amount, userId, note } });
};


export const withdraw = async (userId, amount, note) => {
if (amount <= 0) throw Object.assign(new Error("Withdraw amount must be positive"), { status: 400 });
if (amount > WITHDRAWAL_LIMIT) throw Object.assign(new Error(`Withdrawal limit is $${WITHDRAWAL_LIMIT}`), { status: 400 });


const user = await prisma.user.findUnique({ where: { id: userId } });
if (user.balance < amount) throw Object.assign(new Error("Insufficient funds"), { status: 400 });


const newBalance = user.balance - amount;
await prisma.user.update({ where: { id: userId }, data: { balance: newBalance } });
return prisma.transaction.create({ data: { type: "withdraw", amount, userId, note } });
};


export const transfer = async (fromUserId, toUserEmail, amount, note) => {
if (amount <= 0) throw Object.assign(new Error("Transfer amount must be positive"), { status: 400 });


const fromUser = await prisma.user.findUnique({ where: { id: fromUserId } });
const toUser = await prisma.user.findUnique({ where: { email: toUserEmail } });
if (!toUser) throw Object.assign(new Error("Recipient not found"), { status: 404 });
if (fromUser.balance < amount) throw Object.assign(new Error("Insufficient funds"), { status: 400 });


// perform atomic transaction
const result = await prisma.$transaction(async (prismaTx) => {
const updatedFrom = await prismaTx.user.update({ where: { id: fromUserId }, data: { balance: fromUser.balance - amount } });
const updatedTo = await prismaTx.user.update({ where: { id: toUser.id }, data: { balance: toUser.balance + amount } });


const tx1 = await prismaTx.transaction.create({ data: { type: "transfer_debit", amount, userId: fromUserId, counterparty: toUser.id, note } });
const tx2 = await prismaTx.transaction.create({ data: { type: "transfer_credit", amount, userId: toUser.id, counterparty: fromUserId, note } });


return { updatedFrom, updatedTo, tx1, tx2 };
});


return result;
};