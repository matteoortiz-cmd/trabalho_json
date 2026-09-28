let carros = [];

const listaCarros = document.getElementById("listaCarros");
const statusTexto = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");

async function carregarCarros() {
    try {
        statusTexto.textContent = "Carregando carros...";

        const resposta = await fetch("carros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os carros.");
        }

        carros = await resposta.json();

        statusTexto.textContent =
            `${carros.length} carros carregados com sucesso.`;

        mostrarCarros(carros);

    } catch (erro) {
        statusTexto.textContent =
            `Erro: ${erro.message}`;
    }
}

function mostrarCarros(lista) {
    listaCarros.innerHTML = "";

    lista.forEach((carro) => {
        const card = document.createElement("div");

        card.classList.add("card");

        const preco = Number(carro.preco).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

        card.innerHTML = `
           <h2>${carro.modelo}</h2>

            <p>
                <strong>ID:</strong>
                ${carro.id}
            </p>

            <p>
                <strong>Ano:</strong>
                ${carro.ano}
            </p>

            <p>
                <strong>Fabricante:</strong>
                ${carro.fabricante}
            </p>

            <p>
                <strong>Preço:</strong>
                ${preco}
            </p>
        `;

        listaCarros.appendChild(card);
    });
}

btnBuscar.addEventListener("click", carregarCarros);
