import * as DiamSdk from 'diamnet-sdk';
import {
  Server,
  Keypair,
  TransactionBuilder,
  Operation,
  BASE_FEE,
  Networks,
  Asset
} from 'diamnet-sdk';

const server = new DiamSdk.Aurora.Server('https://diamtestnet.diamcircle.io');
const networkPassphrase = 'Diamante Testnet 2024';

export const checkBalance = async accountId => {
  try {
    const account = await server.loadAccount(accountId);
    const balances = account.balances
      .filter(balance => balance.asset_type === 'native')
      .map(balance => `${balance.balance} diams`);

    if (balances.length === 0) {
      return { success: false, error: 'Tidak ada saldo native.' };
    }

    return { success: true, balances };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loadAccount = async accountId => {
  try {
    const account = await server.loadAccount(accountId);
    return account;
  } catch (error) {
    throw new Error(`Failed to load account: ${error.message}`);
  }
};

export const createPassiveSellOffer = async (
  account,
  sellingAsset,
  buyingAsset,
  amount,
  price
) => {
  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(
        DiamSdk.Operation.createPassiveSellOffer({
          selling: sellingAsset,
          buying: buyingAsset,
          amount: amount,
          price: price
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error) {
    console.error('Error during Passive Sell Offer creation:', error);
    throw new Error(`Failed to create passive sell offer: ${error.message}`);
  }
};

export const createBuyOffer = async (
  account,
  sellingAsset,
  buyingAsset,
  buyAmount,
  price,
  offerId = '0'
) => {
  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(
        Operation.manageBuyOffer({
          selling: sellingAsset,
          buying: buyingAsset,
          buyAmount: buyAmount,
          price: price,
          offerId: offerId
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error) {
    console.error('Error during Buy Offer creation:', error);
    throw new Error(`Failed to create buy offer: ${error.message}`);
  }
};

export const createSellOffer = async (
  account,
  sellingAsset,
  buyingAsset,
  amount,
  price,
  offerId = '0'
) => {
  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(
        Operation.manageSellOffer({
          selling: sellingAsset,
          buying: buyingAsset,
          amount: amount,
          price: price,
          offerId: offerId
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error) {
    console.error('Error during Sell Offer creation:', error);
    throw new Error(`Failed to create sell offer: ${error.message}`);
  }
};

export const createTrustline = async (
  account,
  assetCode,
  assetIssuer,
  limit = undefined
) => {
  try {
    const asset = new DiamSdk.Asset(assetCode, assetIssuer);

    const transactionBuilder = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    });

    transactionBuilder.addOperation(
      Operation.changeTrust({
        asset: asset,
        limit: limit
      })
    );

    const transaction = transactionBuilder.setTimeout(30).build();

    return transaction.toXDR();
  } catch (error) {
    console.error('Error during Trustline creation:', error);
    throw new Error(`Failed to create trustline: ${error.message}`);
  }
};

export const signAndSubmitTransaction = async (xdr, passphrase) => {
  try {
    const signedTransaction = await window.diam.sign(xdr, true, passphrase);
    return signedTransaction;
  } catch (error) {
    console.error('Error during transaction signing:', error);
    const errorMessage = error.message?.data || 'An unknown error occurred';
    throw new Error(`Failed to sign and submit transaction: ${errorMessage}`);
  }
};

const handleConnectWallet = async () => {
  // This feature just for debug only, pls delete when launch on product
  try {
    const result = await connectWallet();
    if (result.success) {
      const publicKey = result.publicKey;
      setWalletAddress(publicKey);
      alert(`Connected to wallet: ${publicKey}`);
    } else {
      console.error('Wallet connection failed:', result.error);
      alert(`Failed to connect wallet: ${result.error}`);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    alert('An unexpected error occurred while connecting to the wallet.');
  }
};

export const connectWallet = async () => {
  try {
    if (!window.diam) {
      throw new Error(
        'DIAM Wallet extension is not installed. Please install it to proceed.'
      );
    }
    const response = await window.diam.connect();
    if (response.message && response.message.data) {
      const publicKey = response.message.data[0].diamPublicKey;
      return { success: true, publicKey };
    } else {
      throw new Error('Failed to retrieve wallet public key.');
    }
  } catch (error) {
    console.error('Error during wallet connection:', error.message);
    return { success: false, error: error.message };
  }
};
