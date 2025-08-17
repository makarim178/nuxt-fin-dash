import { TRANSACTIONT_TYPE_ACTIONS, transactionTypeEnum } from "~~/shared/types/enums";
import type { TransactionType } from "~~/shared/types/enums";

const calculateRunningBalance = (type: TransactionType, amount: number, balance: number) => {
    let description = `${amount.toLocaleString('en-US', {style: 'currency', currency: 'CAD'})} is ${TRANSACTIONT_TYPE_ACTIONS[type]}.`
    switch (type) {
        case 'deposit':
        case 'refund': {
            balance += amount
            return [+balance.toFixed(2), description]
        }
        default: {
            balance -= amount
            return [+balance.toFixed(2), description]
        }            
    }
}

export const retrieveRunningBalance = (idx: number, amount: number, balance: number) => {
    const transactionType = transactionTypeEnum.options[idx]
    const [newBalance, desecription] = calculateRunningBalance(transactionType, amount, balance)
    return [transactionType, newBalance, desecription]
}