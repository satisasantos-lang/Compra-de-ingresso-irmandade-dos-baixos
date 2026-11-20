
const PRECO_INGRESSO = 25.00;
const QUANTIDADE_MAXIMA = 10;

let quantidade = 1;

const quantityDisplay = document.getElementById("quantity");
const totalDisplay = document.getElementById("total");
const ticketPriceDisplay = document.getElementById("ticketPrice");

const modal = document.getElementById("checkoutModal");
const buyBtn = document.getElementById("buyBtn");
const closeModal = document.getElementById("closeModal");
const checkoutForm = document.getElementById("checkoutForm");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
};

function atualizarValores() {
  const total = quantidade * PRECO_INGRESSO;

  quantityDisplay.textContent = quantidade;
  totalDisplay.textContent = formatarMoeda(total);
  ticketPriceDisplay.textContent = formatarMoeda(PRECO_INGRESSO);

  document.getElementById("summaryQuantity").textContent =
    `${quantidade} ingresso${quantidade > 1 ? "s" : ""}`;

  document.getElementById("summaryTotal").textContent =
    formatarMoeda(total);
}

plusBtn.addEventListener("click", () => {
  if (quantidade < QUANTIDADE_MAXIMA) {
    quantidade++;
    atualizarValores();
  }
});

minusBtn.addEventListener("click", () => {
  if (quantidade > 1) {
    quantidade--;
    atualizarValores();
  }
});

buyBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const comprador = {
    nome: document.getElementById("customerName").value.trim(),
    telefone: document.getElementById("customerPhone").value.trim(),
    email: document.getElementById("customerEmail").value.trim(),
    quantidade: quantidade,
    total: quantidade * PRECO_INGRESSO
  };

  if (!comprador.nome || !comprador.telefone || !comprador.email) {
    alert("Preencha todos os dados.");
    return;
  }

  // O checkout real será conectado ao gateway de pagamento.
  // Não registrar pagamentos reais no armazenamento local.

  alert(
    "Cadastro preenchido com sucesso!\n\n" +
    "O checkout de pagamento ainda precisa ser conectado.\n" +
    "Total do pedido: " + formatarMoeda(comprador.total)
  );

  console.log("Pedido preparado:", comprador);
});

atualizarValores();
