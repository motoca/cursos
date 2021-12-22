import dbClientes from "../backend/config"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// export default function Home() {
//   getClientes().then((clientes) => {
//     for (const cliente of clientes) {
//       console.log("Nome: " + cliente.nome)
//     }
//   })

//   return "CLIENTES: ";
// }

// async function getClientes() {
//   const clientesCol = collection(dbClientes, 'clientes');
//   const clientesSnapshot = await getDocs(clientesCol);
//   const clientesList = clientesSnapshot.docs.map(doc => doc.data());
//   return clientesList;
// }

import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio)
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos, [])

  function obterTodos(){
    repo.obterTodos().then(clientes => {
        setClientes(clientes)
        setVisivel('tabela')
    })
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente) {
    console.log('Cliente excluido: '+cliente);
    setVisivel('form')
  }

  function novoCliente() {
    setCliente(Cliente.vazio)
    setVisivel('form')
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  return (
    <div className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-600 via-white-500 to-blue-400
      text-white
    `}>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4"
                onClick={novoCliente}>
                Novo Clientes
              </Botao>
            </div>
            <Tabela clientes={clientes} 
                    clienteSelecionado={clienteSelecionado}
                    clienteExcluido={clienteExcluido} />
          </>
        ) : (
          <Formulario 
            cliente={cliente} 
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
          />
        )}
      </Layout>
    </div>
  )
}
