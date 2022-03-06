import { GetAllLedgerCount, GetAllMoney, GetAllUsersCount } from "$lib/database";

export async function get() {
    const moneyPromise = GetAllMoney();
    const ledgerPromise = GetAllLedgerCount();
    const ledgerRecordPromise = GetAllLedgerCount();
    const userPromise = GetAllUsersCount();
    let promises = [ moneyPromise, ledgerPromise, ledgerRecordPromise, userPromise ];
    let values = await Promise.all(promises);
    let allMoney = values[0];
    let allLedgers = values[1];
    let allRecords = values[2];
    let allUsers = values[3];
    console.log("Values => ", values);
    return {
        body: {
            allMoney,
            allLedgers,
            allRecords,
            allUsers
        }
    }
}