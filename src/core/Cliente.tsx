export default class Cliente {
    private id: string;
    private nome: string;
    private idade: number;

    constructor(id: string = null, nome: string, idade: number) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
    }

    static vazio() {
        return new Cliente(null, '', 0)
    }

    get Id(): string {
        return this.id
    }

    get Nome(): string {
        return this.nome
    }

    get Idade(): number {
        return this.idade
    }
}