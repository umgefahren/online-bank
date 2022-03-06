import { PrismaClient, type Ledger, type LedgerRecord, type User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect();
    })

export async function CreateUser(firstName: string, lastName: string, userName: string, passwordHash: string): Promise<User> {
    let outUser = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            userName: userName.toLowerCase(),
            passwordHash: passwordHash,
        },
    })
    return outUser;
}

export async function GetUser(userId: number): Promise<User> {
    let outUser = await prisma.user.findFirst({
        where: {
            userId: {
                equals: userId,
            }
        }
    });
    return outUser;
}

export async function UserNameExists(potentialUserName: String): Promise<boolean> {
    let users = await prisma.user.findMany({
        where: {
            userName: {
                equals: potentialUserName.toLowerCase(),
            }
        }
    });
    return users.length == 0;
}

export async function GetUserByUsername(username: string): Promise<User> {
    let user = await prisma.user.findFirst({
        where: {
            userName: {
                equals: username.toLocaleLowerCase(),
            }
        }
    });
    return user;
}

export async function CreateLedger(user: User, name: string, description: string): Promise<Ledger> {
    const ledger = await prisma.ledger.create({
        data: {
            owner: {
                connect: {
                    userId: user.userId,
                },
            },
            name: name,
            description: description,
        }
    });
    return ledger;
}

export async function AllLedgersOfUser(user: User): Promise<Ledger[]> {
    const ledgers = await prisma.ledger.findMany({
        where: {
            owner: user,
        },
        orderBy: {
            ledgerId: 'desc',
        },
    });
    return ledgers;
}

export async function GetLedgerByUuid(uuid: string): Promise<Ledger> {
    const ledger = await prisma.ledger.findFirst({
        where: {
            uuid: uuid,
        },
    });
    return ledger;
}

export async function CreateLedgerRecord(outgoing: Ledger, incoming: Ledger, amount: number, description: string): Promise<LedgerRecord> {
    const ledgerRecord = await prisma.ledgerRecord.create({
        data: {
            associatedOutgoingLedger: {
                connect: outgoing,
            },
            associatedIncomingLedger: {
                connect: incoming,
            },
            amount: amount,
            description: description,
        }
    });
    await prisma.ledger.update({
        where: {
            ledgerId: outgoing.ledgerId,
        },
        data: {
            balance: {
                decrement: amount,
            }
        }
    });
    await prisma.ledger.update({
        where: {
            ledgerId: incoming.ledgerId,
        },
        data: {
            balance: {
                increment: amount,
            }
        }
    });
    return ledgerRecord;
}

export async function GetAllLedgerRecords(usersLedger: Ledger): Promise<LedgerRecord[]> {
    let records = await prisma.ledgerRecord.findMany({
        where: {
            OR: [
                {
                    associatedOutgoingLedger: usersLedger,
                },
                {
                    associatedIncomingLedger: usersLedger,
                }
            ]
        }
    });
    return records;
}

export async function GetAllMoney(): Promise<number> {
    const aggregations = await prisma.ledger.aggregate({
        _sum: {
            balance: true,
        },
    });
    let allMoney = aggregations._sum.balance;
    return allMoney;
}

export async function GetAllUsersCount(): Promise<number> {
    const aggregations = await prisma.user.count();
    return aggregations;
}

export async function GetAllLedgerCount(): Promise<number> {
    const count = await prisma.ledger.count();
    return count;
}

export async function GetAllLedgerRecordCount(): Promise<number> {
    const count = await prisma.ledgerRecord.count();
    return count;
}