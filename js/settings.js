// ===== Settings Module =====
// Handles all settings-related functionality

const settings = {
    init() {
        this.setupSpeechRateSlider();
        this.setupVoiceSelect();
        this.setupResetDataButton();
        this.loadSettings();
    },

    loadSettings() {
        // Load speech rate
        const speechRate = localStorage.getItem('speechRate') || 1;
        const speechRateSlider = document.getElementById('speechRate');
        const speechRateValue = document.getElementById('speechRateValue');
        if (speechRateSlider) {
            speechRateSlider.value = speechRate;
            if (speechRateValue) {
                speechRateValue.textContent = parseFloat(speechRate).toFixed(1) + 'x';
            }
        }
    },

    setupSpeechRateSlider() {
        const speechRateSlider = document.getElementById('speechRate');
        const speechRateValue = document.getElementById('speechRateValue');

        if (speechRateSlider) {
            speechRateSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                if (speechRateValue) {
                    speechRateValue.textContent = value.toFixed(1) + 'x';
                }
                localStorage.setItem('speechRate', value);
                window.speechRate = value;
                
                // Show feedback
                if (window.app) {
                    window.app.showToast(`Tốc độ nói: ${value.toFixed(1)}x`, 'info');
                }
            });
        }
    },

    setupVoiceSelect() {
        // Voice select is handled in app.js setupSpeechAPI
    },

    setupResetDataButton() {
        const resetDataBtn = document.getElementById('resetData');
        const sidebarDeleteBtn = document.getElementById('sidebarDeleteData');
        const modal = document.getElementById('deleteConfirmModal');
        const cancelBtn = document.getElementById('deleteCancelBtn');
        const confirmBtn = document.getElementById('deleteConfirmBtn');
        const modalClose = document.getElementById('deleteModalClose');

        // Function to show modal
        const showDeleteModal = () => {
            if (modal) {
                modal.classList.add('active');
            }
        };

        // Function to hide modal
        const hideDeleteModal = () => {
            if (modal) {
                modal.classList.remove('active');
            }
        };

        // Setup reset data button in settings
        if (resetDataBtn) {
            resetDataBtn.addEventListener('click', showDeleteModal);
        }

        // Setup sidebar delete button
        if (sidebarDeleteBtn) {
            sidebarDeleteBtn.addEventListener('click', showDeleteModal);
        }

        // Modal cancel button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideDeleteModal);
        }

        // Modal close button
        if (modalClose) {
            modalClose.addEventListener('click', hideDeleteModal);
        }

        // Modal confirm button - actually delete data
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                hideDeleteModal();
                this.resetAllData();
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideDeleteModal();
                }
            });
        }
    },

    resetAllData() {
        try {
            // Clear all localStorage data
            localStorage.removeItem('vocabulary');
            localStorage.removeItem('learningHistory');
            localStorage.removeItem('mistakes');
            localStorage.removeItem('streak');
            localStorage.removeItem('lastLearningDate');
            localStorage.removeItem('darkMode');
            localStorage.removeItem('speechRate');
            localStorage.removeItem('voiceName');
            localStorage.removeItem('notifications');
            localStorage.removeItem('backgroundMusic');

            // Update UI elements immediately
            if (window.app) {
                // Reset vocabulary in app state
                window.app.state.vocabulary = [];
                
                // Update dashboard stats
                document.getElementById('streakValue').textContent = '0';
                document.getElementById('totalWordsValue').textContent = '0';
                document.getElementById('mistakesValue').textContent = '0';
                document.getElementById('todayWordsValue').textContent = '0';
                
                // Update Typing Practice stats if visible
                const typingScore = document.getElementById('typingScore');
                const typingTotal = document.getElementById('typingTotal');
                const typingStreak = document.getElementById('typingStreak');
                if (typingScore) typingScore.textContent = '⭐ 0';
                if (typingTotal) typingTotal.textContent = '📝 0';
                if (typingStreak) typingStreak.textContent = '🔥 0';
                
                // Update progress bar
                const progressBar = document.getElementById('typingProgressBar');
                if (progressBar) progressBar.style.width = '0%';
                
                // Refresh all modules
                window.app.refreshAllModules();
                
                window.app.showToast('Đã xóa tất cả dữ liệu', 'success');
            }
        } catch (error) {
            console.error('Error resetting data:', error);
            if (window.app) {
                window.app.showToast('Lỗi khi xóa dữ liệu: ' + error.message, 'error');
            }
        }
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    settings.init();
});

// Also try to init immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    settings.init();
}

