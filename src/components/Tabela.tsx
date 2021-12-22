import Cliente from "../core/Cliente";
import { IconeEditar, IconeExcluir } from "./Icones";

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado;

    function renderizarCabecalho(){
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    // https://heroicons.com/ para pegar as imagens
    function renderizarDados(){
        return props.clientes?.map((cliente, i) => {
            return(
                <tr key={cliente.Id} 
                    className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{cliente.Id}</td>
                    <td className="text-left p-4">{cliente.Nome}</td>
                    <td className="text-left p-4">{cliente.Idade}</td>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(cliente: Cliente){
        return(
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} 
                        className={`
                            flex justify-center items-center p-2 m-1 rounded-full
                            text-green-600 hover:bg-purple-50
                        `}>
                        {IconeEditar}
                    </button>
                ) : false}

                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)}
                        className={`
                            flex justify-center items-center p-2 m-1 rounded-full
                            text-red-600 hover:bg-purple-50
                        `}>
                        {IconeExcluir}
                    </button>
                ) : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl  overflow-hidden">
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}