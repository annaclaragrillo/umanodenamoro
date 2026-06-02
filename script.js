const toggleLetterButton = document.getElementById("toggle-letter");
const spreadLoveButton = document.getElementById("spread-love");
const petalsContainer = document.querySelector(".petals");
const quizOptions = document.querySelectorAll(".quiz-option");
const quizFeedback = document.getElementById("quiz-feedback");
const whoPrompt = document.getElementById("who-prompt");
const whoNext = document.getElementById("who-next");
const whoCorrect = document.getElementById("who-correct");
const whoWrong = document.getElementById("who-wrong");
const whoResult = document.getElementById("who-result");
const heartHunt = document.getElementById("heart-hunt");
const heartPlayer = document.getElementById("heart-player");
const heartCoin = document.getElementById("heart-coin");
const heartScore = document.getElementById("heart-score");
const heartFeedback = document.getElementById("heart-feedback");
const heartReward = document.getElementById("heart-reward");
const photoTrack = document.getElementById("photo-track");
const photoPrev = document.getElementById("photo-prev");
const photoNext = document.getElementById("photo-next");
const photoCaption = document.getElementById("photo-caption");
const photoDots = document.getElementById("photo-dots");
const proposalStage = document.getElementById("proposal-stage");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const proposalMessage = document.getElementById("proposal-message");

let currentWhoQuestion = 0;
let whoCorrectCount = 0;
let whoWrongCount = 0;
let answeredCurrentQuestion = false;
let collectedHearts = 0;
let currentPhoto = 0;

const heartGoal = 8;
const playerPosition = { x: 18, y: 18 };
const coinPosition = { x: 120, y: 70 };
const photoSlides = Array.from(document.querySelectorAll(".photo-slide"));
const photoCaptions = [
  "Um pedacinho bonito da nossa história.",
  "Daquelas fotos que eu olho e sorrio na hora.",
  "Mais uma lembrança boa para guardar para sempre.",
  "Um momento simples que ficou enorme no meu coração.",
  "Nós dois, do jeitinho que eu amo.",
  "Mais uma memória favorita dessa nossa história.",
  "Um registro bonito de tudo o que eu sinto por você.",
  "Só para eu poder lembrar mais uma vez do quanto eu gosto da nossa história.",
  "Mais uma cena bonita para guardar com carinho.",
  "Tem foto que já nasce com cara de memória favorita.",
  "Um instante nosso que merecia mesmo ficar aqui.",
  "Mais um pedacinho da nossa história no lugar certo.",
  "Só mais uma prova de como eu amo viver tudo isso com você.",
  "Um registro simples, mas cheio de significado para mim.",
  "Mais uma lembrança boa para eu revisitar sempre que quiser.",
  "Daquelas fotos que fazem meu coração ficar quentinho.",
];

const whoQuestions = [
  {
    prompt: "Quem é mais ciumento?",
    answer: "anna",
    response: "Eu. Mas com controvérsias, porque essa ainda rende debate e eu sigo me defendendo.",
  },
  {
    prompt: "Quem é mais dramático?",
    answer: "daniel",
    response: "Você. E se contestar essa, vai arrumar confusão comigo.",
  },
  {
    prompt: "Quem é mais grudinho?",
    answer: "daniel",
    response: "Você. Essa não tem nem discussão.",
  },
  {
    prompt: "Quem manda mais mensagem de saudade?",
    answer: "both",
    response: "Nós dois. E eu amo isso na gente.",
  },
  {
    prompt: "Quem pede mais beijo?",
    answer: "daniel",
    response: "Você. Na minha versão dos fatos, essa é totalmente sua.",
  },
  {
    prompt: "Quem demora mais para responder?",
    answer: "daniel",
    response: "Você. Mas quando eu estou brava, aí sou eu e você que lute :).",
  },
  {
    prompt: "Quem faz mais manha?",
    answer: "daniel",
    response: "Você. E funciona, porque eu sempre cedo.",
  },
  {
    prompt: "Quem implica mais, mas no fundo ama muito?",
    answer: "anna",
    response: "Eu. Implicar com você é praticamente uma das minhas linguagens de amor.",
  },
  {
    prompt: "Quem fica mais bobo depois de um beijo?",
    answer: "daniel",
    response: "Você. Sem dúvida nenhuma.",
  },
  {
    prompt: "Quem se apaixonou mais rápido?",
    answer: "daniel",
    response: "Você, óbvio. Nem tenta reescrever a história.",
  },
];

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.animationDuration = `${8 + Math.random() * 8}s`;
  petal.style.animationDelay = `${Math.random() * 1.6}s`;
  petal.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;
  petalsContainer.appendChild(petal);

  window.setTimeout(() => {
    petal.remove();
  }, 16000);
}

function burstPetals(total) {
  for (let index = 0; index < total; index += 1) {
    window.setTimeout(createPetal, index * 120);
  }
}

function placeCoin() {
  const width = Math.max(heartHunt.clientWidth - 60, 40);
  const height = Math.max(heartHunt.clientHeight - 60, 40);
  coinPosition.x = 12 + Math.random() * width;
  coinPosition.y = 12 + Math.random() * height;
  heartCoin.style.left = `${coinPosition.x}px`;
  heartCoin.style.top = `${coinPosition.y}px`;
}

function renderPlayer() {
  heartPlayer.style.left = `${playerPosition.x}px`;
  heartPlayer.style.top = `${playerPosition.y}px`;
}

function tryCollectCoin() {
  const dx = playerPosition.x - coinPosition.x;
  const dy = playerPosition.y - coinPosition.y;
  const distance = Math.hypot(dx, dy);

  if (distance < 34) {
    collectedHearts = Math.min(collectedHearts + 1, heartGoal);
    heartScore.textContent = String(collectedHearts);

    if (collectedHearts >= heartGoal) {
      heartFeedback.textContent =
        "Você conseguiu. Agora pode abrir o meu bilhetinho escondido aqui embaixo.";
      heartReward.classList.add("is-visible");
      heartCoin.style.display = "none";
      return;
    }

    heartFeedback.textContent = `Boa. Você pegou uma moedinha. Faltam ${heartGoal - collectedHearts}.`;
    placeCoin();
  }
}

function movePlayer(dx, dy) {
  const maxX = Math.max(heartHunt.clientWidth - 52, 8);
  const maxY = Math.max(heartHunt.clientHeight - 52, 8);
  playerPosition.x = Math.min(Math.max(playerPosition.x + dx, 8), maxX);
  playerPosition.y = Math.min(Math.max(playerPosition.y + dy, 8), maxY);
  renderPlayer();
  tryCollectCoin();
}

function moveNoButton() {
  const stageWidth = proposalStage.clientWidth;
  const stageHeight = proposalStage.clientHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const maxX = Math.max(stageWidth - buttonWidth - 20, 8);
  const maxY = Math.max(stageHeight - buttonHeight - 20, 8);
  const left = 10 + Math.random() * maxX;
  const top = 10 + Math.random() * maxY;

  noButton.style.position = "absolute";
  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
  noButton.style.right = "auto";
  noButton.style.transform = "none";
}

function renderCarousel() {
  photoSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentPhoto);
  });

  const dots = photoDots.querySelectorAll(".photo-carousel__dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentPhoto);
  });

  photoCaption.textContent = photoCaptions[currentPhoto] ?? "";
}

function buildCarouselDots() {
  photoSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "photo-carousel__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para foto ${index + 1}`);
    dot.addEventListener("click", () => {
      currentPhoto = index;
      renderCarousel();
    });
    photoDots.appendChild(dot);
  });
}

function renderWhoQuestion() {
  whoPrompt.textContent = whoQuestions[currentWhoQuestion].prompt;
  quizOptions.forEach((item) => item.classList.remove("is-selected"));
  quizFeedback.textContent = "Vamos ver se você acerta o que eu responderia.";
  answeredCurrentQuestion = false;

  if (currentWhoQuestion === whoQuestions.length - 1) {
    whoNext.textContent = "Ver resultado";
  } else {
    whoNext.textContent = "Próxima pergunta";
  }
}

function renderWhoScore() {
  whoCorrect.textContent = String(whoCorrectCount);
  whoWrong.textContent = String(whoWrongCount);
}

function getWhoResultMessage() {
  if (whoCorrectCount >= 8) {
    return "Experiente no assunto. Você me conhece direitinho e já pode pedir seu diploma oficial de namorado atento.";
  }

  if (whoCorrectCount >= 6) {
    return "Foi muito bem. Você me conhece bastante, mas eu ainda vou te testar mais um pouquinho.";
  }

  if (whoCorrectCount >= 4) {
    return "Foi razoável. Está aprovado com recuperação afetiva e revisão prática comigo depois.";
  }

  return "Poucos acertos. Vai ter que estudar mais essa namorada aqui, porque eu esperava um desempenho melhor.";
}

for (let index = 0; index < 12; index += 1) {
  window.setTimeout(createPetal, index * 550);
}

window.setInterval(createPetal, 1800);

spreadLoveButton.addEventListener("click", () => {
  burstPetals(18);
  spreadLoveButton.textContent = "Mais amor ainda";
});

toggleLetterButton.addEventListener("click", () => {
  document.body.classList.toggle("is-night");
  toggleLetterButton.textContent = document.body.classList.contains("is-night")
    ? "Voltar ao dourado"
    : "Acender a noite";
});

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (answeredCurrentQuestion) {
      return;
    }

    quizOptions.forEach((item) => item.classList.remove("is-selected"));
    option.classList.add("is-selected");
    answeredCurrentQuestion = true;

    if (option.dataset.person === whoQuestions[currentWhoQuestion].answer) {
      quizFeedback.textContent = `Acertou. ${whoQuestions[currentWhoQuestion].response}`;
      whoCorrectCount += 1;
      renderWhoScore();
      return;
    }

    quizFeedback.textContent = `Errou. A resposta certa é esta: ${whoQuestions[currentWhoQuestion].response}`;
    whoWrongCount += 1;
    renderWhoScore();
  });
});

whoNext.addEventListener("click", () => {
  if (!answeredCurrentQuestion) {
    quizFeedback.textContent = "Escolhe uma resposta antes de passar para a próxima.";
    return;
  }

  if (currentWhoQuestion === whoQuestions.length - 1) {
    whoResult.textContent = getWhoResultMessage();
    whoNext.disabled = true;
    whoNext.textContent = "Fim do jogo";
    return;
  }

  currentWhoQuestion += 1;
  renderWhoQuestion();
});

heartHunt.addEventListener("keydown", (event) => {
  const step = 18;

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    event.preventDefault();
    movePlayer(0, -step);
  } else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    event.preventDefault();
    movePlayer(0, step);
  } else if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    movePlayer(-step, 0);
  } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    movePlayer(step, 0);
  }
});

heartHunt.addEventListener("click", () => {
  heartHunt.focus();
});

photoPrev.addEventListener("click", () => {
  currentPhoto = (currentPhoto - 1 + photoSlides.length) % photoSlides.length;
  renderCarousel();
});

photoNext.addEventListener("click", () => {
  currentPhoto = (currentPhoto + 1) % photoSlides.length;
  renderCarousel();
});

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesButton.addEventListener("click", () => {
  proposalMessage.textContent =
    "Sabia. Então fica combinado: mais um ano de amor, risadas, cuidado e muitos capítulos lindos com você.";
  proposalMessage.classList.add("is-visible");
  yesButton.textContent = "Escolha perfeita";
});

window.addEventListener("load", () => {
  buildCarouselDots();
  renderCarousel();
  renderPlayer();
  placeCoin();
  renderWhoScore();
  renderWhoQuestion();
});

window.addEventListener("resize", () => {
  renderPlayer();
  placeCoin();
});
