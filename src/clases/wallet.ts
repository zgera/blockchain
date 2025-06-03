import crypto from 'crypto'

import { Transaction } from "./transaction"

export class Wallet{
    private publicKey: crypto.KeyObject;
    private privateKey: crypto.KeyObject;

    constructor() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        })

        this.publicKey = crypto.createPublicKey(publicKey)
        this.privateKey = crypto.createPrivateKey(privateKey)
    }

    getPublicKeyPem(): string {
        return this.publicKey.export({ type: 'spki', format: 'pem' }).toString();
    }

    getPrivateKeyPem(): string {
        return this.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
    }   

    createTransaction(to: string, amount: number): Transaction {
        const transaction = new Transaction(this.getPublicKeyPem(), to, amount);
        transaction.sign(this.privateKey);
        return transaction;
    }
}