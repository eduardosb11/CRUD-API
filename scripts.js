const URL = "https://crudcrud.com/api/eed1546c602d49edbeac2430ef3160bf";
const form = document.querySelector("form");

listarClientes();

async function cadastrarCliente(nome, email) {
    const cliente = { nome, email };

    try {
        const resposta = await fetch(URL + "/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        });
        if (!resposta.ok) {
            throw new Error(`Status ${resposta.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

async function listarClientes() {
    try {
        const resposta = await fetch(URL + "/clientes", {
            method: "GET",
        });
        if (!resposta.ok) {
            throw new Error(`Status ${resposta.status}`);
        }
        const clientes = await resposta.json();
        console.log(clientes);
    } catch (error) {
        console.error(error);
    }

}

function excluirCliente() { }
