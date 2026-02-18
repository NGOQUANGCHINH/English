// ===== Main Application ===== 
class EnglishLearningApp {
    constructor() {
        this.state = {
            currentSection: 'dashboard',
            isDarkMode: localStorage.getItem('darkMode') === 'true',
            speechRate: parseFloat(localStorage.getItem('speechRate')) || 1,
            vocabulary: [],
            learningHistory: [],
            mistakes: [],
            isLoading: false
        };

        // Defer full initialization until DOM is ready so other module scripts
        // loaded after this file are available (dashboard, vocabulary, etc.).
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            // If DOM already loaded, initialize immediately
            this.init();
        }
    }

    init() {
        this.loadVocabulary();
        storage.initDefaultData();
        this.setupEventListeners();
        this.setupDarkMode();
        this.setupSpeechAPI();
        this.displaySection('dashboard');

        // Ensure all modules reflect the loaded vocabulary on startup
        this.refreshAllModules();
    }

    refreshAllModules() {
        const appRef = this;

        if (window.vocabulary) {
            window.vocabulary.filteredList = [...appRef.state.vocabulary];
            window.vocabulary.renderList?.();
            window.vocabulary.updateCount?.();
        }

        if (window.flashcard) {
            window.flashcard.vocabulary = [...appRef.state.vocabulary];
            window.flashcard.currentIndex = 0;
            window.flashcard.displayCard?.();
        }

        if (window.typingPractice) {
            window.typingPractice.vocabulary = [...appRef.state.vocabulary];
            window.typingPractice.currentIndex = 0;
            window.typingPractice.displayQuestion?.();
        }

        if (window.quiz) {
            window.quiz.generateQuestions?.();
            window.quiz.currentIndex = 0;
            window.quiz.displayQuestion?.();
        }

        if (window.dashboard) {
            window.dashboard.updateStats?.();
        }
    }

    setupEventListeners() {
        // Sidebar Navigation (guard elements in case markup missing)
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) sidebarToggle.addEventListener('click', () => this.toggleSidebar());

        const sidebarClose = document.getElementById('sidebarClose');
        if (sidebarClose) sidebarClose.addEventListener('click', () => this.toggleSidebar());

        // Navigation Items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.displaySection(section);
                this.closeSidebar();
            });
        });

        // Expose app globally for other modules
        window.app = this;

        // JSON Upload
        const uploadInput = document.getElementById('jsonUpload');
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => this.handleJsonUpload(e));
        }

        // Export button (optional)
        const exportBtn = document.getElementById('exportVocab');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportVocabulary && this.exportVocabulary());

        // Header search input (global)
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let debounceTimer = null;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                const q = e.target.value || '';
                debounceTimer = setTimeout(() => this.handleGlobalSearch(q), 220);
            });
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleGlobalSearch(e.target.value || '');
                }
            });
        }

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });

            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        });

        // Voice debug / test buttons (Settings)
        const listVoicesBtn = document.getElementById('listVoicesBtn');
        if (listVoicesBtn) {
            listVoicesBtn.addEventListener('click', () => this.listVoices());
        }

        const testVoiceBtn = document.getElementById('testVoiceBtn');
        if (testVoiceBtn) {
            testVoiceBtn.addEventListener('click', () => {
                const sample = 'Hello. This is a voice test.';
                this.speak(sample);
            });
        }

        // Theme toggle button in header
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleDarkMode());
        }
    }

    listVoices() {
        try {
            const voices = window.speechSynthesis.getVoices() || [];
            console.log('Available voices:', voices);
            const el = document.getElementById('voiceListDisplay');
            if (!el) return;
            if (voices.length === 0) {
                el.textContent = 'No voices available yet. Try pressing "Thử Giọng" or reload the page.';
                return;
            }
            el.innerHTML = voices.map(v => `<div>${v.name} — ${v.lang} ${v.default ? '(default)' : ''}</div>`).join('');
        } catch (e) {
            console.error('Failed to list voices', e);
            this.showToast('Không thể lấy danh sách voices.', 'error');
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
    }

    displaySection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active from nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionName);
        if (section) {
            section.classList.add('active');
        }

        // Update nav item
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');

        this.state.currentSection = sectionName;

        // Initialize section-specific code
        if (sectionName === 'dashboard') {
            dashboard.init();
        } else if (sectionName === 'vocabulary') {
            vocabulary.init();
        } else if (sectionName === 'flashcard') {
            flashcard.init();
        } else if (sectionName === 'verb-forms') {
            verbForms.init();
        } else if (sectionName === 'typing-practice') {
            typingPractice.init();
        } else if (sectionName === 'quiz') {
            quiz.init();
        } else if (sectionName === 'settings') {
            settings.init();
        }
    }

    setupDarkMode() {
        if (this.state.isDarkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('themeToggle').textContent = '☀️';
        }
    }

    toggleDarkMode() {
        this.state.isDarkMode = !this.state.isDarkMode;
        document.body.classList.toggle('dark-mode');
        document.getElementById('themeToggle').textContent = this.state.isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', this.state.isDarkMode);
    }

    setupSpeechAPI() {
        // Initialize Text-to-Speech API
        window.speechRate = this.state.speechRate;

        // Populate voice selection dropdown if present
        const voiceSelect = document.getElementById('voiceSelect');
        const savedVoice = localStorage.getItem('voiceName');

        const populateVoices = () => {
            const voices = window.speechSynthesis.getVoices() || [];
            if (!voiceSelect) return;
            // Clear existing
            voiceSelect.innerHTML = '';
            // Add default option
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = 'Mặc Định';
            voiceSelect.appendChild(defaultOpt);

            // Prefer Cambridge or en-GB (British) voices if available, then Google voices
            const cambridgeVoices = voices.filter(v => /cambridge/i.test(v.name));
            const enGbVoices = voices.filter(v => /en[-_]?gb|brit|uk/i.test(v.lang + ' ' + v.name));
            const googleVoices = voices.filter(v => /google/i.test(v.name));
            // Remove duplicates while preserving priority
            const seen = new Set();
            const ordered = [];
            [ ...cambridgeVoices, ...enGbVoices, ...googleVoices, ...voices ].forEach(v => {
                if (!seen.has(v.name)) {
                    seen.add(v.name);
                    ordered.push(v);
                }
            });

            ordered.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.name;
                opt.textContent = `${v.name} — ${v.lang}`;
                voiceSelect.appendChild(opt);
            });

            // Restore saved selection if available; otherwise select best available
            if (savedVoice) {
                voiceSelect.value = savedVoice;
            } else {
                const pick = ordered.find(v => (/cambridge/i.test(v.name))) ||
                             ordered.find(v => (/en[-_]?gb|brit|uk/i.test(v.lang + ' ' + v.name))) ||
                             ordered[0];
                if (pick) {
                    voiceSelect.value = pick.name;
                    localStorage.setItem('voiceName', pick.name);
                    this.showToast(`Đã chọn giọng: ${pick.name}`, 'info');
                }
            }

            voiceSelect.addEventListener('change', (e) => {
                localStorage.setItem('voiceName', e.target.value);
                this.showToast('Giọng nói đã được lưu.', 'info');
            });
        };

        // Populate now or wait for voiceschanged
        const voicesNow = window.speechSynthesis.getVoices();
        if (voicesNow && voicesNow.length > 0) {
            populateVoices();
        } else {
            window.speechSynthesis.onvoiceschanged = populateVoices;
            // fallback populate after short delay
            setTimeout(populateVoices, 600);
        }
    }

    speak(text) {
        if (!('speechSynthesis' in window)) {
            this.showToast('Trình duyệt không hỗ trợ Text-to-Speech.', 'error');
            return;
        }
        if (!text) return;

        const synth = window.speechSynthesis;
        
        // Cancel any ongoing speech
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = this.state.speechRate || 1;

        // Get first available English voice or any voice
        const voices = synth.getVoices();
        const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        
        if (englishVoice) {
            utterance.voice = englishVoice;
            console.log('Using voice:', englishVoice.name);
        }

        // Handle errors silently for canceled/interrupted
        utterance.onerror = (event) => {
            if (event.error !== 'canceled' && event.error !== 'interrupted') {
                console.error('TTS error:', event.error);
            }
        };

        synth.speak(utterance);
    }

    async handleJsonUpload(event) {
        console.log('=== Upload Handler Called ===');
        try {
            const file = event.target.files[0];
            if (!file) {
                console.error('NO FILE SELECTED');
                this.showToast('❌ Vui lòng chọn file!', 'error');
                return;
            }

            console.log('File name:', file.name);
            console.log('File type:', file.type);

            const text = await file.text();
            let vocabulary = [];

            // Handle CSV format
            if (file.name.endsWith('.csv') || file.type === 'text/csv') {
                console.log('Processing CSV file');
                vocabulary = this.parseCSV(text);
            }
            // Handle JSON format
            else if (file.name.endsWith('.json') || file.type === 'application/json') {
                console.log('Processing JSON file');
                const data = JSON.parse(text);
                
                if (data.type === 'words' && Array.isArray(data.words)) {
                    vocabulary = data.words;
                } else if (data.type === 'sentences' && Array.isArray(data.sentences)) {
                    vocabulary = data.sentences.map(s => ({
                        term: s.en,
                        pronunciation: s.pronunciation || '',
                        meaning: s.vi,
                        level: s.level || 'Beginner'
                    }));
                } else {
                    this.showToast('❌ Định dạng JSON sai!', 'error');
                    return;
                }
            } else {
                this.showToast('❌ Chỉ hỗ trợ file CSV hoặc JSON!', 'error');
                return;
            }

            if (vocabulary.length === 0) {
                this.showToast('❌ File không có dữ liệu!', 'error');
                return;
            }

            console.log('Vocabulary loaded:', vocabulary.length, 'items');
            
            // Save vocabulary
            this.state.vocabulary = vocabulary;
            window.app = this; // Ensure window.app is set
            storage.saveVocabulary(vocabulary);
            console.log('Vocabulary saved.');

            // Show success
            this.showToast('✅ Tải ' + vocabulary.length + ' từ thành công!', 'success');

            // Force refresh all modules immediately
            console.log('Forcing module refresh...');
            
            // Update state for all modules
            const appRef = this;
            
            // Clear and reinitialize each module
            if (window.flashcard) {
                window.flashcard.vocabulary = [...appRef.state.vocabulary];
                window.flashcard.currentIndex = 0;
                window.flashcard.displayCard?.();
            }
            
            if (window.vocabulary) {
                window.vocabulary.filteredList = appRef.state.vocabulary;
                window.vocabulary.renderList?.();
                window.vocabulary.updateCount?.();
            }
            
            if (window.typingPractice) {
                window.typingPractice.vocabulary = [...appRef.state.vocabulary];
                window.typingPractice.currentIndex = 0;
                window.typingPractice.displayQuestion?.();
            }
            
            if (window.quiz) {
                window.quiz.generateQuestions?.();
                window.quiz.currentIndex = 0;
                window.quiz.displayQuestion?.();
            }
            
            if (window.dashboard) {
                window.dashboard.updateStats?.();
            }
            
            console.log('✅ All modules refreshed!');

        } catch (error) {
            console.error('❌ Upload FAILED:', error);
            this.showToast('❌ Lỗi: ' + error.message, 'error');
        } finally {
            console.log('Resetting file input');
            event.target.value = '';
        }
    }

    parseCSV(text) {
        const lines = text.trim().split('\n');
        if (lines.length < 2) return [];

        // Get header row
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        console.log('CSV Headers:', headers);

        // Find column indices
        const englishIdx = headers.findIndex(h => h.includes('english'));
        const pronunciationIdx = headers.findIndex(h => h.includes('phiên'));
        const meaningIdx = headers.findIndex(h => h.includes('nghĩa'));
        const levelIdx = headers.findIndex(h => h.includes('trình'));

        if (englishIdx === -1 || meaningIdx === -1) {
            throw new Error('CSV phải có cột "English" và "Nghĩa"');
        }

        // Parse data rows
        const vocabulary = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Handle CSV with quoted fields
            const parts = this.parseCSVLine(line);
            
            const word = {
                term: parts[englishIdx]?.trim() || '',
                pronunciation: pronunciationIdx !== -1 ? (parts[pronunciationIdx]?.trim() || '') : '',
                meaning: parts[meaningIdx]?.trim() || '',
                level: levelIdx !== -1 ? (parts[levelIdx]?.trim() || 'Beginner') : 'Beginner'
            };

            if (word.term && word.meaning) {
                vocabulary.push(word);
            }
        }

        console.log('Parsed', vocabulary.length, 'words from CSV');
        return vocabulary;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    loadVocabulary() {
        this.state.vocabulary = storage.getVocabulary();
        // No default vocabulary - app only works when user uploads a file
    }

    handleGlobalSearch(query) {
        if (!query.trim()) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(this.state.currentSection).classList.add('active');
            return;
        }

        const results = this.state.vocabulary.filter(word => 
            word.term.toLowerCase().includes(query.toLowerCase()) ||
            word.meaning.toLowerCase().includes(query.toLowerCase())
        );

        // Display in vocabulary section
        this.displaySection('vocabulary');
        vocabulary.displaySearchResults(results);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    getFormattedDate(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

// Initialize app
const app = new EnglishLearningApp();
