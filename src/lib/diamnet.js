
import * as DiamSdk from 'diamnet-sdk';
import { BASE_FEE, Operation, TransactionBuilder } from 'diamnet-sdk';

const server = new DiamSdk.Aurora.Server('https://diamtestnet.diamcircle.io');
const networkPassphrase = 'Diamante Testnet 2024';

export const checkBalance = async (accountId) => {
    try {
        const account = await server.loadAccount(accountId);


        const balances = account.balances
            .filter(balance => balance.asset_type === 'native')
            .map((balance) => `${balance.balance} diams`);

        if (balances.length === 0) {
            return { success: false, error: 'Tidak ada saldo native.' };
        }

        return { success: true, balances };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const loadAccount = async (accountId) => {
    try {
        const account = await server.loadAccount(accountId);
        return account;
    } catch (error) {
        throw new Error(`Failed to load account: ${error.message}`);
    }
};

export const createPassiveSellOffer = async (account, sellingAsset, buyingAsset, amount, price) => {
    try {
        const transaction = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: networkPassphrase,
        })
            .addOperation(
                DiamSdk.Operation.createPassiveSellOffer({
                    selling: sellingAsset,
                    buying: buyingAsset,
                    amount: amount,
                    price: price,
                })
            )
            .setTimeout(30)
            .build();

        return transaction.toXDR();
    } catch (error) {
        console.error("Error during Passive Sell Offer creation:", error);
        throw new Error(`Failed to create passive sell offer: ${error.message}`);
    }
};

export const createBuyOffer = async (account, sellingAsset, buyingAsset, buyAmount, price, offerId = '0') => {
    try {
        const transaction = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: networkPassphrase,
        })
            .addOperation(
                Operation.manageBuyOffer({
                    selling: sellingAsset,
                    buying: buyingAsset,
                    buyAmount: buyAmount,
                    price: price,
                    offerId: offerId,
                })
            )
            .setTimeout(30)
            .build();

        return transaction.toXDR();
    } catch (error) {
        console.error("Error during Buy Offer creation:", error);
        throw new Error(`Failed to create buy offer: ${error.message}`);
    }
};

export const signAndSubmitTransaction = async (xdr, passphrase) => {
    try {
        const signedTransaction = await window.diam.sign(xdr, true, passphrase);
        return signedTransaction;
    } catch (error) {
        console.error("Error during transaction signing:", error);
        const errorMessage = error.message?.data || "An unknown error occurred";
        throw new Error(`Failed to sign and submit transaction: ${errorMessage}`);
    }
};
