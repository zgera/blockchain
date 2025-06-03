# blockchain
Sistema que simula localmente el funcionamiento de la Blockchain

Se inicia creando una blockchain y una wallet digital propia con sus respectivas llaves

Se despliega una menu en la consola que te permite realizar una serie de acciones

Crear transaccion: Se pide que se ingrese un monto para realizar una transaccion hacia otra wallet predeterminada. Para crearla, se utiliza la clave privada de la wallet propia, como se hace saber.

Ver mempool: Se muestran todas las transacciones que estan en espera para ser agregadas a un bloque

Minar bloque: Se mina un bloque con las transacciones existentes en la mempool. Para ello, se debe dar con un hash que cumpla con las condiciones de la dificultad impuesta.

Ver cadena de bloques: Se muestra la cadena de bloques, incluyendo la primera llamada genesis

Pasos a ejecutar:

npm install //Instala todas las librerias asociadas

cd blockchain //Accede a su directorio

npx ts-node src/main //Ejecuta el programas