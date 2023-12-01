// Função para listar todos os produtos
function listarProdutos() {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('listaProdutos');
            lista.innerHTML = '<ul class="list-group">' + 
                data.data.map(produto => 
                    `<li class="list-group-item">Código: ${produto.codigo}, Nome: ${produto.nome}, Preço: ${produto.preco}</li>`
                ).join('') + '</ul>';
        })
        .catch(error => console.error('Erro ao listar produtos:', error));
}

// Função para adicionar um novo produto
function adicionarProduto() {
    const codigo = document.getElementById('addCodigo').value;
    const nome = document.getElementById('addNome').value;
    const preco = document.getElementById('addPreco').value;

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo, nome, preco }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto adicionado: ' + JSON.stringify(data));
        listarProdutos();  // Atualiza a lista de produtos
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
}

// Função para atualizar um produto existente
function atualizarProduto() {
    const codigo = document.getElementById('updateCodigo').value;
    const nome = document.getElementById('updateNome').value;
    const preco = document.getElementById('updatePreco').value;

    fetch(`http://localhost:3000/produtos/${codigo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, preco }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto atualizado: ' + JSON.stringify(data));
        listarProdutos();  // Atualiza a lista de produtos
    })
    .catch(error => console.error('Erro ao atualizar produto:', error));
}

// Função para remover um produto
function removerProduto() {
    const codigo = document.getElementById('deleteCodigo').value;

    fetch(`http://localhost:3000/produtos/${codigo}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto removido: ' + JSON.stringify(data));
        listarProdutos();  // Atualiza a lista de produtos
    })
    .catch(error => console.error('Erro ao remover produto:', error));
}

// Inicializa a lista de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    listarProdutos();
});
