
import { Block } from "./clases/block";
import { Blockchain } from "./clases/blockchain";

import { Wallet } from "./clases/wallet";

import { readInput } from "../readInput";

import fs from 'fs';

export class visualInterface{

    private blockchain: Blockchain
    private wallet: Wallet

    constructor(blockchain: Blockchain, wallet: Wallet){
        this.blockchain = blockchain
        this.wallet = wallet
    }

    showWallet() {
        const publicKeyPem = this.wallet.getPublicKeyPem();
        const privateKeyPem = this.wallet.getPrivateKeyPem();

        fs.writeFileSync('clave_publica.txt', publicKeyPem);
        fs.writeFileSync('clave_privada.txt', privateKeyPem);

        console.log("✅ Se ha creado exitosamente tu wallet. Las claves fueron guardadas en archivos.");
    }

    async createTransaction(to: string){
        console.clear()
        console.log("Estas a punto de crear una transaccion")
        const amountStr = await readInput("Ingrese la cantidad a transferir: ")
        const amount = Number(amountStr)
        console.log("La transaccion se crea a partir de tu clave privada: ")
        console.log(this.wallet.getPrivateKeyPem())
        const transaction = this.wallet.createTransaction(to, amount)
        this.blockchain.addTransaction(transaction)
    }

    mineABlock(){
        console.clear()
        console.log("Comienza el proceso de minado")
        this.blockchain.minePendingTransactions()
    }

    printChain() {
        console.clear(); // Limpia la consola antes de mostrar
        console.log('=== Blockchain Actual ===\n');

        this.blockchain.chain.forEach((block, index) => {
            console.log(`🔹 Bloque #${index}`);
            console.log(`Hash: ${block.getHash}`);
            console.log(`Hash Anterior: ${block.previousHash}`);
            console.log(`Transacciones:`);

            block.transactions.forEach((tx, txIndex) => {
            console.log(`  🧾 Tx #${txIndex + 1}`);
            console.log(`    De: ${tx.from}`);
            console.log(`    A : ${tx.to}`);
            console.log(`    Monto: ${tx.amount}`);
            });

            console.log('---------------------------\n');
        });
    }

    printMempool() {
        console.clear(); // Limpia la consola antes de mostrar
        console.log('=== Mempool de Transacciones Pendientes ===\n');

        if (this.blockchain.mempool.length === 0) {
            console.log('📭 No hay transacciones pendientes.\n');
            return;
        }

        this.blockchain.mempool.forEach((tx, index) => {
            console.log(`🧾 Transacción #${index + 1}`);
            console.log(`  De: ${tx.from}`);
            console.log(`  A : ${tx.to}`);
            console.log(`  Monto: ${tx.amount}`);
            console.log('---------------------------');
        });
    }
}