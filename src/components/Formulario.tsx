import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

export default function Formulario (props: FormularioProps) {
    const id = props.cliente?.Id
    const [nome, setNome] = useState(props.cliente?.Nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.Idade ?? 999)
    
    return (
        <div>
            {id ? (
                <Entrada texto="Código" valor={id} 
                somenteLeitura className="mb-5" />
            ) : false}
            <Entrada texto="Nome" valor={nome} 
                valorMudou={setNome} className="mb-5" />
            <Entrada texto="Idade" valor={idade} 
                valorMudou={setIdade}
                tipo="number" className="mb-5" />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.clienteMudou?.(new Cliente(id, nome, +idade))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="gray"
                    onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}