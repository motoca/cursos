import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import dbClientes from "../../backend/config"
import { FirestoreDataConverter, collection, getDocs } from 'firebase/firestore/lite';
// import firebase from "../config";


export default class ColecaoCliente implements ClienteRepositorio {

    clientesCol = collection(dbClientes, 'clientes');

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (cliente?.Id) {
            await this.colecao().doc(cliente.Id).set(cliente)
            return cliente
        } else {
            const docRef = await this.colecao().doc().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.Id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const clientesCol = collection(dbClientes, 'clientes').withConverter(clienteConverter);
        const clientesSnapshot = await getDocs(clientesCol);
        return clientesSnapshot.docs.map(doc => doc.data());
    }

    private colecao() {
        // return firebase.firestore().collection('clientes').withConverter(this.#clienteConverter)
        return this.clientesCol.withConverter(clienteConverter);
    }
}

async function getClientes() {
    const clientesCol = collection(dbClientes, 'clientes');
    const clientesSnapshot = await getDocs(clientesCol);
    const clientesList = clientesSnapshot.docs.map(doc => doc.data());
    return clientesList;
}

// Firestore data converter
const clienteConverter:FirestoreDataConverter<Cliente>  = {
    toFirestore: (cliente: Cliente) => {
        return {
            id: cliente.Id,
            nome: cliente.Nome,
            idade: cliente.Idade
        };
    },
    fromFirestore: (snapshot): Cliente => {
        const data = snapshot.data();
        return new Cliente(data.id, data.nome, data.idade);
    }
}
