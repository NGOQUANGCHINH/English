// ===== Storage Management =====
const storage = {
    initDefaultData() {
        // Clear old sample data if no vocabulary uploaded yet
        const vocab = this.getVocabulary();
        if (vocab.length === 0) {
            // Clear all learning data
            localStorage.removeItem('learningHistory');
            localStorage.removeItem('streak');
            localStorage.removeItem('mistakes');
            localStorage.removeItem('quizAnswers');
        }
    },

    getVocabulary() {
        return JSON.parse(localStorage.getItem('vocabulary')) || [];
    },

    saveVocabulary(vocabulary) {
        localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
    },

    getLearningHistory() {
        return JSON.parse(localStorage.getItem('learningHistory')) || {};
    },

    saveLearningHistory(history) {
        localStorage.setItem('learningHistory', JSON.stringify(history));
    },

    getMistakes() {
        return JSON.parse(localStorage.getItem('mistakes')) || [];
    },

    addMistake(word) {
        const mistakes = this.getMistakes();
        if (!mistakes.find(m => m.term === word.term)) {
            mistakes.push({ ...word, date: new Date().toISOString() });
            localStorage.setItem('mistakes', JSON.stringify(mistakes));
        }
    },

    getStreak() {
        return JSON.parse(localStorage.getItem('streak')) || {
            current: 0,
            last_date: null,
            max: 0
        };
    },

    updateStreak() {
        const today = app.getFormattedDate();
        let streak = this.getStreak();
        const lastDate = streak.last_date;

        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = app.getFormattedDate(yesterday);

            if (lastDate === yesterdayStr) {
                streak.current += 1;
            } else if (lastDate !== today) {
                streak.current = 1;
            }

            streak.max = Math.max(streak.max, streak.current);
            streak.last_date = today;
            localStorage.setItem('streak', JSON.stringify(streak));
        }

        return streak;
    },

    addLearningHistory(word) {
        const today = app.getFormattedDate();
        let history = this.getLearningHistory();

        if (!history[today]) {
            history[today] = [];
        }

        if (!history[today].find(w => w.term === word.term)) {
            history[today].push({ ...word, timestamp: new Date().toISOString() });
            this.saveLearningHistory(history);
        }

        this.updateStreak();
    },

    getTodayLearning() {
        const today = app.getFormattedDate();
        const history = this.getLearningHistory();
        return history[today] || [];
    },

    getVerbForms() {
        return JSON.parse(localStorage.getItem('verbForms')) || [];
    },

    saveVerbForms(forms) {
        localStorage.setItem('verbForms', JSON.stringify(forms));
    },

    getMarkedVerbs() {
        return JSON.parse(localStorage.getItem('markedVerbs')) || [];
    },

    toggleMarkVerb(verbId) {
        let marked = this.getMarkedVerbs();
        const index = marked.indexOf(verbId);

        if (index > -1) {
            marked.splice(index, 1);
        } else {
            marked.push(verbId);
        }

        localStorage.setItem('markedVerbs', JSON.stringify(marked));
        return marked;
    },

    getQuizAnswers() {
        return JSON.parse(localStorage.getItem('quizAnswers')) || {};
    },

    saveQuizAnswer(questionId, answer) {
        let answers = this.getQuizAnswers();
        answers[questionId] = answer;
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
    }
};
