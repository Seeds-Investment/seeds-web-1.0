/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as DiamSdk from 'diamnet-sdk';
import { BASE_FEE, Operation, TransactionBuilder } from 'diamnet-sdk';
import { type AccountResponse } from 'diamnet-sdk/lib/aurora';

const server = new DiamSdk.Aurora.Server('https://diamtestnet.diamcircle.io');
const networkPassphrase = 'Diamante Testnet 2024';

export const checkBalance = async (accountId: string): Promise<any> => {
  try {
    const account = await server.loadAccount(accountId);
    const balances = account.balances
      .filter(balance => balance.asset_type === 'native')
      .map(balance => `${balance.balance} diams`);

    if (balances.length === 0) {
      return { success: false, error: 'Tidak ada saldo native.' };
    }

    return { success: true, balances };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const loadAccount = async (accountId: string): Promise<any> => {
  try {
    const account = await server.loadAccount(accountId);
    return account;
  } catch (error: any) {
    throw new Error(
      `Failed to load account: ${(error.message as string) ?? 'unknown error'}`
    );
  }
};

export const createPassiveSellOffer = async (
  account: DiamSdk.Aurora.AccountResponse,
  sellingAsset: DiamSdk.Asset,
  buyingAsset: DiamSdk.Asset,
  amount: string,
  price: string
): Promise<any> => {
  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase
    })
      .addOperation(
        DiamSdk.Operation.createPassiveSellOffer({
          selling: sellingAsset,
          buying: buyingAsset,
          amount,
          price
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error: any) {
    console.error('Error during Passive Sell Offer creation:', error);
    throw new Error(
      `Failed to create passive sell offer: ${
        (error.message as string) ?? 'unknown error'
      }`
    );
  }
};

export const createBuyOffer = async (
  account: DiamSdk.Aurora.AccountResponse,
  sellingAsset: DiamSdk.Asset,
  buyingAsset: DiamSdk.Asset,
  buyAmount: string,
  price: number,
  offerId: string = '0'
): Promise<any> => {
  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase
    })
      .addOperation(
        Operation.manageBuyOffer({
          selling: sellingAsset,
          buying: buyingAsset,
          buyAmount,
          price,
          offerId
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error: any) {
    console.error('Error during Buy Offer creation:', error);
    throw new Error(
      `Failed to create buy offer: ${
        (error.message as string) ?? 'unknown error'
      }`
    );
  }
};

export const createSellOffer = async (
  account: DiamSdk.Aurora.AccountResponse,
  sellingAsset: DiamSdk.Asset,
  buyingAsset: DiamSdk.Asset,
  amount: string,
  price: number,
  offerId: string = '0'
): Promise<any> => {
  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase
    })
      .addOperation(
        Operation.manageSellOffer({
          selling: sellingAsset,
          buying: buyingAsset,
          amount,
          price,
          offerId
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error: any) {
    console.error('Error during Sell Offer creation:', error);
    throw new Error(
      `Failed to create sell offer: ${
        (error.message as string) ?? 'unknown error'
      }`
    );
  }
};

export const createTrustline = async (
  account: AccountResponse,
  assetCode: string,
  assetIssuer: string,
  limit = undefined
): Promise<any> => {
  try {
    const asset = new DiamSdk.Asset(assetCode, assetIssuer);

    const transactionBuilder = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase
    });

    transactionBuilder.addOperation(
      Operation.changeTrust({
        asset,
        limit
      })
    );

    const transaction = transactionBuilder.setTimeout(30).build();

    return transaction.toXDR();
  } catch (error: any) {
    console.error('Error during Trustline creation:', error);
    throw new Error(
      `Failed to create trustline: ${
        (error.message as string) ?? 'unknown error'
      }`
    );
  }
};

export const signAndSubmitTransaction = async (
  xdr: string,
  passphrase: string
): Promise<any> => {
  try {
    const signedTransaction = await (window as any).diam.sign(
      xdr,
      true,
      passphrase
    );
    return signedTransaction;
  } catch (error: any) {
    console.error('Error during transaction signing:', error);
    const errorMessage =
      (error.message?.data as string) ?? 'An unknown error occurred';
    throw new Error(`Failed to sign and submit transaction: ${errorMessage}`);
  }
};

// const handleConnectWallet = async () => {
//   // This feature just for debug only, pls delete when launch on product
//   try {
//     const result = await connectWallet();
//     if (result.success) {
//       const publicKey = result.publicKey;
//       setWalletAddress(publicKey);
//       alert(`Connected to wallet: ${publicKey}`);
//     } else {
//       console.error('Wallet connection failed:', result.error);
//       alert(`Failed to connect wallet: ${result.error}`);
//     }
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     alert('An unexpected error occurred while connecting to the wallet.');
//   }
// };

export const connectWallet = async (): Promise<any> => {
  try {
    if (!(window as any).diam) {
      throw new Error(
        'DIAM Wallet extension is not installed. Please install it to proceed.'
      );
    }
    const response = await (window as any).diam.connect();
    if (response.message.data) {
      const publicKey = response.message.data[0].diamPublicKey;
      return { success: true, publicKey };
    } else {
      throw new Error('Failed to retrieve wallet public key.');
    }
  } catch (error: any) {
    console.error('Error during wallet connection:', error.message);
    return { success: false, error: error.message };
  }
};
