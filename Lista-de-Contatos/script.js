
const contatos = [];

function adicionarContato(evento) {
    evento.preventDefault();


    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const email = document.getElementById("email").value;


    const contato = {
        nome: nome,
        idade: idade,
        email: email
    };
    contatos.push(contato);

    atualizarTabela();
}

function atualizarTabela() {
    const corpoTabela = document.getElementById("tabelaContatos").getElementsByTagName("tbody")[0];
    corpoTabela.innerHTML = "";


    contatos.forEach((contato, indice) => {
        const novaLinha = corpoTabela.insertRow();

        const celulaNome = novaLinha.insertCell(0);
        const celulaIdade = novaLinha.insertCell(1);
        const celulaEmail = novaLinha.insertCell(2);

        celulaNome.innerHTML = contato.nome;
        celulaIdade.innerHTML = contato.idade;
        celulaEmail.innerHTML = contato.email;
    });
}
document.getElementById("formularioContato").addEventListener("submit", adicionarContato);
