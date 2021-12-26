import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import dbClientes from "../../backend/config"
import { FirestoreDataConverter, collection, doc, getDocs, getDoc, setDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';


export default class ColecaoCliente implements ClienteRepositorio {

    clientes = collection(dbClientes, 'clientes').withConverter(clienteConverter);

    async obterTodos(): Promise<Cliente[]> {
        const clientesSnapshot = await getDocs(this.clientes);
        const data = clientesSnapshot.docs.map(doc => doc.data());
        return data;
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (cliente?.id) {
            const docRef = doc(this.clientes, cliente.id).withConverter(clienteConverter);
            await setDoc(docRef, cliente);
            return cliente
        } else {
            const docRef = await addDoc(this.clientes, cliente);
            const doc = await getDoc(docRef);
            return doc.data();
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        const docRef = doc(this.clientes, cliente.id).withConverter(clienteConverter);
        return await deleteDoc(docRef);
    }
}

const clienteConverter:FirestoreDataConverter<Cliente>  = {
    toFirestore: (cliente: Cliente) => {
        return {
            id: cliente.id,
            nome: cliente.nome,
            idade: cliente.idade
        };
    },
    fromFirestore: (doc): Cliente => {
        const data = doc.data();
        // for (const d in data) {
        //     console.log("DADOS: "+ docId + " - " +data.nome + " - " + data.idade);
        // }

        return new Cliente(data.nome, data.idade, doc.id);
    }
}
