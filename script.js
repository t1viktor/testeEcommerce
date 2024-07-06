document.addEventListener('DOMContentLoaded', function () {
    const produtos = document.querySelectorAll('.produto');
    const infoProduto = document.querySelector('.infoProduto');
    const itemsSelect = document.querySelector('.itemsSelect');
    const closeInfoButton = document.querySelector('.closeInfo');
    const carrinhoButton = document.getElementById('car');
    const backToMainButton = document.querySelector('.backToMain');
    const main = document.querySelector('main');

    function updateCartCount() {
        const cartCount = itemsSelect.querySelectorAll('.selectedItem').length;
        carrinhoButton.textContent = `Carrinho (${cartCount})`;
    }

    produtos.forEach(function(produto) {
        produto.addEventListener('click', function() {
            let imgSrc = this.querySelector('img').src;
            let nome = this.querySelector('h2').textContent;
            let sobre = this.querySelector('.sobre').textContent;
            let preco = this.querySelector('p').textContent;

            infoProduto.querySelector('.imgProduto').src = imgSrc;
            infoProduto.querySelector('.nomeProduto').textContent = nome;
            infoProduto.querySelector('.sobreProduto').textContent = sobre;
            infoProduto.querySelector('.valorProduto').textContent = preco;
            infoProduto.style.display = 'flex';
        });
    });

    document.querySelector('.buyItem').addEventListener('click', function() {
        let nome = infoProduto.querySelector('.nomeProduto').textContent;
        let sobre = infoProduto.querySelector('.sobreProduto').textContent;
        let preco = infoProduto.querySelector('.valorProduto').textContent;

        let itemExistente = false;
        itemsSelect.querySelectorAll('.nomeCar').forEach(function(item) {
            if (item.textContent === nome) {
                let quantidade = item.parentElement.parentElement.querySelector('.quantidade');
                quantidade.textContent = parseInt(quantidade.textContent) + 1;
                itemExistente = true;
            }
        });

        if (!itemExistente) {
            let newItem = document.createElement('div');
            newItem.classList.add('selectedItem');

            let itemCar = document.createElement('div');
            itemCar.classList.add('itemCar');

            let img = document.createElement('img');
            img.src = infoProduto.querySelector('.imgProduto').src;
            img.alt = nome;
            itemCar.appendChild(img);

            let divDescricao = document.createElement('div');

            let nomeCar = document.createElement('h2');
            nomeCar.classList.add('nomeCar');
            nomeCar.textContent = nome;
            divDescricao.appendChild(nomeCar);

            let descriptionCar = document.createElement('p');
            descriptionCar.classList.add('descriptionCar');
            descriptionCar.textContent = sobre;
            divDescricao.appendChild(descriptionCar);

            itemCar.appendChild(divDescricao);
            newItem.appendChild(itemCar);

            let contador = document.createElement('div');
            contador.classList.add('contador');

            let btnMenos = document.createElement('button');
            btnMenos.textContent = '-';
            btnMenos.classList.add('menos');
            btnMenos.addEventListener('click', function() {
                let quantidade = parseInt(contador.querySelector('.quantidade').textContent);
                if (quantidade > 1) {
                    contador.querySelector('.quantidade').textContent = quantidade - 1;
                }
            });
            contador.appendChild(btnMenos);

            let quantidade = document.createElement('h4');
            quantidade.classList.add('quantidade');
            quantidade.textContent = '1';
            contador.appendChild(quantidade);

            let btnMais = document.createElement('button');
            btnMais.textContent = '+';
            btnMais.classList.add('mais');
            btnMais.addEventListener('click', function() {
                let quantidade = parseInt(contador.querySelector('.quantidade').textContent);
                contador.querySelector('.quantidade').textContent = quantidade + 1;
            });
            contador.appendChild(btnMais);

            newItem.appendChild(contador);

            let btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir Item';
            btnExcluir.addEventListener('click', function() {
                newItem.remove();
                updateCartCount();
            });
            newItem.appendChild(btnExcluir);

            itemsSelect.appendChild(newItem);
        }

        updateCartCount();
        infoProduto.style.display = 'none';
        infoProduto.querySelector('.nomeProduto').textContent = '';
        infoProduto.querySelector('.sobreProduto').textContent = '';
        infoProduto.querySelector('.valorProduto').textContent = '';
    });

    closeInfoButton.addEventListener('click', function() {
        infoProduto.style.display = 'none';
    });

    carrinhoButton.addEventListener('click', function() {
        main.style.display = 'none';
        itemsSelect.style.display = 'flex';
    });

    backToMainButton.addEventListener('click', function() {
        itemsSelect.style.display = 'none';
        main.style.display = 'block';
    });

    updateCartCount(); 
});


