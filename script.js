document.addEventListener('DOMContentLoaded', function () {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const total = document.getElementById('total');
    let totalCompra = 0;

    function atualizarTotal() {
        total.innerText = totalCompra.toFixed(2);
    }

    function adicionarItem(item, preco) {
        const li = document.createElement('li');
        li.innerText = `${item} - R$${preco.toFixed(2)}`;
        itensCarrinho.appendChild(li);
        totalCompra += preco;
        atualizarTotal();
    }

    function limparCarrinho() {
        itensCarrinho.innerHTML = '';
        totalCompra = 0;
        atualizarTotal();
    }

    document.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function () {
            const nomeItem = this.innerText.split(' - ')[0];
            const precoItem = parseFloat(this.getAttribute('data-price'));
            adicionarItem(nomeItem, precoItem);
        });
    });

    document.getElementById('limpar-carrinho').addEventListener('click', limparCarrinho);

    document.getElementById('comprar').addEventListener('click', function () {
        const itens = Array.from(document.querySelectorAll('#itens-carrinho li')).map(li => li.innerText);
        const entrega = document.querySelector('input[name="opcao-entrega"]:checked').value;
        const enderecoPedido = document.querySelector('input[name="endereco-input"]').value;
        const metodoPagamento = document.getElementById('metodo-pagamento-select').value;
        const nome = document.querySelector('input[name="name-input"]').value;

        // Formatando os itens em uma lista
        const itensFormatados = itens.map(item => `- ${item}`).join('\n');

        const mensagem = `Olá este é o meu Pedido:\n${itensFormatados}\nOpção de Entrega: ${entrega}\nMétodo de Pagamento: ${metodoPagamento}\nEndereço: ${enderecoPedido}\nNome: ${nome}\nTotal: R$${totalCompra.toFixed(2)}`;
        const url = `https://wa.me/5511930491954/?text=${encodeURIComponent(mensagem)}`;
        window.open(url);

        limparCarrinho();
    });

    const opcoesEntrega = document.getElementById("opcoes-entrega");
    const endereco = document.getElementById("endereco");
    const metodoPagamento = document.getElementById("metodo-pagamento");

    function atualizarExibicaoCampos() {
        if (document.getElementById("entrega").checked) {
            endereco.style.display = "block";
            metodoPagamento.style.display = "block";
        } else if (document.getElementById("retirada").checked) {
            endereco.style.display = "none";
            metodoPagamento.style.display = "block";
        }
    }

    atualizarExibicaoCampos();

    opcoesEntrega.addEventListener("change", atualizarExibicaoCampos);
});

