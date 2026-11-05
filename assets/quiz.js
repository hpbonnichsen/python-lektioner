/* Reusable retrieval-practice quiz widget.
   Usage: renderQuiz(containerEl, { question, options: [{text, correct, explain}] })
   Renders a multiple-choice question with immediate feedback. */
function renderQuiz(container, config) {
  const wrap = document.createElement('div');
  wrap.className = 'quiz-block';

  const q = document.createElement('div');
  q.className = 'quiz-question';
  q.innerHTML = config.question;
  wrap.appendChild(q);

  const list = document.createElement('div');
  list.className = 'quiz-options';

  const feedback = document.createElement('div');
  feedback.className = 'quiz-feedback';
  feedback.style.display = 'none';

  let answered = false;

  config.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      [...list.children].forEach((b) => (b.disabled = true));
      btn.classList.add(opt.correct ? 'quiz-correct' : 'quiz-incorrect');
      if (!opt.correct) {
        const correctBtn = [...list.children].find((_, i) => config.options[i].correct);
        if (correctBtn) correctBtn.classList.add('quiz-correct');
      }
      feedback.style.display = 'block';
      feedback.className = 'quiz-feedback ' + (opt.correct ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect');
      feedback.textContent = (opt.correct ? 'Rigtigt. ' : 'Ikke helt. ') + (opt.explain || '');
    });
    list.appendChild(btn);
  });

  wrap.appendChild(list);
  wrap.appendChild(feedback);
  container.appendChild(wrap);
}
