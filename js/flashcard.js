// ===== Flashcard Module =====
const flashcard = {
    currentIndex: 0,
    isFlipped: false,
    vocabulary: [],
    shuffled: false,

    init() {
        // Ensure window.app is available before initializing
        if (!window.app) {
            console.error('App not initialized yet');
            return;
        }
        
        this.vocabulary = [...(window.app.state?.vocabulary || [])];
        this.currentIndex = 0;
        this.isFlipped = false;
        this.shuffled = false;
        this.setupEventListeners();
        this.displayCard();
    },

    setupEventListeners() {
        const flashcardEl = document.getElementById('flashcard');
        if (flashcardEl) {
            flashcardEl.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleFlip();
            });
        }

        const flipBtn = document.getElementById('flipFlashcard');
        if (flipBtn) {
            flipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFlip();
            });
        }

        const nextBtn = document.getElementById('nextFlashcard');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextCard();
            });
        }

        const prevBtn = document.getElementById('prevFlashcard');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.previousCard();
            });
        }

        const shuffleBtn = document.getElementById('shuffleFlashcard');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.shuffle();
            });
        }

        const speakBtn = document.getElementById('speakFlashcard');
        if (speakBtn) {
            speakBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = this.vocabulary[this.currentIndex];
                if (card && window.app && typeof window.app.speak === 'function') {
                    window.app.speak(card.term);
                } else {
                    console.warn('No card to speak or TTS not available');
                    if (window.app) window.app.showToast('Không thể phát âm hiện tại.', 'error');
                }
            });
        }
    },

    displayCard() {
        const card = this.vocabulary[this.currentIndex];
        
        // Handle empty vocabulary
        if (!card || this.vocabulary.length === 0) {
            const termEl = document.getElementById('flashcardTerm');
            const meaningEl = document.getElementById('flashcardMeaning');
            const pronunciationEl = document.getElementById('flashcardPronunciation');
            const counterEl = document.getElementById('flashcardCounter');
            
            if (termEl) termEl.textContent = 'Chưa có từ vựng';
            if (meaningEl) meaningEl.textContent = 'Hãy tải từ vựng lên';
            if (pronunciationEl) pronunciationEl.textContent = '';
            if (counterEl) counterEl.textContent = '0 / 0';
            return;
        }

        const termEl = document.getElementById('flashcardTerm');
        const meaningEl = document.getElementById('flashcardMeaning');
        const pronunciationEl = document.getElementById('flashcardPronunciation');
        const counterEl = document.getElementById('flashcardCounter');
        
        if (termEl) termEl.textContent = card.term;
        if (meaningEl) meaningEl.textContent = card.meaning;
        if (pronunciationEl) pronunciationEl.textContent = card.pronunciation || '';
        if (counterEl) counterEl.textContent = 
            `${this.currentIndex + 1} / ${this.vocabulary.length}`;

        // Reset flip state
        this.isFlipped = false;
        const flashcardEl = document.getElementById('flashcard');
        if (flashcardEl) flashcardEl.classList.remove('flipped');
    },

    toggleFlip() {
        this.isFlipped = !this.isFlipped;
        const flashcardEl = document.getElementById('flashcard');
        const innerEl = flashcardEl?.querySelector('.flashcard-inner');

        if (flashcardEl && innerEl) {
            if (this.isFlipped) {
                flashcardEl.classList.add('flipped');
                innerEl.style.transform = 'rotateY(180deg)';
            } else {
                flashcardEl.classList.remove('flipped');
                innerEl.style.transform = 'rotateY(0deg)';
            }
        }
    },

    nextCard() {
        if (this.currentIndex < this.vocabulary.length - 1) {
            this.currentIndex++;
            this.displayCard();
        } else {
            // Already at the last card
            if (window.app) {
                window.app.showToast('Đã đến thẻ cuối cùng!', 'info');
            }
        }
    },

    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.displayCard();
        } else {
            // Already at the first card
            if (window.app) {
                window.app.showToast('Đã đến thẻ đầu tiên!', 'info');
            }
        }
    },

    shuffle() {
        // Fisher-Yates shuffle algorithm for proper randomization
        const arr = [...this.vocabulary];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        this.vocabulary = arr;
        this.currentIndex = 0;
        this.shuffled = true;
        this.displayCard();
        if (window.app) {
            window.app.showToast('Đã đảo thẻ!', 'info');
        } else {
            console.log('Đã đảo thẻ!');
        }
    },

    markCorrect() {
        const card = this.vocabulary[this.currentIndex];
        if (!card) return;
        
        // Use window.storage to ensure it's accessible
        if (window.storage && typeof window.storage.addLearningHistory === 'function') {
            window.storage.addLearningHistory(card);
        }
        
        // Show success animation
        const element = document.getElementById('flashcard');
        if (element) {
            element.classList.add('correct-answer');
        }
        
        if (window.app) {
            window.app.showToast('✓ Đúng! Tuyệt vời!', 'success');
        }
        
        setTimeout(() => {
            if (element) element.classList.remove('correct-answer');
            this.nextCard();
        }, 800);
    },

    markIncorrect() {
        const card = this.vocabulary[this.currentIndex];
        if (!card) return;
        
        // Use window.storage to ensure it's accessible
        if (window.storage && typeof window.storage.addMistake === 'function') {
            window.storage.addMistake(card);
        }
        
        // Show error animation
        const element = document.getElementById('flashcard');
        if (element) {
            element.classList.add('incorrect-answer');
        }
        
        if (window.app) {
            window.app.showToast('✗ Sai rồi! Hãy học kỹ hơn!', 'error');
        }
        
        setTimeout(() => {
            if (element) element.classList.remove('incorrect-answer');
            this.nextCard();
        }, 1000);
    }
};

// Add flashcard styles
const flashcardStyles = `
<style>
    .flashcard-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
</style>
`;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.head.insertAdjacentHTML('beforeend', flashcardStyles);
    });
} else {
    document.head.insertAdjacentHTML('beforeend', flashcardStyles);
}

// Expose flashcard module globally so app can control it
window.flashcard = flashcard;
