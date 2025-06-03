import crypto from 'crypto';

import { Transaction } from './transaction';

export class Block {
  index: number;
  timestamp: number;
  previousHash: string;
  transactions: Transaction[];
  nonce: number = 0;
  hash: string;

  constructor(index: number, previousHash: string, transactions: Transaction[]) {
    this.index = index;
    this.previousHash = previousHash;
    this.transactions = transactions;
    this.timestamp = Date.now()
    this.hash = this.calculateHash(); // solo puede ser cambiado por minería
  }

  // Método privado: solo se puede calcular internamente
  private calculateHash(): string {
    const txData = this.transactions.map(t => t.signature).join('');
    const data = this.index + this.previousHash + this.timestamp + txData + this.nonce;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Método público para exponer el hash calculado
  get getHash(): string {
    return this.hash;
  }

  // Ejecuta la minería: encuentra un hash válido que cumpla con cierta dificultad
  mine(difficulty: number) {
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
      console.log("Minando ⛏👷‍♂️. Intento: ", this.nonce)
    }
    console.log("Mineria finalizada ✅")
  }

  // Verifica que el hash aún coincida con los datos del bloque
  hasValidHash(): boolean {
    return this.hash === this.calculateHash();
  }
}