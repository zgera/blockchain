import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
  chain: Block[] = [];
  mempool: Transaction[] = [];
  difficulty = 2;

  constructor() {
    const genesis = new Block(0, '0', []);
    this.chain.push(genesis);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  // Agrega transacción pendiente
  addTransaction(tx: Transaction) {
    if (tx.isValid()) {
      this.mempool.push(tx);
    }
  }

  // Extrae transacciones del mempool, crea bloque y lo mina
  minePendingTransactions(): Block {
    const block = new Block(this.chain.length, this.getLatestBlock().hash, this.mempool);
    block.mine(this.difficulty);
    this.chain.push(block);
    this.mempool = [];
    return block;
  }

  // Reemplaza la cadena si se recibe una versión más larga y válida
  replaceChain(newChain: Block[]) {
    if (newChain.length > this.chain.length && this.isValidChain(newChain)) {
      this.chain = newChain;
    }
  }

  // Verifica que toda la cadena sea válida
  isValidChain(chain: Block[]): boolean {
    for (let i = 1; i < chain.length; i++) {
      const current = chain[i];
      const previous = chain[i - 1];

      if (!current.hasValidHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}
