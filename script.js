const global = {
  qid: 1,
  score: 0,
};

const next = document.querySelector(".next");

async function addToDom() {
  const div = document.querySelector(".ques");
  const head = document.querySelector(".prog");
  const res = await data();
  res.forEach((q) => {
    if (q.id === global.qid) {
      div.innerHTML = `
        <h1 id = ${global.qid}>Q${global.qid}: ${q.question}</h1>            
        <hr>
        <div class="opt">
        ${addOptions(q.options)}
        </div>
      `;
      head.innerHTML = ` <h3>Progess: ${q.id} / 10</h3>
      <h3>Score: ${global.score}</h3>`;
    }
  });
  document.querySelectorAll(`.option`).forEach((e) => {
    e.addEventListener("click", sub);
  });
}

async function sub(e) {
  const res = await data();

  res.forEach((q) => {
    if (e.target.textContent === q.correct_answer) {
      e.target.classList.add("green");
      global.score = global.score + 10;
    }

    if (!(e.target.textContent === q.correct_answer)) {
      e.target.classList.add("red");
      global.score = global.score + 0;

      setTimeout(() => {
        document.querySelectorAll(`.option`).forEach((m) => {
          if (m.textContent === q.correct_answer) {
            m.classList.add("green");
          }
        });
      }, 500);
    }
  });
}

async function data() {
  const data = await fetch("./data.json");
  const res = await data.json();
  return res;
}

function addOptions(e) {
  return e.map((m) => `<button class="option" >${m}</button>`).join("");
}

function forward() {
  global.qid = global.qid + 1;
  addToDom();
}

next.addEventListener("click", forward);

addToDom();
