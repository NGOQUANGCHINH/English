// ===== Typing Practice Module =====
const typingPractice = {
    currentIndex: 0,
    vocabulary: [],
    userAnswers: {},
    score: 0,
    streak: 0,
    maxStreak: 0,
    totalAnswered: 0,
    isChecking: false, // Prevent multiple submissions

    init() {
        this.vocabulary = [...window.app.state.vocabulary];
        this.currentIndex = 0;
        this.userAnswers = {};
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.totalAnswered = 0;
        this.isChecking = false;
        
        // Render container first if not already rendered
        if (!document.getElementById('typingInput')) {
            this.renderContainer();
        }
        
        this.setupEventListeners();
        this.displayQuestion();
    },

    setupEventListeners() {
        const input = document.getElementById('typingInput');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                this.checkAnswer();
            }
        });

        document.getElementById('typingSubmit')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.checkAnswer();
        });

        document.getElementById('typingNext')?.addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('typingPrev')?.addEventListener('click', () => {
            this.previousQuestion();
        });

        // Arrow keys navigation
        document.addEventListener('keydown', (e) => {
            if (app.state.currentSection === 'typing-practice') {
                if (e.key === 'ArrowRight') {
                    this.nextQuestion();
                } else if (e.key === 'ArrowLeft') {
                    this.previousQuestion();
                }
            }
        });
    },

    displayQuestion() {
        const word = this.vocabulary[this.currentIndex];
        if (!word) return;

        this.isChecking = false; // Reset checking state

        document.getElementById('typingMeaning').textContent = word.meaning;
        document.getElementById('typingCounter').textContent = 
            `${this.currentIndex + 1} / ${this.vocabulary.length}`;

        // Update progress bar
        const progress = ((this.currentIndex) / this.vocabulary.length) * 100;
        const progressBar = document.getElementById('typingProgressBar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Update stats
        this.updateStats();

        const input = document.getElementById('typingInput');
        input.value = '';
        input.focus();

        const feedback = document.getElementById('typingFeedback');
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'typing-feedback';
        }

        // Update streak display
        const streakEl = document.getElementById('typingStreak');
        if (streakEl) {
            streakEl.textContent = `🔥 ${this.streak}`;
        }
    },

    updateStats() {
        const scoreEl = document.getElementById('typingScore');
        const totalEl = document.getElementById('typingTotal');
        
        if (scoreEl) scoreEl.textContent = `⭐ ${this.score}`;
        if (totalEl) totalEl.textContent = `📝 ${this.totalAnswered}`;
    },

    checkAnswer() {
        // Prevent multiple submissions
        if (this.isChecking) return;
        
        const word = this.vocabulary[this.currentIndex];
        const input = document.getElementById('typingInput');
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = word.term.toLowerCase();

        const feedback = document.getElementById('typingFeedback');

        this.isChecking = true;
        this.totalAnswered++;

        if (userAnswer === correctAnswer) {
            this.score++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            
            if (feedback) {
                feedback.innerHTML = `<span class="feedback-icon">✓</span> Chính xác! <span class="streak-badge">+${this.streak} streak</span>`;
                feedback.className = 'typing-feedback correct';
            }
            
            storage.addLearningHistory(word);

            setTimeout(() => {
                this.isChecking = false;
                this.nextQuestion();
            }, 1200);
        } else {
            this.streak = 0;
            
            if (feedback) {
                feedback.innerHTML = `<span class="feedback-icon">✗</span> Sai rồi! <br><span class="correct-answer">Đáp án: <strong>${word.term}</strong></span>`;
                feedback.className = 'typing-feedback incorrect';
            }
            
            storage.addMistake(word);

            input.classList.add('error-input');
            setTimeout(() => {
                input.classList.remove('error-input');
            }, 500);
            
            // Allow retry after showing wrong answer
            setTimeout(() => {
                this.isChecking = false;
            }, 1500);
        }

        this.userAnswers[this.currentIndex] = {
            question: word.meaning,
            userAnswer: userAnswer,
            correct: userAnswer === correctAnswer
        };

        this.updateStats();
    },

    nextQuestion() {
        if (this.currentIndex < this.vocabulary.length - 1) {
            this.currentIndex++;
            this.displayQuestion();
        } else {
            this.showCompletionStats();
        }
    },

    previousQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.displayQuestion();
        }
    },

    showCompletionStats() {
        const accuracy = this.totalAnswered > 0 ? Math.round((this.score / this.totalAnswered) * 100) : 0;
        
        const statsHTML = `
            <div class="typing-stats-summary">
                <div class="stats-icon">🎉</div>
                <h3>Hoàn Thành!</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Đúng</span>
                        <span class="stat-value correct">${this.score}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Sai</span>
                        <span class="stat-value incorrect">${this.totalAnswered - this.score}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Độ Chính Xác</span>
                        <span class="stat-value">${accuracy}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Streak Cao Nhất</span>
                        <span class="stat-value streak">🔥 ${this.maxStreak}</span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="typingPractice.restart()">🔄 Làm Lại</button>
            </div>
        `;

        const container = document.querySelector('.typing-practice-container');
        if (container) {
            container.innerHTML = statsHTML;
        }
    },

    restart() {
        this.currentIndex = 0;
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.totalAnswered = 0;
        this.userAnswers = {};
        
        // Re-render the container
        this.renderContainer();
        this.displayQuestion();
    },

    renderContainer() {
        const section = document.getElementById('typing-practice');
        if (!section) return;

        section.querySelector('.section-content').innerHTML = `
            <h1>Luyện Gõ Tiếng Anh</h1>
            <div class="typing-practice-container">
                <!-- Stats Bar -->
                <div class="typing-stats-bar">
                    <div class="typing-stat" id="typingScore">⭐ 0</div>
                    <div class="typing-stat" id="typingTotal">📝 0</div>
                    <div class="typing-stat" id="typingStreak">🔥 0</div>
                    <div class="typing-stat" id="typingCounter">1 / 0</div>
                </div>

                <!-- Progress Bar -->
                <div class="typing-progress-wrapper">
                    <div class="typing-progress-bar" id="typingProgressBar"></div>
                </div>

                <!-- Main Card -->
                <div class="typing-card">
                    <div class="typing-meaning">
                        <div class="meaning-label">Nghĩa</div>
                        <div id="typingMeaning" class="meaning-display">Nghĩa sẽ hiển thị ở đây</div>
                    </div>

                    <div class="typing-input-container">
                        <input 
                            type="text" 
                            id="typingInput" 
                            class="typing-input" 
                            placeholder="Nhập từ tiếng Anh..."
                            autocomplete="off"
                            autofocus
                        >
                        <div class="typing-feedback" id="typingFeedback"></div>
                    </div>

                    <div class="typing-controls">
                        <button class="btn btn-secondary btn-icon" id="typingPrev" aria-label="Previous" title="Trước">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button class="btn btn-primary btn-large" id="typingSubmit">
                            <i class="fa-solid fa-check"></i> Kiểm Tra
                        </button>
                        <button class="btn btn-secondary btn-icon" id="typingNext" aria-label="Next" title="Sau">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Re-attach event listeners
        this.setupEventListeners();
    }
};

// Add typing practice styles
const typingPracticeStyles = `
<style>
    .typing-practice-container {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    /* Stats Bar */
    .typing-stats-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, var(--primary) 0%, #764ba2 100%);
        padding: 20px 32px;
        border-radius: 20px;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);
    }

    .typing-stat {
        color: white;
        font-weight: 700;
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* Progress Bar */
    .typing-progress-wrapper {
        width: 100%;
        height: 12px;
        background: var(--border);
        border-radius: 6px;
        overflow: hidden;
    }

    .typing-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--success), #34d399);
        border-radius: 6px;
        transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        width: 0%;
    }

    /* Main Card */
    .typing-card {
        background: white;
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
        border: 1px solid var(--border);
    }

    body.dark-mode .typing-card {
        background: var(--bg-secondary);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.35);
    }

    .typing-meaning {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08));
        border: 3px solid var(--primary);
        border-radius: 20px;
        padding: 36px 24px;
        text-align: center;
        margin-bottom: 28px;
        position: relative;
        overflow: hidden;
    }

    .typing-meaning::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(90deg, var(--primary), #8b5cf6);
    }

    body.dark-mode .typing-meaning {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15));
    }

    .meaning-label {
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--secondary);
        margin-bottom: 16px;
        font-weight: 700;
    }

    .meaning-display {
        font-size: 36px;
        font-weight: 800;
        color: var(--dark);
        line-height: 1.4;
    }

    body.dark-mode .meaning-display {
        color: var(--light);
    }

    .typing-input-container {
        margin-bottom: 28px;
    }

    .typing-input {
        width: 100%;
        padding: 22px 28px;
        font-size: 24px;
        border: 3px solid var(--border);
        border-radius: 16px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        letter-spacing: 0.5px;
    }

    .typing-input:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.2), 0 6px 16px rgba(59, 130, 246, 0.15);
        outline: none;
    }

    .typing-input.error-input {
        animation: shake 0.5s ease-in-out;
        border-color: var(--danger);
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }

    .typing-feedback {
        margin-top: 20px;
        padding: 20px 24px;
        border-radius: 16px;
        font-weight: 600;
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        animation: slideUp 0.3s ease-out;
    }

    .typing-feedback.correct {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.15));
        color: var(--success);
        border: 2px solid var(--success);
    }

    .typing-feedback.incorrect {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(252, 129, 129, 0.15));
        color: var(--danger);
        border: 2px solid var(--danger);
    }

    .feedback-icon {
        font-size: 32px;
    }

    .streak-badge {
        background: linear-gradient(135deg, var(--warning), #fbbf24);
        color: white;
        padding: 6px 16px;
        border-radius: 24px;
        font-size: 15px;
        font-weight: 700;
    }

    .correct-answer {
        font-size: 18px;
    }

    .typing-controls {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
    }

    .btn-large {
        padding: 20px 40px;
        font-size: 20px;
    }

    .typing-counter {
        text-align: center;
        font-weight: 700;
        color: var(--text);
        font-size: 22px;
        background: var(--light);
        padding: 14px 24px;
        border-radius: 14px;
    }

    /* Completion Stats */
    .typing-stats-summary {
        text-align: center;
        padding: 48px;
        background: white;
        border-radius: 24px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
    }

    body.dark-mode .typing-stats-summary {
        background: var(--bg-secondary);
    }

    .stats-icon {
        font-size: 80px;
        margin-bottom: 20px;
        animation: bounce 1s ease infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
    }

    .typing-stats-summary h3 {
        font-size: 36px;
        color: var(--primary);
        margin-bottom: 28px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 36px;
    }

    .stat-item {
        background: var(--light);
        padding: 24px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .stat-label {
        font-size: 15px;
        color: var(--secondary);
        text-transform: uppercase;
        letter-spacing: 1.5px;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 800;
        color: var(--dark);
    }

    body.dark-mode .stat-value {
        color: var(--light);
    }

    .stat-value.correct {
        color: var(--success);
    }

    .stat-value.incorrect {
        color: var(--danger);
    }

    .stat-value.streak {
        color: var(--warning);
    }

    @media (max-width: 768px) {
        .typing-stats-bar {
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
            padding: 16px 20px;
        }
        
        .typing-stat {
            font-size: 16px;
        }

        .typing-card {
            padding: 24px;
        }

        .meaning-display {
            font-size: 26px;
        }

        .typing-input {
            font-size: 18px;
            padding: 16px 20px;
        }

        .typing-controls {
            flex-wrap: wrap;
        }

        .btn-large {
            padding: 16px 28px;
            font-size: 16px;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .stat-value {
            font-size: 24px;
        }
    }
</style>
`;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.head.insertAdjacentHTML('beforeend', typingPracticeStyles);
    });
} else {
    document.head.insertAdjacentHTML('beforeend', typingPracticeStyles);
}

// Expose typing practice globally
window.typingPractice = typingPractice;
