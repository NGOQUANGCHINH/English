// ===== Vocabulary Management =====
const vocabulary = {
    currentFilter: '',
    filteredList: [],

    init() {
        this.displayVocabulary();
        this.setupSearch();
    },

    setupSearch() {
        const searchInput = document.getElementById('vocabSearch');
        searchInput.addEventListener('input', (e) => {
            this.currentFilter = e.target.value.toLowerCase();
            this.filterAndDisplay();
        });
    },

    displayVocabulary() {
        this.filteredList = window.app.state.vocabulary;
        this.renderList();
        this.updateCount();
    },

    displaySearchResults(results) {
        this.filteredList = results;
        this.renderList();
        this.updateCount();
    },

    filterAndDisplay() {
        if (!this.currentFilter) {
            this.filteredList = window.app.state.vocabulary;
        } else {
            this.filteredList = window.app.state.vocabulary.filter(word =>
                word.term.toLowerCase().includes(this.currentFilter) ||
                word.meaning.toLowerCase().includes(this.currentFilter)
            );
        }

        this.renderList();
        this.updateCount();
    },

    renderList() {
        const container = document.getElementById('vocabularyList');

        if (this.filteredList.length === 0) {
            container.innerHTML = '<p class="empty-message">Không tìm thấy từ vựng nào.</p>';
            return;
        }

        container.innerHTML = this.filteredList.map((word, index) => `
            <div class="vocab-item" style="animation-delay: ${index * 0.05}s">
                <div class="vocab-header">
                    <div>
                        <div class="vocab-term">${word.term}</div>
                        <div class="vocab-pron">${word.pronunciation || word.pron || ''}</div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
                        <button class="btn btn-secondary btn-small speak-btn" data-term="${(word.term || '').replace(/"/g, '&quot;')}" title="Nghe">🔊</button>
                        <button class="btn btn-small example-btn" data-index="${index}" title="Ví dụ">📘</button>
                    </div>
                </div>
                <div class="vocab-meaning">${word.meaning || ''}</div>
                <div class="vocab-actions">
                    <button class="btn btn-primary btn-small learn-btn" data-index="${index}">➕ Học</button>
                </div>
            </div>
        `).join('');

        // Attach event listeners for newly rendered buttons
        container.querySelectorAll('.speak-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const term = btn.dataset.term;
                if (window.app && typeof window.app.speak === 'function') {
                    window.app.speak(term);
                } else {
                    console.warn('app.speak not available yet');
                }
            });
        });

        container.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index, 10);
                this.showExampleByIndex(idx);
            });
        });

        container.querySelectorAll('.learn-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index, 10);
                this.addToLearningByIndex(idx);
            });
        });

        // ensure example modal exists
        if (!document.getElementById('vocabExampleModal')) {
            const modal = `
                <div class="modal" id="vocabExampleModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Ví dụ</h3>
                            <button class="modal-close" onclick="vocabulary.hideExample()">✕</button>
                        </div>
                        <div id="vocabExampleContent" style="padding:16px;font-size:16px;line-height:1.5"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modal);
        }
    },

    addToLearningByIndex(idx) {
        const word = this.filteredList[idx];
        if (!word) return;
        storage.addLearningHistory(word);
        app.showToast('Đã thêm vào lịch học!', 'success');
    },

    showExampleByIndex(idx) {
        const word = this.filteredList[idx];
        if (!word) return;
        const modal = document.getElementById('vocabExampleModal');
        const content = document.getElementById('vocabExampleContent');
        const example = word.example || word.sentence || word.context || `Ví dụ: I use "${word.term}" in a sentence.`;
        content.textContent = example;
        modal.classList.add('active');
    },

    hideExample() {
        const modal = document.getElementById('vocabExampleModal');
        if (modal) modal.classList.remove('active');
    },

    updateCount() {
        document.getElementById('vocabCount').textContent = `${this.filteredList.length} từ`;
    }
};

// Add vocabulary styles
const vocabStyles = `
<style>
    .vocab-controls {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        align-items: center;
    }

    .vocab-search {
        flex: 1;
        max-width: 400px;
    }

    .vocab-stats {
        font-weight: 600;
        color: var(--primary);
        white-space: nowrap;
    }

    .vocabulary-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
    }

    .vocab-item {
        background: white;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 16px;
        box-shadow: var(--shadow-sm);
        transition: all var(--transition);
    }

    body.dark-mode .vocab-item {
        background: var(--bg-secondary);
    }

    .vocab-item:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary);
    }

    .vocab-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 12px;
        gap: 8px;
    }

    .vocab-term {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary);
        flex: 1;
        word-break: break-word;
    }

    body.dark-mode .vocab-term {
        color: #ffffff;
    }

    .vocab-meaning {
        color: var(--text);
        font-size: 14px;
        margin-bottom: 12px;
        padding: 8px;
        background: rgba(59, 130, 246, 0.05);
        border-radius: var(--radius-sm);
    }

    .vocab-pron {
        font-size: 13px;
        color: var(--secondary);
        font-style: italic;
        margin-top: 4px;
    }

    .vocab-actions {
        display: flex;
        gap: 8px;
    }

    .vocab-actions .btn {
        flex: 1;
    }
</style>
`;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.head.insertAdjacentHTML('beforeend', vocabStyles);
    });
} else {
    document.head.insertAdjacentHTML('beforeend', vocabStyles);
}

// Expose to global for immediate updates from app
window.vocabulary = vocabulary;
