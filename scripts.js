const URL = "https://crudcrud.com/api/cf121622ec30459db6087ece944d1309/clientes";
const form = document.querySelector("form");
const atualizarListaBotao = document.querySelector("#lista-clientes > button");
atualizarListaBotao.addEventListener("click", listarClientes);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomeInput = document.querySelector("#nome");
    const emailInput = document.querySelector("#email");
    cadastrarCliente(nomeInput.value, emailInput.value);
    nomeInput.value = "";
    emailInput.value = "";
});

async function cadastrarCliente(nome, email) {
    try {
        const resposta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email }),
        });
        if (!resposta.ok) {
            throw new Error(`Status ${resposta.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

async function listarClientes() {
    document.querySelector("#lista-clientes > ul").innerHTML = ""; // limpar lista

    try {
        const resposta = await fetch(URL);
        if (!resposta.ok) {
            throw new Error(`Status ${resposta.status}`);
        }
        const clientes = await resposta.json();
        clientes.forEach(listar);
    } catch (error) {
        console.error(error);
    }
}

function listar(cliente) {
    const li = document.createElement("li");
    li.innerText = `${cliente.nome} - ${cliente.email}`;

    const excluirBotao = document.createElement("button");
    excluirBotao.innerText = "Excluir";
    excluirBotao.addEventListener("click", () => excluirCliente(cliente._id));
    li.appendChild(excluirBotao);

    const ul = document.querySelector("#lista-clientes > ul");
    ul.appendChild(li);
}

async function excluirCliente(id) {
    // para deletar é feito uma requisição com método DELETE
    // para especificar qual cliente é excluído incluímos o id no fim da URL
    try {
        const resposta = await fetch(URL + "/" + id, {
            method: "DELETE",
        });
        if (!resposta.ok) {
            throw new Error(`Status ${resposta.status}`);
        }
        listarClientes(); // atualizar a lista de clientes após a exclusão
    } catch (error) {
        console.error(error);
    }
}
