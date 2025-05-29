import crypto from 'crypto';

export class Transaction {
  from: string;
  to: string;
  amount: number;
  signature: string = '';

  constructor(from: string, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  // Crea la firma digital usando la clave privada del remitente
  sign(privateKey: crypto.KeyObject) {
    const signer = crypto.createSign('SHA256');
    signer.update(this.from + this.to + this.amount);
    signer.end();
    this.signature = signer.sign(privateKey, 'hex');
  }

  // Verifica que la firma sea válida usando la clave pública
  isValid(): boolean {
    if (!this.signature || !this.from) return false;

    const verifier = crypto.createVerify('SHA256');
    verifier.update(this.from + this.to + this.amount);
    verifier.end();
    return verifier.verify(this.from, this.signature, 'hex');
  }
}
