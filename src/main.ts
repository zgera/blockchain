import { Blockchain } from "./clases/blockchain";

import { Wallet } from "./clases/wallet";

import { visualInterface } from "./visualInterface";

import { readInput } from "../readInput";

async function main() {
  const blockchain = new Blockchain(5); // Dificultad 2 por ejemplo
  const senderWallet = new Wallet();
  const receiverWallet = new Wallet();

  const ui = new visualInterface(blockchain, senderWallet);

  ui.showWallet(); // Se muestra solo una vez

  while (true) {
    console.log("\n=== Menú Principal ===");
    console.log("1️⃣ Crear Transacción");
    console.log("2️⃣ Minear Bloque");
    console.log("3️⃣ Ver Blockchain");
    console.log("4️⃣ Ver Mempool");
    console.log("5️⃣ Salir");

    const option = await readInput("Seleccione una opción: ");

    switch (option) {
      case "1":
        await ui.createTransaction(receiverWallet.getPublicKeyPem()); // siempre va a la wallet fija
        break;
      case "2":
        ui.mineABlock();
        break;
      case "3":
        ui.printChain();
        break;
      case "4":
        ui.printMempool();
        break;
      case "5":
        console.log("Saliendo... 🫡");
        process.exit(0);
      default:
        console.log("❌ Opción inválida. Intente de nuevo.");
    }
  }
}

main();