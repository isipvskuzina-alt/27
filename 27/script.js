// ========================================
// 1. ДАННЫЕ
// ========================================

let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

let history = [];

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const resultDisplay = document.getElementById('resultDisplay');
const historyDisplay = document.getElementById('historyDisplay');
const historyContainer = document.getElementById('historyContainer');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadHistory() {
    try {
        const saved = localStorage.getItem('calculatorHistory');
        if (saved) {
            history = JSON.parse(saved);
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки истории:', e);
    }
    return false;
}

function saveHistory() {
    try {
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
    } catch (e) {
        console.error('Ошибка сохранения истории:', e);
    }
}

// ========================================
// 4. РЕНДЕРИНГ ИСТОРИИ
// ========================================

function renderHistory() {
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="history-empty">📭 История пуста</div>
        `;
        return;
    }

    historyContainer.innerHTML = history.map(item => `
        <div class="history-item">
            <span class="expression">${escapeHtml(item.expression)}</span>
            <span class="result">= ${escapeHtml(item.result)}</span>
        </div>
    `).join('');
}

// ========================================
// 5. ФУНКЦИИ КАЛЬКУЛЯТОРА
// ========================================

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += num;
    updateDisplay();
}

function appendDot() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '(' && op !== ')') return;
    
    if (operation && !shouldResetDisplay) {
        calculate();
    }
    
    const operatorMap = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };
    
    const displayOp = operatorMap[op] || op;
    
    if (op === '(' || op === ')') {
        currentInput += op;
        updateDisplay();
        return;
    }
    
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
    historyDisplay.textContent = `${previousInput} ${displayOp} `;
}

function calculate() {
    if (!operation || previousInput === '') return;
    
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    
    if (isNaN(num1) || isNaN(num2)) {
        clearAll();
        return;
    }
    
    let result;
    const operatorMap = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };
    
    const displayOp = operatorMap[operation] || operation;
    const expression = `${previousInput} ${displayOp} ${currentInput}`;
    
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert('Деление на ноль!');
                clearAll();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    
    // Округляем результат
    if (Number.isInteger(result)) {
        result = result.toString();
    } else {
        result = parseFloat(result.toFixed(8)).toString();
    }
    
    // Добавляем в историю
    addToHistory(expression, result);
    
    currentInput = result;
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    historyDisplay.textContent = '';
    updateDisplay();
}

function addToHistory(expression, result) {
    history.push({
        expression: expression,
        result: result,
        timestamp: new Date().toISOString()
    });
    saveHistory();
    renderHistory();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    historyDisplay.textContent = '';
    updateDisplay();
}

function clearHistory() {
    if (history.length === 0) return;
    if (!confirm('Очистить историю?')) return;
    history = [];
    saveHistory();
    renderHistory();
}

function updateDisplay() {
    resultDisplay.textContent = currentInput || '0';
}

// ========================================
// 6. КЛАВИАТУРА
// ========================================

function handleKeyboard(e) {
    const key = e.key;
    
    // Цифры
    if (key >= '0' && key <= '9') {
        e.preventDefault();
        appendNumber(key);
        return;
    }
    
    // Операторы
    if (['+', '-', '*', '/'].includes(key)) {
        e.preventDefault();
        appendOperator(key);
        return;
    }
    
    // Точка
    if (key === '.') {
        e.preventDefault();
        appendDot();
        return;
    }
    
    // Enter или = для вычисления
    if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
        return;
    }
    
    // Escape для очистки
    if (key === 'Escape') {
        e.preventDefault();
        clearAll();
        return;
    }
    
    // Backspace для удаления последнего символа
    if (key === 'Backspace') {
        e.preventDefault();
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
        return;
    }
}

// ========================================
// 7. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// 8. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log('🧮 Калькулятор');
    
    // Загружаем историю
    loadHistory();
    renderHistory();
    
    console.log(`📊 Загружено записей: ${history.length}`);
    
    // Обновляем дисплей
    updateDisplay();
    
    // Обработчик клавиатуры
    document.addEventListener('keydown', handleKeyboard);

    console.log('✅ Калькулятор готов!');
}

// ========================================
// 9. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);