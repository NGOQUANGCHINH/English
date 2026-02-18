// ===== Verb Forms Module =====
const verbForms = {
    verbs: [
        { v1: 'be', v2: 'was/were', v3: 'been', meaning: 'là/ở' },
        { v1: 'beat', v2: 'beat', v3: 'beaten', meaning: 'đánh' },
        { v1: 'become', v2: 'became', v3: 'become', meaning: 'trở thành' },
        { v1: 'begin', v2: 'began', v3: 'begun', meaning: 'bắt đầu' },
        { v1: 'bend', v2: 'bent', v3: 'bent', meaning: 'uốn cong' },
        { v1: 'bet', v2: 'bet', v3: 'bet', meaning: 'cược' },
        { v1: 'bind', v2: 'bound', v3: 'bound', meaning: 'buộc' },
        { v1: 'bite', v2: 'bit', v3: 'bitten', meaning: 'cắn' },
        { v1: 'bleed', v2: 'bled', v3: 'bled', meaning: 'chảy máu' },
        { v1: 'blow', v2: 'blew', v3: 'blown', meaning: 'thổi' },
        { v1: 'break', v2: 'broke', v3: 'broken', meaning: 'phá vỡ' },
        { v1: 'breed', v2: 'bred', v3: 'bred', meaning: 'chăn nuôi' },
        { v1: 'bring', v2: 'brought', v3: 'brought', meaning: 'mang đến' },
        { v1: 'build', v2: 'built', v3: 'built', meaning: 'xây dựng' },
        { v1: 'burn', v2: 'burned/burnt', v3: 'burned/burnt', meaning: 'đốt' },
        { v1: 'buy', v2: 'bought', v3: 'bought', meaning: 'mua' },
        { v1: 'catch', v2: 'caught', v3: 'caught', meaning: 'bắt' },
        { v1: 'choose', v2: 'chose', v3: 'chosen', meaning: 'chọn' },
        { v1: 'come', v2: 'came', v3: 'come', meaning: 'đến' },
        { v1: 'cost', v2: 'cost', v3: 'cost', meaning: 'có giá' },
        { v1: 'cut', v2: 'cut', v3: 'cut', meaning: 'cắt' },
        { v1: 'deal', v2: 'dealt', v3: 'dealt', meaning: 'giao dịch' },
        { v1: 'dig', v2: 'dug', v3: 'dug', meaning: 'đào' },
        { v1: 'do', v2: 'did', v3: 'done', meaning: 'làm' },
        { v1: 'draw', v2: 'drew', v3: 'drawn', meaning: 'vẽ' },
        { v1: 'dream', v2: 'dreamed/dreamt', v3: 'dreamed/dreamt', meaning: 'mơ' },
        { v1: 'drink', v2: 'drank', v3: 'drunk', meaning: 'uống' },
        { v1: 'drive', v2: 'drove', v3: 'driven', meaning: 'lái xe' },
        { v1: 'eat', v2: 'ate', v3: 'eaten', meaning: 'ăn' },
        { v1: 'fall', v2: 'fell', v3: 'fallen', meaning: 'rơi' },
        { v1: 'feel', v2: 'felt', v3: 'felt', meaning: 'cảm thấy' },
        { v1: 'fight', v2: 'fought', v3: 'fought', meaning: 'chiến đấu' },
        { v1: 'find', v2: 'found', v3: 'found', meaning: 'tìm thấy' },
        { v1: 'fly', v2: 'flew', v3: 'flown', meaning: 'bay' },
        { v1: 'forbid', v2: 'forbade', v3: 'forbidden', meaning: 'cấm' },
        { v1: 'forget', v2: 'forgot', v3: 'forgotten', meaning: 'quên' },
        { v1: 'forgive', v2: 'forgave', v3: 'forgiven', meaning: 'tha thứ' },
        { v1: 'freeze', v2: 'froze', v3: 'frozen', meaning: 'đông lạnh' },
        { v1: 'get', v2: 'got', v3: 'gotten/got', meaning: 'nhận được' },
        { v1: 'give', v2: 'gave', v3: 'given', meaning: 'cho' },
        { v1: 'go', v2: 'went', v3: 'gone', meaning: 'đi' },
        { v1: 'grow', v2: 'grew', v3: 'grown', meaning: 'phát triển' },
        { v1: 'hang', v2: 'hung/hanged', v3: 'hung/hanged', meaning: 'treo' },
        { v1: 'have', v2: 'had', v3: 'had', meaning: 'có' },
        { v1: 'hear', v2: 'heard', v3: 'heard', meaning: 'nghe' },
        { v1: 'hide', v2: 'hid', v3: 'hidden', meaning: 'ẩn' },
        { v1: 'hit', v2: 'hit', v3: 'hit', meaning: 'đánh' },
        { v1: 'hold', v2: 'held', v3: 'held', meaning: 'cầm' },
        { v1: 'hurt', v2: 'hurt', v3: 'hurt', meaning: 'làm đau' },
        { v1: 'keep', v2: 'kept', v3: 'kept', meaning: 'giữ' },
        { v1: 'kneel', v2: 'knelt/kneeled', v3: 'knelt/kneeled', meaning: 'quỳ' },
        { v1: 'know', v2: 'knew', v3: 'known', meaning: 'biết' },
        { v1: 'lay', v2: 'laid', v3: 'laid', meaning: 'đặt' },
        { v1: 'lead', v2: 'led', v3: 'led', meaning: 'dẫn đầu' },
        { v1: 'learn', v2: 'learned/learnt', v3: 'learned/learnt', meaning: 'học' },
        { v1: 'leave', v2: 'left', v3: 'left', meaning: 'rời đi' },
        { v1: 'lend', v2: 'lent', v3: 'lent', meaning: 'cho vay' },
        { v1: 'let', v2: 'let', v3: 'let', meaning: 'cho phép' },
        { v1: 'lie', v2: 'lay', v3: 'lain', meaning: 'nằm' },
        { v1: 'light', v2: 'lit/lighted', v3: 'lit/lighted', meaning: 'thắp sáng' },
        { v1: 'lose', v2: 'lost', v3: 'lost', meaning: 'mất' },
        { v1: 'make', v2: 'made', v3: 'made', meaning: 'làm' },
        { v1: 'mean', v2: 'meant', v3: 'meant', meaning: 'có ý' },
        { v1: 'meet', v2: 'met', v3: 'met', meaning: 'gặp' },
        { v1: 'pay', v2: 'paid', v3: 'paid', meaning: 'trả tiền' },
        { v1: 'put', v2: 'put', v3: 'put', meaning: 'đặt' },
        { v1: 'read', v2: 'read', v3: 'read', meaning: 'đọc' },
        { v1: 'ride', v2: 'rode', v3: 'ridden', meaning: 'cưỡi' },
        { v1: 'ring', v2: 'rang', v3: 'rung', meaning: 'rung' },
        { v1: 'rise', v2: 'rose', v3: 'risen', meaning: 'dâng lên' },
        { v1: 'run', v2: 'ran', v3: 'run', meaning: 'chạy' },
        { v1: 'say', v2: 'said', v3: 'said', meaning: 'nói' },
        { v1: 'see', v2: 'saw', v3: 'seen', meaning: 'thấy' },
        { v1: 'seek', v2: 'sought', v3: 'sought', meaning: 'tìm kiếm' },
        { v1: 'sell', v2: 'sold', v3: 'sold', meaning: 'bán' },
        { v1: 'send', v2: 'sent', v3: 'sent', meaning: 'gửi' },
        { v1: 'set', v2: 'set', v3: 'set', meaning: 'đặt' },
        { v1: 'shake', v2: 'shook', v3: 'shaken', meaning: 'lắc' },
        { v1: 'shine', v2: 'shone/shined', v3: 'shone/shined', meaning: 'chiếu sáng' },
        { v1: 'shoot', v2: 'shot', v3: 'shot', meaning: 'bắn' },
        { v1: 'show', v2: 'showed', v3: 'shown/showed', meaning: 'chỉ ra' },
        { v1: 'shut', v2: 'shut', v3: 'shut', meaning: 'đóng' },
        { v1: 'sing', v2: 'sang', v3: 'sung', meaning: 'hát' },
        { v1: 'sink', v2: 'sank/sunk', v3: 'sunk', meaning: 'chìm' },
        { v1: 'sit', v2: 'sat', v3: 'sat', meaning: 'ngồi' },
        { v1: 'sleep', v2: 'slept', v3: 'slept', meaning: 'ngủ' },
        { v1: 'slide', v2: 'slid', v3: 'slid', meaning: 'trượt' },
        { v1: 'speak', v2: 'spoke', v3: 'spoken', meaning: 'nói chuyện' },
        { v1: 'spend', v2: 'spent', v3: 'spent', meaning: 'tiêu xài' },
        { v1: 'spin', v2: 'spun', v3: 'spun', meaning: 'quay' },
        { v1: 'split', v2: 'split', v3: 'split', meaning: 'chia cắt' },
        { v1: 'spread', v2: 'spread', v3: 'spread', meaning: 'trải rộng' },
        { v1: 'stand', v2: 'stood', v3: 'stood', meaning: 'đứng' },
        { v1: 'steal', v2: 'stole', v3: 'stolen', meaning: 'ăn cắp' },
        { v1: 'stick', v2: 'stuck', v3: 'stuck', meaning: 'dán' },
        { v1: 'sting', v2: 'stung', v3: 'stung', meaning: 'đốt' },
        { v1: 'stink', v2: 'stank/stunk', v3: 'stunk', meaning: 'hôi thối' },
        { v1: 'strike', v2: 'struck', v3: 'struck/stricken', meaning: 'đánh' },
        { v1: 'string', v2: 'strung', v3: 'strung', meaning: 'xâu chuỗi' },
        { v1: 'swim', v2: 'swam', v3: 'swum', meaning: 'bơi' },
        { v1: 'swing', v2: 'swung', v3: 'swung', meaning: 'swing' },
        { v1: 'take', v2: 'took', v3: 'taken', meaning: 'lấy' },
        { v1: 'teach', v2: 'taught', v3: 'taught', meaning: 'dạy' },
        { v1: 'tear', v2: 'tore', v3: 'torn', meaning: 'xé' },
        { v1: 'tell', v2: 'told', v3: 'told', meaning: 'kể' },
        { v1: 'think', v2: 'thought', v3: 'thought', meaning: 'nghĩ' },
        { v1: 'throw', v2: 'threw', v3: 'thrown', meaning: 'ném' },
        { v1: 'thrust', v2: 'thrust', v3: 'thrust', meaning: 'đẩy' },
        { v1: 'understand', v2: 'understood', v3: 'understood', meaning: 'hiểu' },
        { v1: 'wake', v2: 'woke/waked', v3: 'woken/waked', meaning: 'thức dậy' },
        { v1: 'walk', v2: 'walked', v3: 'walked', meaning: 'đi bộ' },
        { v1: 'wear', v2: 'wore', v3: 'worn', meaning: 'mặc' },
        { v1: 'weep', v2: 'wept', v3: 'wept', meaning: 'khóc' },
        { v1: 'win', v2: 'won', v3: 'won', meaning: 'thắng' },
        { v1: 'wind', v2: 'wound', v3: 'wound', meaning: 'cuốn' },
        { v1: 'write', v2: 'wrote', v3: 'written', meaning: 'viết' }
    ],

    init() {
        this.renderTable();
    },

    renderTable() {
        const tbody = document.getElementById('verbTableBody');
        const marked = storage.getMarkedVerbs();

        tbody.innerHTML = this.verbs.map((verb, index) => {
            const isMarked = marked.includes(index);
            return `
                <tr class="verb-row ${isMarked ? 'marked' : ''}">
                    <td class="verb-no">${index + 1}</td>
                    <td class="verb-v1">${verb.v1}</td>
                    <td class="verb-v2">${verb.v2}</td>
                    <td class="verb-v3">${verb.v3}</td>
                    <td class="verb-meaning">${verb.meaning}</td>
                    <td class="verb-action">
                        <button class="btn-mark ${isMarked ? 'marked' : ''}" 
                                onclick="verbForms.toggleMark(${index}, this)">
                            ${isMarked ? '✓ Đã Lưu' : '☐ Lưu'}
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    toggleMark(index, button) {
        storage.toggleMarkVerb(index);
        button.classList.toggle('marked');
        button.textContent = button.classList.contains('marked') ? '✓ Đã Lưu' : '☐ Lưu';

        const row = button.closest('tr');
        row.classList.toggle('marked');

        app.showToast(button.classList.contains('marked') ? 'Đã lưu động từ!' : 'Đã bỏ lưu!', 'info');
    }
};

// Add verb forms styles
const verbFormsStyles = `
<style>
    .verb-table-wrapper {
        overflow-x: auto;
        border-radius: var(--radius);
        box-shadow: var(--shadow-md);
    }

    .verb-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
    }

    body.dark-mode .verb-table {
        background: var(--bg-secondary);
    }

    .verb-table thead {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .verb-table th {
        padding: 16px 12px;
        text-align: left;
        font-weight: 700;
        color: var(--primary);
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1px;
        border-bottom: 2px solid var(--primary);
    }

    .verb-table td {
        padding: 14px 12px;
        border-bottom: 1px solid var(--border);
        color: var(--text);
    }

    .verb-row {
        transition: all var(--transition);
    }

    .verb-row:hover {
        background: rgba(59, 130, 246, 0.05);
    }

    .verb-row.marked {
        background: rgba(16, 185, 129, 0.1);
        border-left: 4px solid var(--success);
    }

    .verb-no {
        font-weight: 700;
        color: var(--primary);
        width: 60px;
    }

    .verb-v1 {
        font-weight: 700;
        color: var(--primary);
        min-width: 120px;
    }

    .verb-v2 {
        font-style: italic;
        min-width: 150px;
    }

    .verb-v3 {
        font-style: italic;
        min-width: 150px;
    }

    .verb-meaning {
        color: var(--secondary);
        font-size: 14px;
    }

    .verb-action {
        width: 100px;
        text-align: center;
    }

    .btn-mark {
        padding: 6px 10px;
        border: 1px solid var(--border);
        background: var(--light);
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all var(--transition);
        color: var(--text);
    }

    .btn-mark:hover {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    .btn-mark.marked {
        background: var(--success);
        color: white;
        border-color: var(--success);
    }

    @media (max-width: 768px) {
        .verb-table {
            font-size: 12px;
        }

        .verb-table th,
        .verb-table td {
            padding: 10px 8px;
        }

        .verb-v2,
        .verb-v3 {
            min-width: 100px;
        }
    }
</style>
`;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.head.insertAdjacentHTML('beforeend', verbFormsStyles);
    });
} else {
    document.head.insertAdjacentHTML('beforeend', verbFormsStyles);
}
