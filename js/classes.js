import { criarClienteLI } from "./utils.js";

class ClientesDB {
    #clientes = [];
    #callback; // essa função é executada sempre que a lista é atualizada
    #URL;

    constructor(URL) {
        this.#URL = URL;
        this.fetch(); // popular a lista com os dados já existentes
    }

    get dados() {
        return this.#clientes;
    }

    async cadastrar(nome, email) {
        try {
            const resposta = await fetch(this.#URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, email }),
            });
            if (!resposta.ok) {
                throw new Error(`Status ${resposta.status}`);
            }

            this.fetch();
        } catch (error) {
            console.error(error);
        }
    }

    async deletar(id) {
        // para deletar é feito uma requisição com método DELETE
        // para especificar qual cliente é excluído incluímos o id no fim da URL
        try {
            const resposta = await fetch(this.#URL + "/" + id, {
                method: "DELETE",
            });
            if (!resposta.ok) {
                throw new Error(`Status ${resposta.status}`);
            }

            this.fetch();
        } catch (error) {
            console.error(error);
        }
    }

    async fetch() {
        try {
            const resposta = await fetch(this.#URL);
            if (!resposta.ok) {
                throw new Error(`Status ${resposta.status}`);
            }
            
            const clientes = await resposta.json();
            this.#clientes = clientes;

            // sempre que a lista de clientes for atualizada,
            // chame o callback caso tenha sido definido
            if (this.#callback) this.#callback();
        } catch (error) {
            console.error(error);
        }
    }

    set callback(cb) {
        this.#callback = cb;
    }
}

class ClientesForm {
    #db;
    #form;
    #nome;
    #email;

    constructor(db) {
        this.#db = db;
        this.#form = document.querySelector("form");
        this.#nome = this.#form.querySelector("#nome");
        this.#email = this.#form.querySelector("#email");
    }

    limpar() {
        this.#nome.value = "";
        this.#email.value = "";
    }

    async enviar(event) {
        await this.#db.cadastrar(this.#nome.value, this.#email.value);
    }

    addSubmitListener(cb) {
        this.#form.addEventListener("submit", (event) => {
            event.preventDefault();
            cb();
        });
    }
}

class ClientesDisplay {
    #db;
    #ul;

    constructor(db) {
        this.#db = db;
        this.#ul = document.querySelector("#lista-clientes > ul");
        this.atualizar();
    }

    async atualizar() {
        const elements = this.#db.dados.map((cliente) => criarClienteLI(cliente, this.#db));
        this.limpar();
        elements.reduce((ul, li) => ul.appendChild(li), this.#ul);
    }

    limpar() {
        this.#ul.innerHTML = "";
    }
}

export {
    ClientesDB,
    ClientesForm,
    ClientesDisplay
};
