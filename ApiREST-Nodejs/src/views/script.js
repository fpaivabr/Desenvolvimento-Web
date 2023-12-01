document.addEventListener('DOMContentLoaded', (event) => {
// Função para listar todos os produtos
function listarProdutos() {
    fetch('http://localhost:3000/produtos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao listar produtos');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !Array.isArray(data)) {
                console.error('Erro: a resposta do servidor não contém uma lista de produtos');
                return;
            }
            const lista = document.getElementById('listaProdutos');
            lista.innerHTML = ''; // Limpa a lista de produtos
            lista.innerHTML = '<ul class="list-group">' +
                data.map(produto =>
                    `<li class="list-group-item">${produto.codigo}, ${produto.nome}, ${produto.preco}</li>`
                ).join('') + '</ul>';
        })
        .catch(error => console.error('Erro ao listar produtos:', error));
}
window.listarProdutos = listarProdutos;

// Função para listar um produto específico
function listarProdutoEspecifico() {
    const codigo = document.getElementById('listarCodigo');
    if (!codigo || !codigo.value.trim()) {
        if (codigo) {
            codigo.placeholder = 'Campo obrigatório!';
            //codigo.classList.add('text-danger');
        }
        return;
    }
    fetch(`http://localhost:3000/produtos/${codigo.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao listar produto');
            }
            return response.json();
        })
        .then(data => {
            if (!data || typeof data.codigo === 'undefined') {
                console.error('Erro: a resposta do servidor não contém um produto');
                return;
            }
            exibirProdutos([data]);
        })
        .catch(error => console.error('Erro ao listar produto:', error));
}
window.listarProdutoEspecifico = listarProdutoEspecifico;

function adicionarProduto() {
    const codigo = document.getElementById('addCodigo');
    const nome = document.getElementById('addNome');
    const preco = document.getElementById('addPreco');

    if (!validarCampos([codigo, nome, preco])) return;

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo: codigo.value, nome: nome.value, preco: preco.value }),
    })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            limparCampos();
        })
        .catch(error => {
            console.log(error);
            if (error.status === 409) {
                codigo.placeholder = 'Código já existente';
                codigo.classList.add('text-danger');
            } else {
                console.error('Erro ao adicionar produto:', error);
            }
        });
}
window.adicionarProduto = adicionarProduto;

// Função para atualizar um produto existente
function atualizarProduto() {
    const codigo = document.getElementById('updateCodigo');
    const nome = document.getElementById('updateNome');
    const preco = document.getElementById('updatePreco');

    if (!validarCampos([codigo, nome, preco])) return;

    fetch(`http://localhost:3000/produtos/${codigo.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome.value, preco: preco.value }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            limparCampos();
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
}
window.atualizarProduto = atualizarProduto;

// Função para remover um produto
function removerProduto() {
    const codigo = document.getElementById('deleteCodigo');
    if (!codigo.value.trim()) {
        codigo.placeholder = 'Campo obrigatório!';
        return;
    }
    fetch(`http://localhost:3000/produtos/${codigo.value}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status === 404) {
                throw new Error('Produto não encontrado');
            }
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.message);
            }
            alert(data.message); // Adicionado de volta
            limparCampos();
        })
        .catch(error => {
            console.error('Erro ao remover produto:', error);
            if (error.message === 'Produto não encontrado') {
                codigo.placeholder = 'Produto não encontrado';
            }
        });
}
window.removerProduto = removerProduto;

// Função para validar campos
function validarCampos(campos) {
    let valido = true;
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            campo.placeholder = 'Campo obrigatório!';
            campo.classList.add('text-danger');
            valido = false;
        } else {
            campo.classList.remove('text-danger');
        }
    });
    return valido;
}
window.validarCampos = validarCampos;

// Função para limpar campos e restaurar placeholders
function limparCampos() {
    const campos = document.querySelectorAll('.form-control');
    campos.forEach(campo => {
        campo.value = '';
        campo.classList.remove('text-danger');

        // Restaurar o placeholder com base no id do campo
        if (campo.id.includes('Codigo')) {
            campo.placeholder = 'Código';
        } else if (campo.id.includes('Nome')) {
            campo.placeholder = 'Nome';
        } else if (campo.id.includes('Preco')) {
            campo.placeholder = 'Preço';
        } else if (campo.id.includes('listarCodigo')) {
            campo.placeholder = 'Código';
        }
    });
}
window.limparCampos = limparCampos;

function exibirProdutos(produtos) {
    console.log('Produtos recebidos:', produtos);
    if (!Array.isArray(produtos) || produtos.some(produto => !produto || typeof produto.codigo === 'undefined')) {
        console.error('Erro: o argumento produtos deve ser um array de objetos com uma propriedade codigo');
        return;
    }
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '<ul class="list-group">' +
        produtos.map(produto =>
            `<li class="list-group-item">${produto.codigo}, ${produto.nome}, ${produto.preco}</li>`
        ).join('') + '</ul>';
}
window.exibirProdutos = exibirProdutos;

// Evento para limpar campos ao trocar de aba
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        limparCampos();
        ocultarLista();
    });
});

function ocultarLista() {
    document.getElementById('listaProdutos').innerHTML = '';
}
window.ocultarLista = ocultarLista;
})
