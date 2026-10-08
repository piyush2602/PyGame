/**
 * Python Code Builder - Main Application Engine
 * Handles Drag & Drop, Tap-to-Place, Game State, Sound, 
 * Teacher Configuration, Timer, and Educational Diagnostics.
 */

// ============================================================
// Global State
// ============================================================
const gameState = {
  // Teacher / Session settings
  config: {
    difficulty: "All",         // All | Easy | Medium | Hard
    questionCount: 20,         // 5 | 10 | 20 | 'All'
    timerLimit: 0,             // 0 (disabled), 20, 35, 60
    livesLimit: 3,             // 3, 5, 999 (unlimited)
    soundEnabled: true,
    selectedTopics: [...TOPICS_LIST]
  },

  // Active session
  deck: [],                    // Shuffled active questions
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  lives: 3,
  timeRemaining: 0,
  timerInterval: null,

  // Current question state
  currentQuestion: null,
  placedAnswers: {},           // blankId -> string
  isSolved: false,
  attemptsOnCurrent: 0,
  selectedChipForTap: null,    // For tap-to-place fallback

  // Session stats & diagnostics
  sessionRecords: []           // Tracks results per question
};

// ============================================================
// Initialization
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initDOMReferences();
  initConfetti();
  initTeacherModalTopics();
  bindGlobalEvents();
  startNewSession();
});

// Cache DOM elements
let dom = {};

function initDOMReferences() {
  dom = {
    // Header & HUD
    soundToggleBtn: document.getElementById("soundToggleBtn"),
    soundIcon: document.getElementById("soundIcon"),
    restartBtn: document.getElementById("restartBtn"),
    teacherModeBtn: document.getElementById("teacherModeBtn"),
    questionCounter: document.getElementById("questionCounter"),
    scoreCounter: document.getElementById("scoreCounter"),
    streakBadge: document.getElementById("streakBadge"),
    streakCount: document.getElementById("streakCount"),
    progressPercent: document.getElementById("progressPercent"),
    progressBar: document.getElementById("progressBar"),
    livesContainer: document.getElementById("livesContainer"),
    timerPill: document.getElementById("timerPill"),
    timerDisplay: document.getElementById("timerDisplay"),

    // Stage
    difficultyBadge: document.getElementById("difficultyBadge"),
    topicBadge: document.getElementById("topicBadge"),
    questionTitle: document.getElementById("questionTitle"),
    codeEditorBody: document.getElementById("codeEditorBody"),
    optionsContainer: document.getElementById("optionsContainer"),
    
    // Feedback
    feedbackContainer: document.getElementById("feedbackContainer"),
    feedbackStatus: document.getElementById("feedbackStatus"),
    feedbackIcon: document.getElementById("feedbackIcon"),
    feedbackMessage: document.getElementById("feedbackMessage"),
    feedbackPoints: document.getElementById("feedbackPoints"),
    explanationBody: document.getElementById("explanationBody"),

    // Buttons
    multiBlankActions: document.getElementById("multiBlankActions"),
    checkAnswerBtn: document.getElementById("checkAnswerBtn"),
    clearBlanksBtn: document.getElementById("clearBlanksBtn"),
    nextQuestionBtn: document.getElementById("nextQuestionBtn"),

    // Teacher Modal
    teacherModal: document.getElementById("teacherModal"),
    closeTeacherModalBtn: document.getElementById("closeTeacherModalBtn"),
    cancelTeacherModalBtn: document.getElementById("cancelTeacherModalBtn"),
    applyTeacherSettingsBtn: document.getElementById("applyTeacherSettingsBtn"),
    topicsFilterGrid: document.getElementById("topicsFilterGrid"),
    selectAllTopicsBtn: document.getElementById("selectAllTopicsBtn"),
    clearAllTopicsBtn: document.getElementById("clearAllTopicsBtn"),
    teacherSoundToggle: document.getElementById("teacherSoundToggle"),

    // Results Modal
    resultsModal: document.getElementById("resultsModal"),
    perfBadge: document.getElementById("perfBadge"),
    perfSubtext: document.getElementById("perfSubtext"),
    finalScoreVal: document.getElementById("finalScoreVal"),
    finalAccuracyVal: document.getElementById("finalAccuracyVal"),
    finalCorrectRatio: document.getElementById("finalCorrectRatio"),
    finalStreakVal: document.getElementById("finalStreakVal"),
    topicDiagnosticList: document.getElementById("topicDiagnosticList"),
    reviewList: document.getElementById("reviewList"),
    resultsPlayAgainBtn: document.getElementById("resultsPlayAgainBtn")
  };
}

// ============================================================
// Session Flow Management
// ============================================================
function startNewSession() {
  clearInterval(gameState.timerInterval);

  // 1. Filter questions based on teacher configuration
  let pool = QUESTION_BANK.filter(q => {
    // Difficulty filter
    if (gameState.config.difficulty !== "All" && q.difficulty !== gameState.config.difficulty) {
      return false;
    }
    // Topic filter
    if (gameState.config.selectedTopics.length > 0 && !gameState.config.selectedTopics.includes(q.topic)) {
      return false;
    }
    return true;
  });

  // Fallback to all if pool is empty
  if (pool.length === 0) {
    pool = [...QUESTION_BANK];
  }

  // Shuffle pool (Fisher-Yates)
  shuffleArray(pool);

  // Slice count
  const count = gameState.config.questionCount === "All" ? pool.length : parseInt(gameState.config.questionCount, 10);
  gameState.deck = pool.slice(0, Math.min(count, pool.length));

  // Reset counters
  gameState.currentIndex = 0;
  gameState.score = 0;
  gameState.streak = 0;
  gameState.maxStreak = 0;
  gameState.lives = gameState.config.livesLimit;
  gameState.sessionRecords = [];
  gameState.selectedChipForTap = null;

  // Update HUD
  updateHUDLives();
  updateHUDScore();
  updateHUDProgress();

  // Load first question
  loadQuestion(gameState.currentIndex);
}

function loadQuestion(index) {
  if (index >= gameState.deck.length) {
    showFinalResults();
    return;
  }

  gameState.currentQuestion = gameState.deck[index];
  gameState.placedAnswers = {};
  gameState.isSolved = false;
  gameState.attemptsOnCurrent = 0;
  gameState.selectedChipForTap = null;

  // Hide feedback & disable Next
  dom.feedbackContainer.className = "feedback-container";
  dom.nextQuestionBtn.disabled = true;

  // Multi-blank check button visibility
  if (gameState.currentQuestion.blanks.length > 1) {
    dom.multiBlankActions.classList.add("show");
  } else {
    dom.multiBlankActions.classList.remove("show");
  }

  // Render Question Header
  dom.difficultyBadge.textContent = gameState.currentQuestion.difficulty;
  dom.difficultyBadge.className = `difficulty-badge diff-${gameState.currentQuestion.difficulty.toLowerCase()}`;
  dom.topicBadge.textContent = gameState.currentQuestion.topic;
  dom.questionTitle.textContent = gameState.currentQuestion.title;
  dom.questionCounter.textContent = `${index + 1}/${gameState.deck.length}`;

  // Render Code with Drop Targets
  renderCodeWindow(gameState.currentQuestion);

  // Render Draggable Options
  renderOptionsTray(gameState.currentQuestion);

  // Update Progress
  updateHUDProgress();

  // Setup Timer
  setupQuestionTimer();
}

// ============================================================
// Code Window & Drop Target Rendering
// ============================================================
function renderCodeWindow(question) {
  dom.codeEditorBody.innerHTML = "";

  const lines = question.code.split("\n");
  lines.forEach((lineText, lineIdx) => {
    const lineRow = document.createElement("div");
    lineRow.className = "code-line";

    const lineNum = document.createElement("span");
    lineNum.className = "line-number";
    lineNum.textContent = lineIdx + 1;
    lineRow.appendChild(lineNum);

    const lineContent = document.createElement("div");
    lineContent.className = "line-content";

    // Parse blanks in this line: e.g. {blank:0}
    const parts = lineText.split(/({blank:\d+})/g);

    parts.forEach(part => {
      const match = part.match(/{blank:(\d+)}/);
      if (match) {
        const blankId = parseInt(match[1], 10);
        const blankBox = createDropTarget(blankId, question.blanks.find(b => b.id === blankId));
        lineContent.appendChild(blankBox);
      } else if (part.length > 0) {
        // Syntax Highlight line text tokens
        const tokensSpan = syntaxHighlightSnippet(part);
        lineContent.appendChild(tokensSpan);
      }
    });

    lineRow.appendChild(lineContent);
    dom.codeEditorBody.appendChild(lineRow);
  });
}

function createDropTarget(blankId, blankInfo) {
  const box = document.createElement("span");
  box.className = "blank-box";
  box.id = `blank-${blankId}`;
  box.dataset.blankId = blankId;
  box.setAttribute("role", "button");
  box.setAttribute("aria-label", `Missing code blank ${blankId + 1}`);

  box.innerHTML = `<span class="blank-placeholder">______</span>`;

  // HTML5 Drag and Drop events
  box.addEventListener("dragover", handleDragOver);
  box.addEventListener("dragleave", handleDragLeave);
  box.addEventListener("drop", handleDrop);

  // Tap-to-place fallback event
  box.addEventListener("click", () => handleBlankClick(blankId));

  return box;
}

// Lightweight syntax highlighting token parser
function syntaxHighlightSnippet(text) {
  const container = document.createElement("span");

  // Check for comments
  if (text.trim().startsWith("#")) {
    const span = document.createElement("span");
    span.className = "syn-comment";
    span.textContent = text;
    container.appendChild(span);
    return container;
  }

  // Token regex for strings, numbers, operators, keywords
  const tokenRegex = /(".*?"|'.*?'|\b(?:if|else|elif|for|while|in|def|return|and|or|not|break|continue|True|False|None)\b|\b(?:print|input|range|type|len|int|float|str|bool)\b|\b\d+\b|[+\-*/%<>=!:]+|[a-zA-Z_]\w*|[^\s\w]+|\s+)/g;

  const matches = text.match(tokenRegex) || [text];

  matches.forEach(token => {
    const span = document.createElement("span");
    if (/^(".*?"|'.*?')$/.test(token)) {
      span.className = "syn-str";
    } else if (/^\b(?:if|else|elif|for|while|in|def|return|and|or|not|break|continue|True|False|None)\b$/.test(token)) {
      span.className = "syn-kw";
    } else if (/^\b(?:print|input|range|type|len|int|float|str|bool)\b$/.test(token)) {
      span.className = "syn-fn";
    } else if (/^\b\d+\b$/.test(token)) {
      span.className = "syn-num";
    } else if (/^[+\-*/%<>=!:]+$/.test(token)) {
      span.className = "syn-op";
    } else {
      span.className = "syn-plain";
    }
    span.textContent = token;
    container.appendChild(span);
  });

  return container;
}

// ============================================================
// Options Tray & Drag/Touch Handlers
// ============================================================
function renderOptionsTray(question) {
  dom.optionsContainer.innerHTML = "";

  // Randomize choices order so correct answer position changes!
  const shuffledChoices = [...question.options];
  shuffleArray(shuffledChoices);

  shuffledChoices.forEach((choice, idx) => {
    const chip = document.createElement("div");
    chip.className = "draggable-chip";
    chip.id = `chip-${idx}`;
    chip.draggable = true;
    chip.dataset.value = choice;
    chip.setAttribute("role", "button");
    chip.setAttribute("tabindex", "0");
    chip.setAttribute("aria-label", `Code option: ${choice}`);

    chip.innerHTML = `
      <span class="drag-grip-icon">⋮⋮</span>
      <span>${escapeHtml(choice)}</span>
    `;

    // HTML5 Drag Events
    chip.addEventListener("dragstart", handleDragStart);
    chip.addEventListener("dragend", handleDragEnd);

    // Tap/Click event for mobile/tablet fallback
    chip.addEventListener("click", () => handleChipClick(chip));

    dom.optionsContainer.appendChild(chip);
  });
}

// --- Drag and Drop Handlers ---
let draggedValue = null;

function handleDragStart(e) {
  if (gameState.isSolved) {
    e.preventDefault();
    return;
  }
  draggedValue = e.currentTarget.dataset.value;
  e.currentTarget.classList.add("dragging");
  e.dataTransfer.setData("text/plain", draggedValue);
  e.dataTransfer.effectAllowed = "move";
  window.soundFx.playPop();
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  draggedValue = null;
  document.querySelectorAll(".blank-box").forEach(b => b.classList.remove("drag-over"));
}

function handleDragOver(e) {
  e.preventDefault();
  if (gameState.isSolved) return;
  e.dataTransfer.dropEffect = "move";
  e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  if (gameState.isSolved) return;

  const value = e.dataTransfer.getData("text/plain") || draggedValue;
  if (!value) return;

  const blankId = parseInt(e.currentTarget.dataset.blankId, 10);
  placeOptionInBlank(blankId, value);
}

// --- Tap to Place / Click Fallback ---
function handleChipClick(chipElement) {
  if (gameState.isSolved) return;

  window.soundFx.playPop();

  // If chip already selected, deselect
  if (gameState.selectedChipForTap === chipElement) {
    chipElement.classList.remove("selected-for-tap");
    gameState.selectedChipForTap = null;
    return;
  }

  // Clear previous selected chip
  document.querySelectorAll(".draggable-chip").forEach(c => c.classList.remove("selected-for-tap"));

  gameState.selectedChipForTap = chipElement;
  chipElement.classList.add("selected-for-tap");

  // Smart convenience: If there's only 1 blank in the question, auto-place immediately!
  if (gameState.currentQuestion.blanks.length === 1) {
    placeOptionInBlank(0, chipElement.dataset.value);
    chipElement.classList.remove("selected-for-tap");
    gameState.selectedChipForTap = null;
  }
}

function handleBlankClick(blankId) {
  if (gameState.isSolved) return;

  // Case 1: An option is actively selected via tap -> place it!
  if (gameState.selectedChipForTap) {
    const val = gameState.selectedChipForTap.dataset.value;
    placeOptionInBlank(blankId, val);
    gameState.selectedChipForTap.classList.remove("selected-for-tap");
    gameState.selectedChipForTap = null;
    return;
  }

  // Case 2: Blank already has a placed value -> remove it to let student change mind
  if (gameState.placedAnswers[blankId]) {
    delete gameState.placedAnswers[blankId];
    const targetBox = document.getElementById(`blank-${blankId}`);
    targetBox.innerHTML = `<span class="blank-placeholder">______</span>`;
    targetBox.className = "blank-box";
    window.soundFx.playPop();
  }
}

// ============================================================
// Answer Placement & Evaluation Logic
// ============================================================
function placeOptionInBlank(blankId, value) {
  gameState.placedAnswers[blankId] = value;

  const targetBox = document.getElementById(`blank-${blankId}`);
  if (!targetBox) return;

  targetBox.innerHTML = `<span>${escapeHtml(value)}</span>`;
  targetBox.className = "blank-box filled";

  window.soundFx.playPop();

  // If single blank question, evaluate immediately!
  if (gameState.currentQuestion.blanks.length === 1) {
    evaluateQuestion();
  }
}

function evaluateQuestion() {
  if (gameState.isSolved) return;

  gameState.attemptsOnCurrent++;
  const blanks = gameState.currentQuestion.blanks;
  let allCorrect = true;

  // Validate each blank
  blanks.forEach(blank => {
    const placed = gameState.placedAnswers[blank.id];
    const box = document.getElementById(`blank-${blank.id}`);

    if (placed === blank.answer) {
      if (box) box.className = "blank-box filled state-correct";
    } else {
      allCorrect = false;
      if (box) box.className = "blank-box filled state-wrong";
    }
  });

  if (allCorrect) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
}

function handleCorrectAnswer() {
  gameState.isSolved = true;
  clearInterval(gameState.timerInterval);

  window.soundFx.playCorrect();

  // Score calculation
  const basePoints = gameState.currentQuestion.difficulty === "Hard" ? 200 :
                     gameState.currentQuestion.difficulty === "Medium" ? 150 : 100;
  
  // Bonus multiplier for streaks
  gameState.streak++;
  if (gameState.streak > gameState.maxStreak) {
    gameState.maxStreak = gameState.streak;
  }

  const streakMultiplier = gameState.streak >= 4 ? 1.5 : gameState.streak >= 2 ? 1.25 : 1;
  const pointsEarned = Math.round(basePoints * streakMultiplier);
  gameState.score += pointsEarned;

  updateHUDScore();
  updateHUDStreak();

  // Mini celebration confetti for streaks
  if (gameState.streak >= 3) {
    triggerConfetti(60);
  }

  // Record for diagnostics
  recordQuestionResult(true);

  // Show Feedback banner
  dom.feedbackContainer.className = "feedback-container correct show";
  dom.feedbackIcon.textContent = "🎉";
  dom.feedbackMessage.textContent = "Correct!";
  dom.feedbackPoints.textContent = `+${pointsEarned} pts`;
  dom.feedbackPoints.style.display = "inline-block";
  dom.explanationBody.innerHTML = formatExplanation(gameState.currentQuestion.explanation);

  // Enable Next button
  dom.nextQuestionBtn.disabled = false;
  dom.nextQuestionBtn.focus();
}

function handleWrongAnswer() {
  window.soundFx.playWrong();

  // Reset streak
  gameState.streak = 0;
  updateHUDStreak();

  // Deduct life if in challenge mode
  if (gameState.config.livesLimit < 999) {
    gameState.lives--;
    updateHUDLives();

    if (gameState.lives <= 0) {
      // Game Over triggered!
      recordQuestionResult(false);
      setTimeout(() => {
        showFinalResults("Out of Lives!");
      }, 1200);
      return;
    }
  }

  // Show Feedback banner (Does NOT reveal correct answer)
  dom.feedbackContainer.className = "feedback-container wrong show";
  dom.feedbackIcon.textContent = "⚠️";
  dom.feedbackMessage.textContent = "Try Again!";
  dom.feedbackPoints.style.display = "none";
  dom.explanationBody.innerHTML = `Think about Python syntax for <strong>${escapeHtml(gameState.currentQuestion.topic)}</strong>. Remove or drag another option into the blank box to retry.`;
}

function recordQuestionResult(isSuccess) {
  gameState.sessionRecords.push({
    question: gameState.currentQuestion,
    firstAttemptCorrect: gameState.attemptsOnCurrent === 1 && isSuccess,
    success: isSuccess,
    attempts: gameState.attemptsOnCurrent,
    placedAnswers: { ...gameState.placedAnswers }
  });
}

function clearCurrentBlanks() {
  if (gameState.isSolved) return;
  gameState.placedAnswers = {};
  gameState.selectedChipForTap = null;

  document.querySelectorAll(".blank-box").forEach((box, idx) => {
    box.innerHTML = `<span class="blank-placeholder">______</span>`;
    box.className = "blank-box";
  });

  document.querySelectorAll(".draggable-chip").forEach(c => c.classList.remove("selected-for-tap"));
  dom.feedbackContainer.className = "feedback-container";
  window.soundFx.playPop();
}

// ============================================================
// Timer Management
// ============================================================
function setupQuestionTimer() {
  clearInterval(gameState.timerInterval);

  if (gameState.config.timerLimit <= 0) {
    dom.timerPill.style.display = "none";
    return;
  }

  dom.timerPill.style.display = "inline-flex";
  dom.timerPill.classList.remove("warning");
  gameState.timeRemaining = gameState.config.timerLimit;
  dom.timerDisplay.textContent = `${gameState.timeRemaining}s`;

  gameState.timerInterval = setInterval(() => {
    gameState.timeRemaining--;
    dom.timerDisplay.textContent = `${gameState.timeRemaining}s`;

    if (gameState.timeRemaining <= 5 && gameState.timeRemaining > 0) {
      dom.timerPill.classList.add("warning");
      window.soundFx.playTick();
    }

    if (gameState.timeRemaining <= 0) {
      clearInterval(gameState.timerInterval);
      handleTimeExpired();
    }
  }, 1000);
}

function handleTimeExpired() {
  if (gameState.isSolved) return;

  handleWrongAnswer();
  dom.feedbackContainer.className = "feedback-container wrong show";
  dom.feedbackIcon.textContent = "⏱️";
  dom.feedbackMessage.textContent = "Time's Up! Try Again!";
}

// ============================================================
// HUD Updates
// ============================================================
function updateHUDScore() {
  dom.scoreCounter.textContent = gameState.score;
}

function updateHUDStreak() {
  if (gameState.streak >= 2) {
    dom.streakBadge.style.display = "inline-flex";
    dom.streakCount.textContent = gameState.streak;
  } else {
    dom.streakBadge.style.display = "none";
  }
}

function updateHUDLives() {
  dom.livesContainer.innerHTML = "";

  if (gameState.config.livesLimit >= 999) {
    // Unlimited practice
    dom.livesContainer.innerHTML = `<span class="hud-pill" style="padding: 4px 10px; font-size: 0.78rem;">Practice Mode ♾️</span>`;
    return;
  }

  for (let i = 0; i < gameState.config.livesLimit; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-icon";
    if (i >= gameState.lives) {
      heart.classList.add("lost");
      heart.textContent = "🖤";
    } else {
      heart.textContent = "❤️";
      if (i === gameState.lives - 1) heart.classList.add("pulse");
    }
    dom.livesContainer.appendChild(heart);
  }
}

function updateHUDProgress() {
  const total = gameState.deck.length;
  const current = gameState.currentIndex;
  const pct = Math.round((current / total) * 100);

  dom.progressPercent.textContent = `${pct}%`;
  dom.progressBar.style.width = `${pct}%`;
}

// ============================================================
// Final Results & Educational Diagnostics
// ============================================================
function showFinalResults(customTitle) {
  clearInterval(gameState.timerInterval);
  window.soundFx.playVictory();
  triggerConfetti(140);

  const total = gameState.deck.length;
  const records = gameState.sessionRecords;
  const correctCount = records.filter(r => r.success).length;
  const accuracyPct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  // Hero badge & message
  dom.perfBadge.className = "performance-badge";
  if (accuracyPct >= 85) {
    dom.perfBadge.classList.add("excellent");
    dom.perfBadge.textContent = "⭐ Excellent!";
    dom.perfSubtext.textContent = "Outstanding mastery of Class 9 Python concepts! You write clean, syntactically correct Python code like a pro.";
  } else if (accuracyPct >= 60) {
    dom.perfBadge.classList.add("good");
    dom.perfBadge.textContent = "👍 Good Job!";
    dom.perfSubtext.textContent = "Solid understanding! A little more practice with operators and conditions will make you top your class.";
  } else {
    dom.perfBadge.classList.add("practice");
    dom.perfBadge.textContent = "💪 Keep Practicing!";
    dom.perfSubtext.textContent = "Good effort! Check out the topic breakdown below to focus on areas that need improvement.";
  }

  // Metrics Grid
  dom.finalScoreVal.textContent = gameState.score;
  dom.finalAccuracyVal.textContent = `${accuracyPct}%`;
  dom.finalCorrectRatio.textContent = `${correctCount}/${total}`;
  dom.finalStreakVal.textContent = `${gameState.maxStreak}x`;

  // Render Diagnostic Topic Analysis
  renderTopicDiagnostics(records);

  // Render Detailed Question Review
  renderAnswerReview(records);

  // Open modal
  dom.resultsModal.classList.add("open");
}

function renderTopicDiagnostics(records) {
  dom.topicDiagnosticList.innerHTML = "";

  // Group by topic
  const topicStats = {};
  records.forEach(rec => {
    const t = rec.question.topic;
    if (!topicStats[t]) {
      topicStats[t] = { total: 0, correct: 0 };
    }
    topicStats[t].total++;
    if (rec.success) topicStats[t].correct++;
  });

  const topics = Object.keys(topicStats);
  if (topics.length === 0) {
    dom.topicDiagnosticList.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">No questions completed yet.</p>`;
    return;
  }

  topics.forEach(topic => {
    const stat = topicStats[topic];
    const pct = Math.round((stat.correct / stat.total) * 100);

    const row = document.createElement("div");
    row.className = "topic-row";

    const colorClass = pct >= 80 ? "fill-green" : pct >= 50 ? "fill-yellow" : "fill-red";
    const statusNote = pct >= 80 ? "Mastered" : pct >= 50 ? "Review Needed" : "Needs Practice";

    row.innerHTML = `
      <div class="topic-info-bar">
        <span>${escapeHtml(topic)} (${stat.correct}/${stat.total})</span>
        <span style="color: ${pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'}">${pct}% • ${statusNote}</span>
      </div>
      <div class="topic-bar-track">
        <div class="topic-bar-fill ${colorClass}" style="width: ${pct}%"></div>
      </div>
    `;

    dom.topicDiagnosticList.appendChild(row);
  });
}

function renderAnswerReview(records) {
  dom.reviewList.innerHTML = "";

  records.forEach((rec, idx) => {
    const item = document.createElement("div");
    item.className = `review-item ${rec.success ? "item-correct" : "item-wrong"}`;

    const expectedAnswers = rec.question.blanks.map(b => b.answer).join(", ");

    item.innerHTML = `
      <div class="review-item-header">
        <span>Q${idx + 1}: ${escapeHtml(rec.question.title)} (${escapeHtml(rec.question.topic)})</span>
        <span>${rec.success ? "✅ Correct" : "❌ Incorrect"}</span>
      </div>
      <div style="font-family: var(--font-code); font-size: 0.82rem; background: #ffffff; padding: 6px 10px; border-radius: 4px; border: 1px solid var(--border-light);">
        Correct Word: <strong>${escapeHtml(expectedAnswers)}</strong>
      </div>
      <div class="review-item-explanation">
        💡 ${formatExplanation(rec.question.explanation)}
      </div>
    `;

    dom.reviewList.appendChild(item);
  });
}

// ============================================================
// Teacher Settings Modal Logic
// ============================================================
function initTeacherModalTopics() {
  dom.topicsFilterGrid.innerHTML = "";
  TOPICS_LIST.forEach(topic => {
    const label = document.createElement("label");
    label.className = "topic-checkbox-label";
    label.innerHTML = `
      <input type="checkbox" value="${escapeHtml(topic)}" checked>
      <span>${escapeHtml(topic)}</span>
    `;
    dom.topicsFilterGrid.appendChild(label);
  });
}

function bindGlobalEvents() {
  // Next Question Button
  dom.nextQuestionBtn.addEventListener("click", () => {
    gameState.currentIndex++;
    loadQuestion(gameState.currentIndex);
  });

  // Clear / Reset Blanks Button
  dom.clearBlanksBtn.addEventListener("click", clearCurrentBlanks);

  // Multi-blank Check Answer Button
  dom.checkAnswerBtn.addEventListener("click", evaluateQuestion);

  // Sound Toggle
  dom.soundToggleBtn.addEventListener("click", () => {
    const state = window.soundFx.toggleSound();
    gameState.config.soundEnabled = state;
    dom.soundIcon.textContent = state ? "🔊" : "🔇";
    dom.soundToggleBtn.classList.toggle("active", state);
  });

  // Restart Button
  dom.restartBtn.addEventListener("click", () => {
    if (confirm("Restart game from Question 1? Current score will be reset.")) {
      startNewSession();
    }
  });

  // Teacher Mode Open
  dom.teacherModeBtn.addEventListener("click", () => {
    dom.teacherModal.classList.add("open");
  });

  // Teacher Mode Close
  dom.closeTeacherModalBtn.addEventListener("click", () => {
    dom.teacherModal.classList.remove("open");
  });

  dom.cancelTeacherModalBtn.addEventListener("click", () => {
    dom.teacherModal.classList.remove("open");
  });

  // Teacher Topic Select All / Clear
  dom.selectAllTopicsBtn.addEventListener("click", () => {
    dom.topicsFilterGrid.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = true);
  });

  dom.clearAllTopicsBtn.addEventListener("click", () => {
    dom.topicsFilterGrid.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
  });

  // Pill selectors in Teacher Modal
  bindPillSelector("difficultySelector", "diff");
  bindPillSelector("countSelector", "count");
  bindPillSelector("timerSelector", "timer");
  bindPillSelector("livesSelector", "lives");

  // Apply Teacher Settings
  dom.applyTeacherSettingsBtn.addEventListener("click", () => {
    // 1. Difficulty
    const activeDiff = document.querySelector("#difficultySelector .pill-choice.active").dataset.diff;
    gameState.config.difficulty = activeDiff;

    // 2. Count
    const activeCount = document.querySelector("#countSelector .pill-choice.active").dataset.count;
    gameState.config.questionCount = activeCount;

    // 3. Timer
    const activeTimer = parseInt(document.querySelector("#timerSelector .pill-choice.active").dataset.timer, 10);
    gameState.config.timerLimit = activeTimer;

    // 4. Lives
    const activeLives = parseInt(document.querySelector("#livesSelector .pill-choice.active").dataset.lives, 10);
    gameState.config.livesLimit = activeLives;

    // 5. Sound
    const soundOn = dom.teacherSoundToggle.checked;
    gameState.config.soundEnabled = soundOn;
    window.soundFx.toggleSound(soundOn);
    dom.soundIcon.textContent = soundOn ? "🔊" : "🔇";
    dom.soundToggleBtn.classList.toggle("active", soundOn);

    // 6. Topics
    const checkedTopics = [];
    dom.topicsFilterGrid.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
      checkedTopics.push(cb.value);
    });
    gameState.config.selectedTopics = checkedTopics.length > 0 ? checkedTopics : [...TOPICS_LIST];

    // Close modal & start refreshed game session
    dom.teacherModal.classList.remove("open");
    startNewSession();
  });

  // Play Again from Results Modal
  dom.resultsPlayAgainBtn.addEventListener("click", () => {
    dom.resultsModal.classList.remove("open");
    startNewSession();
  });
}

function bindPillSelector(containerId, dataAttr) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.addEventListener("click", e => {
    const pill = e.target.closest(".pill-choice");
    if (!pill) return;
    container.querySelectorAll(".pill-choice").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
  });
}

// ============================================================
// Particle Confetti Generator (Canvas)
// ============================================================
let confettiParticles = [];
let confettiCtx = null;
let confettiAnimId = null;

function initConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  confettiCtx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
}

function triggerConfetti(count = 100) {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas || !confettiCtx) return;

  const colors = ["#306998", "#4B8BBE", "#FFD43B", "#FFE873", "#10b981", "#ec4899", "#3b82f6"];
  confettiParticles = [];

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * canvas.width * 0.6,
      y: Math.random() * (canvas.height * 0.3),
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 5 + 3,
      angle: Math.random() * 360,
      vAngle: (Math.random() - 0.5) * 10
    });
  }

  cancelAnimationFrame(confettiAnimId);
  renderConfetti();
}

function renderConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas || !confettiCtx) return;

  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);

  let alive = false;
  confettiParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12; // gravity
    p.angle += p.vAngle;

    if (p.y < canvas.height) {
      alive = true;
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.angle * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      confettiCtx.restore();
    }
  });

  if (alive) {
    confettiAnimId = requestAnimationFrame(renderConfetti);
  } else {
    confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ============================================================
// Utilities
// ============================================================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function escapeHtml(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatExplanation(text) {
  if (!text) return "";
  // Convert markdown code like `print()` to <code>print()</code>
  return text.replace(/`([^`]+)`/g, "<code>$1</code>");
}
