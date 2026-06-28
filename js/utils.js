function criarClienteLI(cliente, db) {
    const li = document.createElement("li");
    li.innerText = `${cliente.nome} - ${cliente.email}`;
    li.appendChild(criarBotaoExcluir(cliente, db));
    return li;
}

function criarBotaoExcluir(cliente, db) {
    const excluirBotao = document.createElement("button");
    excluirBotao.innerText = "Excluir";
    excluirBotao.addEventListener("click", async () => {
        await db.deletar(cliente._id);
    });

    return excluirBotao;
}

async function enviar(db, form, display) {
    await form.enviar();
    form.limpar();
    await db.fetch();
}

export { criarClienteLI, enviar };