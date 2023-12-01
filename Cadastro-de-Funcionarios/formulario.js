document.addEventListener('DOMContentLoaded', function() {
let funcionarios = [];

const botaoEnviar = document.getElementById('enviar');
botaoEnviar.addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    const novoFuncionario = {
    nome: nome,
    email: email,
    cargo: cargo,
    salario: salario
    };

    funcionarios.push(novoFuncionario);

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    atualizarTabela();
});

function atualizarTabela() {
    const tabela = document.getElementById('tabelaFuncionarios').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    funcionarios.forEach(function(funcionario) {
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).innerHTML = funcionario.nome;
    novaLinha.insertCell(1).innerHTML = funcionario.email;
    novaLinha.insertCell(2).innerHTML = funcionario.cargo;
    novaLinha.insertCell(3).innerHTML = funcionario.salario;
    });

    const nomes = funcionarios.map(func => func.nome).join(', ');
    document.getElementById('nomesFuncionarios').innerText = nomes;

    const gerentes = funcionarios.filter(func => func.cargo === 'Gerente').map(func => func.nome).join(', ');
    document.getElementById('gerentes').innerText = gerentes;

    const salarioTotal = funcionarios.reduce((total, func) => total + func.salario, 0);
    document.getElementById('salarioTotal').innerText = salarioTotal;
}
});
