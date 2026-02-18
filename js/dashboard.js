// ===== Dashboard =====
const dashboard = {
  // Add state for calendar navigation
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),

  init() {
    this.updateStats();
    this.renderCalendar();
    this.displayTodayWords();
  },

  updateStats() {
    const vocab = window.app.state.vocabulary;
    const streak = storage.getStreak();
    const mistakes = storage.getMistakes();
    const todayWords = storage.getTodayLearning();

    document.getElementById("streakValue").textContent = streak.current;
    document.getElementById("totalWordsValue").textContent = vocab.length;
    document.getElementById("mistakesValue").textContent = mistakes.length;
    document.getElementById("todayWordsValue").textContent = todayWords.length;
  },

  // Navigate to previous month
  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar();
  },

  // Navigate to next month
  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar();
  },

  // Navigate to specific month/year
  goToMonth(year, month) {
    this.currentYear = year;
    this.currentMonth = month;
    this.renderCalendar();
  },

  // Go to current month
  goToCurrentMonth() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.renderCalendar();
  },

  renderCalendar() {
    const today = new Date();
    const year = this.currentYear;
    const month = this.currentMonth;

    const calendarEl = document.getElementById("learningCalendar");
    calendarEl.innerHTML = "";

    // Month header with navigation
    const monthHeader = document.createElement("div");
    monthHeader.className = "calendar-month-header";
    monthHeader.innerHTML = `
            <button class="calendar-nav-btn" id="prevMonthBtn" title="Tháng trước">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span class="calendar-month-title">${this.getMonthName(month)} ${year}</span>
            <button class="calendar-nav-btn" id="nextMonthBtn" title="Tháng sau">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button class="calendar-nav-btn calendar-today-btn" id="todayBtn" title="Hôm nay">
                <i class="fa-solid fa-calendar-day"></i>
            </button>
        `;
    calendarEl.appendChild(monthHeader);

    // Add event listeners for navigation buttons
    setTimeout(() => {
      const prevBtn = document.getElementById("prevMonthBtn");
      const nextBtn = document.getElementById("nextMonthBtn");
      const todayBtn = document.getElementById("todayBtn");

      if (prevBtn) prevBtn.addEventListener("click", () => this.prevMonth());
      if (nextBtn) nextBtn.addEventListener("click", () => this.nextMonth());
      if (todayBtn)
        todayBtn.addEventListener("click", () => this.goToCurrentMonth());
    }, 0);

    // Day of week headers (CN, T2, T3, T4, T5, T6, T7)
    const dayHeaders = document.createElement("div");
    dayHeaders.className = "calendar-day-headers";
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    dayNames.forEach((day, index) => {
      const headerCell = document.createElement("div");
      headerCell.className = "calendar-day-header" + (index === 0 ? " sunday" : "");
      headerCell.textContent = day;
      dayHeaders.appendChild(headerCell);
    });
    calendarEl.appendChild(dayHeaders);

    // Day grid
    const dayGrid = document.createElement("div");
    dayGrid.className = "calendar-grid";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-cell empty";
      dayGrid.appendChild(emptyCell);
    }

    // Days of month
    const history = storage.getLearningHistory();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = window.app.getFormattedDate(date);
      const cell = document.createElement("div");
      cell.className = "calendar-cell";
      cell.textContent = day;

      if (history[dateStr]) {
        cell.classList.add("learned");
      } else {
        cell.classList.add("not-learned");
      }

      if (dateStr === window.app.getFormattedDate(today)) {
        cell.classList.add("today");
      }

      dayGrid.appendChild(cell);
    }

    calendarEl.appendChild(dayGrid);

    // Legend
    const legend = document.createElement("div");
    legend.className = "calendar-legend";
    legend.innerHTML = `
            <div class="legend-item">
                <div class="legend-color learned"></div>
                <span>Đã Học</span>
            </div>
            <div class="legend-item">
                <div class="legend-color not-learned"></div>
                <span>Chưa Học</span>
            </div>
        `;
    calendarEl.appendChild(legend);
  },

  displayTodayWords() {
    const todayWords = storage.getTodayLearning();
    const container = document.getElementById("todayWordsList");

    if (todayWords.length === 0) {
      container.innerHTML =
        '<p class="empty-message">Bạn chưa học từ nào hôm nay. Hãy bắt đầu học!</p>';
      return;
    }

    container.innerHTML = todayWords
      .map(
        (word, index) => `
            <div class="word-item" style="animation-delay: ${index * 0.1}s">
                <div class="word-term">${word.term}</div>
                <div class="word-meaning">${word.meaning}</div>
                <button class="btn btn-secondary btn-small" onclick="app.speak('${word.term}')">🔊 Nghe</button>
            </div>
        `,
      )
      .join("");
  },

  getMonthName(month) {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return months[month];
  },
};

// Add dashboard styles
const dashboardStyles = `
<style>
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 32px;
    }

    .stat-card {
        background: white;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 20px;
        text-align: center;
        box-shadow: var(--shadow-sm);
        transition: all var(--transition);
        cursor: pointer;
    }

    body.dark-mode .stat-card {
        background: var(--bg-secondary);
    }

    body.dark-mode .stat-value {
        color: #ffffff !important;
    }

    .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
    }

    .stat-label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--secondary);
        margin-bottom: 8px;
        font-weight: 600;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--primary) !important;
        margin-bottom: 8px;
    }

    .stat-sub {
        font-size: 12px;
        color: var(--secondary);
    }

    .calendar-section {
        background: white;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 20px;
        margin-bottom: 24px;
        box-shadow: var(--shadow-sm);
    }

    body.dark-mode .calendar-section {
        background: var(--bg-secondary);
    }

    .calendar {
        margin-bottom: 20px;
    }

    .calendar-month-header {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        color: var(--dark);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    body.dark-mode .calendar-month-header {
        color: var(--light);
    }

    .calendar-month-title {
        text-align: center;
        font-size: 19px;
    }

    .calendar-nav-btn {
        background: var(--bg-primary);
        border: 1px solid var(--border);
        border-radius: 4px;
        padding: 4px 10px;
        cursor: pointer;
        color: var(--text);
        font-size: 14px;
        transition: all var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .calendar-nav-btn:hover {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    .calendar-today-btn {
        margin-left: 8px;
    }

    .calendar-day-headers {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        margin-bottom: 4px;
    }

    .calendar-day-header {
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        color: var(--secondary);
        padding: 6px 0;
    }

    .calendar-day-header.sunday {
        color: var(--danger);
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        margin-bottom: 8px;
    }

    .calendar-cell {
        aspect-ratio: 1.2;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-weight: 600;
        font-size: 17px;
        cursor: pointer;
        transition: all var(--transition);
        border: 1px solid var(--border);
        padding: 4px;
    }

    .calendar-cell.learned {
        background: rgba(16, 185, 129, 0.2);
        border-color: var(--success);
        color: var(--success);
    }

    .calendar-cell.not-learned {
        background: rgba(148, 163, 184, 0.1);
        border-color: var(--border);
        color: var(--secondary);
    }

    .calendar-cell.today {
        border: 2px solid var(--primary);
        font-weight: 700;
    }

    .calendar-cell.empty {
        background: transparent;
        border: none;
    }

    .calendar-legend {
        display: flex;
        gap: 16px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--border);
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }

    .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid var(--border);
    }

    .legend-color.learned {
        background: rgba(16, 185, 129, 0.2);
        border-color: var(--success);
    }

    .legend-color.not-learned {
        background: rgba(148, 163, 184, 0.1);
        border-color: var(--border);
    }

    .today-words {
        background: white;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 24px;
        box-shadow: var(--shadow-sm);
    }

    body.dark-mode .today-words {
        background: var(--bg-secondary);
    }

    .words-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
    }

    .word-item {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
        border-left: 4px solid var(--primary);
        padding: 16px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
    }

    .word-term {
        font-weight: 700;
        font-size: 16px;
        color: var(--primary);
        margin-bottom: 8px;
    }

    .word-meaning {
        color: var(--text);
        font-size: 14px;
        margin-bottom: 12px;
    }

    .empty-message {
        text-align: center;
        color: var(--secondary);
        padding: 40px 20px;
        font-size: 16px;
    }
</style>
`;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    document.head.insertAdjacentHTML("beforeend", dashboardStyles);
  });
} else {
  document.head.insertAdjacentHTML("beforeend", dashboardStyles);
}

// Expose dashboard globally for app interactions
window.dashboard = dashboard;
