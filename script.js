document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const footerLinks = document.querySelectorAll('.footer-section a[data-target]');
    
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        menuToggle.innerHTML = mainNav.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    function switchSection(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
        
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
        
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchSection(targetId);
        });
    });
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchSection(targetId);
        });
    });
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchSection(targetId);
        });
    });
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
                this.title = 'Switch to light mode';
            } else {
                icon.className = 'fas fa-moon';
                this.title = 'Switch to dark mode';
            }
        });
    }
    
    const progressTracker = document.getElementById('progressTracker');
    const progressFill = progressTracker.querySelector('.progress-fill');
    const progressText = progressTracker.querySelector('.progress-text span');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = scrollPercent + '%';
        progressText.textContent = Math.round(scrollPercent) + '%';
        
        if (scrollPercent > 5) {
            progressTracker.style.display = 'block';
        } else {
            progressTracker.style.display = 'none';
        }
    });
    
    const runCodeButton = document.getElementById('runCode');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const codeEditors = document.querySelectorAll('.code-editor');
    const previewFrame = document.getElementById('previewFrame');
    
    if (runCodeButton) {
        runCodeButton.addEventListener('click', function() {
            const htmlCode = document.getElementById('htmlCode').value;
            const cssCode = document.getElementById('cssCode').value;
            const jsCode = document.getElementById('jsCode').value;
            
            const fullHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>${cssCode}</style>
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            ${jsCode}
                        });
                    <\/script>
                </head>
                ${htmlCode.replace('<script src="script.js"></script>', '')}
                </html>
            `;
            
            const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(fullHTML);
            iframeDoc.close();
        });
        
        runCodeButton.click();
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            codeEditors.forEach(editor => {
                editor.classList.remove('active');
                if (editor.id === `${tab}-editor`) {
                    editor.classList.add('active');
                }
            });
        });
    });
    
    const exampleButtons = document.querySelectorAll('.example');
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exampleName = this.getAttribute('data-name');
            switch(exampleName) {
                case 'Calculator':
                    document.getElementById('htmlCode').value = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Kalkulator Sederhana</h1>
        <div class="calculator">
            <div class="display" id="display">0</div>
            <div class="buttons">
                <button class="btn clear" onclick="clearDisplay()">C</button>
                <button class="btn operator" onclick="appendToDisplay('/')">/</button>
                <button class="btn operator" onclick="appendToDisplay('*')">×</button>
                <button class="btn operator" onclick="appendToDisplay('-')">-</button>
                
                <button class="btn" onclick="appendToDisplay('7')">7</button>
                <button class="btn" onclick="appendToDisplay('8')">8</button>
                <button class="btn" onclick="appendToDisplay('9')">9</button>
                <button class="btn operator" onclick="appendToDisplay('+')">+</button>
                
                <button class="btn" onclick="appendToDisplay('4')">4</button>
                <button class="btn" onclick="appendToDisplay('5')">5</button>
                <button class="btn" onclick="appendToDisplay('6')">6</button>
                <button class="btn equals" onclick="calculate()" rowspan="2">=</button>
                
                <button class="btn" onclick="appendToDisplay('1')">1</button>
                <button class="btn" onclick="appendToDisplay('2')">2</button>
                <button class="btn" onclick="appendToDisplay('3')">3</button>
                
                <button class="btn zero" onclick="appendToDisplay('0')">0</button>
                <button class="btn" onclick="appendToDisplay('.')">.</button>
                <button class="btn" onclick="backspace()">⌫</button>
            </div>
        </div>
        <div id="history"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
                    
                    document.getElementById('cssCode').value = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
}

.calculator {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.display {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    font-size: 2rem;
    text-align: right;
    margin-bottom: 20px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    color: #333;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.btn {
    padding: 15px;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: bold;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:active {
    transform: translateY(0);
}

.btn.clear {
    background: #ff6b6b;
    color: white;
}

.btn.operator {
    background: #4ecdc4;
    color: white;
}

.btn.equals {
    background: #1dd1a1;
    color: white;
    grid-row: span 2;
}

.btn.zero {
    grid-column: span 2;
}

.btn:not(.clear):not(.operator):not(.equals) {
    background: white;
    color: #333;
    border: 1px solid #e0e0e0;
}

#history {
    margin-top: 20px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    min-height: 50px;
    text-align: left;
}

.history-item {
    padding: 5px 0;
    border-bottom: 1px solid #e0e0e0;
    font-family: 'Courier New', monospace;
    color: #666;
}`;
                    
                    document.getElementById('jsCode').value = `let displayValue = '0';
let previousValue = '';
let operator = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const history = document.getElementById('history');

function updateDisplay() {
    display.textContent = displayValue;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        displayValue = '';
        shouldResetDisplay = false;
    }
    
    if (value === '.' && displayValue.includes('.')) {
        return;
    }
    
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    
    updateDisplay();
}

function setOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = displayValue;
    operator = op;
    shouldResetDisplay = true;
    
    addHistory(\`\${previousValue} \${op}\`);
}

function calculate() {
    if (!operator || shouldResetDisplay) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(displayValue);
    let result = 0;
    
    switch(operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Tidak bisa membagi dengan 0!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
    }
    
    displayValue = result.toString();
    updateDisplay();
    
    addHistory(\`\${prev} \${operator} \${current} = \${result}\`);
    
    operator = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    displayValue = '0';
    previousValue = '';
    operator = '';
    updateDisplay();
    history.innerHTML = '';
}

function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function addHistory(text) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = text;
    history.prepend(historyItem);
    
    if (history.children.length > 5) {
        history.removeChild(history.lastChild);
    }
}

updateDisplay();

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
});`;
                    
                    document.querySelector('[data-tab="html"]').click();
                    break;
                    
                case 'TodoList':
                    document.getElementById('htmlCode').value = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <h1><i class="fas fa-tasks"></i> Todo List</h1>
        <p class="subtitle">Kelola tugas Anda dengan mudah</p>
        
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Tambahkan tugas baru...">
            <button onclick="addTodo()" class="add-btn">
                <i class="fas fa-plus"></i> Tambah
            </button>
        </div>
        
        <div class="stats">
            <div class="stat-item">
                <span class="stat-number" id="totalTodos">0</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="completedTodos">0</span>
                <span class="stat-label">Selesai</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="pendingTodos">0</span>
                <span class="stat-label">Pending</span>
            </div>
        </div>
        
        <div class="filters">
            <button class="filter-btn active" onclick="filterTodos('all')">Semua</button>
            <button class="filter-btn" onclick="filterTodos('active')">Aktif</button>
            <button class="filter-btn" onclick="filterTodos('completed')">Selesai</button>
        </div>
        
        <div class="todo-list" id="todoList">
        </div>
        
        <div class="actions">
            <button onclick="clearCompleted()" class="action-btn">
                <i class="fas fa-trash"></i> Hapus Selesai
            </button>
            <button onclick="clearAll()" class="action-btn danger">
                <i class="fas fa-trash-alt"></i> Hapus Semua
            </button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
                    
                    document.getElementById('cssCode').value = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
}

h1 {
    color: #667eea;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 2rem;
}

.subtitle {
    color: #666;
    margin-bottom: 30px;
    font-size: 1rem;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
}

#todoInput {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
}

#todoInput:focus {
    border-color: #667eea;
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
}

.add-btn:hover {
    background: #5a6ff0;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 30px;
}

.stat-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    border-top: 4px solid #667eea;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: #667eea;
}

.stat-label {
    color: #666;
    font-size: 0.9rem;
}

.filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.filter-btn {
    flex: 1;
    padding: 10px;
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
}

.filter-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.filter-btn:hover:not(.active) {
    background: #e9ecef;
}

.todo-list {
    margin-bottom: 30px;
    max-height: 400px;
    overflow-y: auto;
}

.todo-item {
    background: #f8f9fa;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-left: 4px solid #667eea;
    transition: all 0.3s;
}

.todo-item:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
    opacity: 0.7;
    border-left-color: #48bb78;
}

.todo-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.todo-text {
    flex: 1;
    font-size: 1rem;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #666;
}

.todo-date {
    color: #999;
    font-size: 0.8rem;
}

.todo-actions {
    display: flex;
    gap: 10px;
}

.todo-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.todo-btn.edit {
    color: #48bb78;
}

.todo-btn.delete {
    color: #f56565;
}

.todo-btn:hover {
    background: rgba(0, 0, 0, 0.1);
}

.actions {
    display: flex;
    gap: 10px;
}

.action-btn {
    flex: 1;
    padding: 12px;
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.action-btn.danger {
    color: #f56565;
    border-color: #f56565;
}

.action-btn:hover {
    background: #e9ecef;
    transform: translateY(-2px);
}

.action-btn.danger:hover {
    background: #f56565;
    color: white;
}`;
                    
                    document.getElementById('jsCode').value = `let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const totalTodosElement = document.getElementById('totalTodos');
const completedTodosElement = document.getElementById('completedTodos');
const pendingTodosElement = document.getElementById('pendingTodos');

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    totalTodosElement.textContent = total;
    completedTodosElement.textContent = completed;
    pendingTodosElement.textContent = pending;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function createTodoElement(todo) {
    const todoElement = document.createElement('div');
    todoElement.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
    todoElement.dataset.id = todo.id;
    
    todoElement.innerHTML = \`
        <input type="checkbox" class="todo-checkbox" \${todo.completed ? 'checked' : ''}>
        <span class="todo-text">\${todo.text}</span>
        <span class="todo-date">\${formatDate(todo.createdAt)}</span>
        <div class="todo-actions">
            <button class="todo-btn edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="todo-btn delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    \`;
    
    const checkbox = todoElement.querySelector('.todo-checkbox');
    const editBtn = todoElement.querySelector('.edit');
    const deleteBtn = todoElement.querySelector('.delete');
    
    checkbox.addEventListener('click', () => toggleTodo(todo.id));
    editBtn.addEventListener('click', () => editTodo(todo.id));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    return todoElement;
}

function renderTodos() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    
    if (text) {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        todos.push(newTodo);
        saveToLocalStorage();
        renderTodos();
        
        todoInput.value = '';
        todoInput.focus();
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() } : todo
    );
    saveToLocalStorage();
    renderTodos();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('Edit todo:', todo.text);
    
    if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        todo.updatedAt = new Date().toISOString();
        saveToLocalStorage();
        renderTodos();
    }
}

function deleteTodo(id) {
    if (confirm('Yakin ingin menghapus todo ini?')) {
        todos = todos.filter(todo => todo.id !== id);
        saveToLocalStorage();
        renderTodos();
    }
}

function filterTodos(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    renderTodos();
}

function clearCompleted() {
    if (confirm('Yakin ingin menghapus semua todo yang sudah selesai?')) {
        todos = todos.filter(todo => !todo.completed);
        saveToLocalStorage();
        renderTodos();
    }
}

function clearAll() {
    if (confirm('Yakin ingin menghapus semua todo?')) {
        todos = [];
        saveToLocalStorage();
        renderTodos();
    }
}

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

updateStats();
renderTodos();

console.log('Todo List App siap digunakan!');`;
                    
                    document.querySelector('[data-tab="html"]').click();
                    break;
                    
                default:
                    break;
            }
            
            document.querySelector('[data-tab="html"]').click();
        });
    });
    
    const htmlGlossary = [
        {name: "&lt;!DOCTYPE html&gt;", desc: "Deklarasi tipe dokumen HTML5", usage: "Harus ada di awal setiap dokumen HTML", category: "html"},
        {name: "&lt;html&gt;", desc: "Elemen root dari dokumen HTML", usage: "Mengandung semua elemen HTML lainnya", category: "html"},
        {name: "&lt;head&gt;", desc: "Container untuk metadata dokumen", usage: "Berisi title, styles, scripts, meta informasi", category: "html"},
        {name: "&lt;title&gt;", desc: "Judul halaman untuk tab browser", usage: "Penting untuk SEO dan bookmark", category: "html"},
        {name: "&lt;body&gt;", desc: "Konten utama halaman web", usage: "Berisi semua konten yang terlihat", category: "html"},
        {name: "&lt;h1&gt; - &lt;h6&gt;", desc: "Heading level 1 sampai 6", usage: "Untuk judul dan subjudul", category: "html"},
        {name: "&lt;p&gt;", desc: "Paragraf teks", usage: "Untuk teks biasa", category: "html"},
        {name: "&lt;a&gt;", desc: "Link atau anchor", usage: "Untuk membuat hyperlink ke halaman lain", category: "html"},
        {name: "&lt;img&gt;", desc: "Gambar", usage: "Untuk menampilkan gambar", category: "html"},
        {name: "&lt;div&gt;", desc: "Division atau container", usage: "Untuk mengelompokkan elemen", category: "html"},
        {name: "&lt;span&gt;", desc: "Inline container", usage: "Untuk styling bagian teks", category: "html"},
        {name: "&lt;ul&gt;", desc: "Unordered list", usage: "Daftar dengan bullet points", category: "html"},
        {name: "&lt;ol&gt;", desc: "Ordered list", usage: "Daftar dengan angka/huruf", category: "html"},
        {name: "&lt;li&gt;", desc: "List item", usage: "Item dalam list", category: "html"},
        {name: "&lt;table&gt;", desc: "Tabel", usage: "Untuk menampilkan data tabular", category: "html"},
        {name: "&lt;form&gt;", desc: "Formulir", usage: "Untuk input pengguna", category: "html"},
        {name: "&lt;input&gt;", desc: "Input field", usage: "Untuk berbagai jenis input", category: "html"},
        {name: "&lt;button&gt;", desc: "Tombol", usage: "Tombol yang dapat diklik", category: "html"},
        {name: "&lt;textarea&gt;", desc: "Text area", usage: "Input teks multi-baris", category: "html"},
        {name: "&lt;select&gt;", desc: "Dropdown list", usage: "Daftar pilihan dropdown", category: "html"},
        {name: "&lt;header&gt;", desc: "Header section", usage: "Bagian header halaman", category: "html"},
        {name: "&lt;nav&gt;", desc: "Navigation section", usage: "Bagian navigasi", category: "html"},
        {name: "&lt;main&gt;", desc: "Main content", usage: "Konten utama halaman", category: "html"},
        {name: "&lt;section&gt;", desc: "Section", usage: "Bagian tematik dari konten", category: "html"},
        {name: "&lt;article&gt;", desc: "Article", usage: "Konten independen", category: "html"},
        {name: "&lt;footer&gt;", desc: "Footer section", usage: "Bagian footer halaman", category: "html"},
        {name: "&lt;aside&gt;", desc: "Aside content", usage: "Konten samping/tambahan", category: "html"},
        {name: "&lt;figure&gt;", desc: "Figure container", usage: "Untuk gambar dengan caption", category: "html"},
        {name: "&lt;figcaption&gt;", desc: "Figure caption", usage: "Caption untuk figure", category: "html"},
        {name: "&lt;details&gt;", desc: "Details disclosure", usage: "Widget yang dapat dibuka/tutup", category: "html"},
        {name: "&lt;summary&gt;", desc: "Summary for details", usage: "Judul untuk details element", category: "html"},
        {name: "&lt;mark&gt;", desc: "Marked/highlighted text", usage: "Untuk menandai teks penting", category: "html"},
        {name: "&lt;time&gt;", desc: "Time element", usage: "Untuk merepresentasikan waktu", category: "html"},
        {name: "&lt;progress&gt;", desc: "Progress bar", usage: "Untuk menunjukkan progress", category: "html"},
        {name: "&lt;meter&gt;", desc: "Meter gauge", usage: "Untuk nilai dalam range tertentu", category: "html"},
        {name: "&lt;dialog&gt;", desc: "Dialog box", usage: "Untuk dialog/modal window", category: "html"},
        {name: "&lt;template&gt;", desc: "Template element", usage: "Untuk template HTML yang dapat dikloning", category: "html"},
        {name: "&lt;slot&gt;", desc: "Slot element", usage: "Placeholder dalam web component", category: "html"},
        {name: "&lt;canvas&gt;", desc: "Canvas for graphics", usage: "Untuk menggambar dengan JavaScript", category: "html"},
        {name: "&lt;svg&gt;", desc: "Scalable Vector Graphics", usage: "Untuk grafik vektor", category: "html"},
        {name: "&lt;audio&gt;", desc: "Audio player", usage: "Untuk embed audio", category: "html"},
        {name: "&lt;video&gt;", desc: "Video player", usage: "Untuk embed video", category: "html"},
        {name: "&lt;source&gt;", desc: "Media source", usage: "Untuk multiple media sources", category: "html"},
        {name: "&lt;track&gt;", desc: "Text track for media", usage: "Subtitles/captions untuk audio/video", category: "html"},
        {name: "&lt;embed&gt;", desc: "Embed external content", usage: "Untuk embed konten eksternal", category: "html"},
        {name: "&lt;iframe&gt;", desc: "Inline frame", usage: "Untuk embed halaman lain", category: "html"},
        {name: "&lt;object&gt;", desc: "Embed object", usage: "Untuk embed objek eksternal", category: "html"},
        {name: "&lt;param&gt;", desc: "Parameter for object", usage: "Parameter untuk object element", category: "html"},
        {name: "&lt;picture&gt;", desc: "Picture element", usage: "Untuk responsive images", category: "html"},
        {name: "&lt;datalist&gt;", desc: "Data list for input", usage: "Daftar opsi untuk input", category: "html"}
    ];
    
    const cssGlossary = [
        {name: "color", desc: "Warna teks", usage: "color: red; color: #ff0000; color: rgb(255,0,0);", category: "css"},
        {name: "background-color", desc: "Warna background", usage: "background-color: blue; background: linear-gradient(...);", category: "css"},
        {name: "font-size", desc: "Ukuran font", usage: "font-size: 16px; font-size: 1rem; font-size: 100%;", category: "css"},
        {name: "font-family", desc: "Jenis font", usage: "font-family: Arial, sans-serif; font-family: 'Segoe UI', Tahoma;", category: "css"},
        {name: "margin", desc: "Jarak luar elemen", usage: "margin: 10px; margin: 0 auto; margin: 10px 20px;", category: "css"},
        {name: "padding", desc: "Jarak dalam elemen", usage: "padding: 20px; padding: 10px 20px; padding: 5px 10px 15px 20px;", category: "css"},
        {name: "border", desc: "Border elemen", usage: "border: 1px solid #000; border-radius: 5px;", category: "css"},
        {name: "display", desc: "Tipe display", usage: "display: block; display: inline; display: flex; display: grid;", category: "css"},
        {name: "width / height", desc: "Lebar dan tinggi", usage: "width: 100%; height: 200px; min-width: 300px;", category: "css"},
        {name: "text-align", desc: "Penjajaran teks", usage: "text-align: center; text-align: justify; text-align: right;", category: "css"},
        {name: "position", desc: "Posisi elemen", usage: "position: relative; position: absolute; position: fixed;", category: "css"},
        {name: "flex-direction", desc: "Arah flex container", usage: "flex-direction: row; flex-direction: column; flex-direction: row-reverse;", category: "css"},
        {name: "justify-content", desc: "Penjajaran flex horizontal", usage: "justify-content: center; justify-content: space-between;", category: "css"},
        {name: "align-items", desc: "Penjajaran flex vertikal", usage: "align-items: center; align-items: flex-start; align-items: stretch;", category: "css"},
        {name: "grid-template-columns", desc: "Definisi kolom grid", usage: "grid-template-columns: 1fr 1fr 1fr; grid-template-columns: repeat(3, 1fr);", category: "css"},
        {name: "grid-template-rows", desc: "Definisi baris grid", usage: "grid-template-rows: auto 100px; grid-template-rows: repeat(2, minmax(100px, auto));", category: "css"},
        {name: "gap", desc: "Jarak antar grid/flex items", usage: "gap: 20px; row-gap: 10px; column-gap: 20px;", category: "css"},
        {name: "@media", desc: "Media query", usage: "@media (max-width: 768px) { ... } @media (min-width: 1024px) { ... }", category: "css"},
        {name: "transition", desc: "Transisi animasi", usage: "transition: all 0.3s ease; transition: opacity 0.5s linear;", category: "css"},
        {name: "transform", desc: "Transformasi elemen", usage: "transform: rotate(45deg); transform: scale(1.1); transform: translateX(50px);", category: "css"},
        {name: "box-shadow", desc: "Bayangan elemen", usage: "box-shadow: 0 4px 8px rgba(0,0,0,0.1); box-shadow: inset 0 0 10px #000;", category: "css"},
        {name: "border-radius", desc: "Sudut melengkung", usage: "border-radius: 10px; border-radius: 50%; border-radius: 5px 10px 15px 20px;", category: "css"},
        {name: "z-index", desc: "Urutan tumpukan", usage: "z-index: 10; z-index: 999; z-index: -1;", category: "css"},
        {name: "overflow", desc: "Penanganan overflow", usage: "overflow: hidden; overflow: auto; overflow-x: scroll;", category: "css"},
        {name: "opacity", desc: "Transparansi elemen", usage: "opacity: 0.5; opacity: 1; opacity: 0;", category: "css"},
        {name: "cursor", desc: "Jenis cursor mouse", usage: "cursor: pointer; cursor: not-allowed; cursor: grab;", category: "css"},
        {name: "outline", desc: "Outline elemen", usage: "outline: 2px solid blue; outline: none;", category: "css"},
        {name: "visibility", desc: "Visibility elemen", usage: "visibility: visible; visibility: hidden;", category: "css"},
        {name: "white-space", desc: "Penanganan white space", usage: "white-space: nowrap; white-space: pre; white-space: normal;", category: "css"},
        {name: "word-wrap", desc: "Word wrapping", usage: "word-wrap: break-word; word-wrap: normal;", category: "css"},
        {name: "text-overflow", desc: "Text overflow handling", usage: "text-overflow: ellipsis; text-overflow: clip;", category: "css"},
        {name: "box-sizing", desc: "Box model sizing", usage: "box-sizing: border-box; box-sizing: content-box;", category: "css"},
        {name: "float", desc: "Floating elements", usage: "float: left; float: right; float: none;", category: "css"},
        {name: "clear", desc: "Clearing floats", usage: "clear: both; clear: left; clear: right;", category: "css"},
        {name: "filter", desc: "Filter effects", usage: "filter: blur(5px); filter: grayscale(100%); filter: brightness(150%);", category: "css"},
        {name: "backdrop-filter", desc: "Backdrop filter", usage: "backdrop-filter: blur(10px); backdrop-filter: saturate(180%);", category: "css"},
        {name: "clip-path", desc: "Clipping path", usage: "clip-path: circle(50%); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);", category: "css"},
        {name: "mask-image", desc: "Mask image", usage: "mask-image: linear-gradient(black, transparent);", category: "css"},
        {name: "mix-blend-mode", desc: "Blend mode", usage: "mix-blend-mode: multiply; mix-blend-mode: screen;", category: "css"},
        {name: "scroll-behavior", desc: "Scroll behavior", usage: "scroll-behavior: smooth;", category: "css"},
        {name: "aspect-ratio", desc: "Aspect ratio", usage: "aspect-ratio: 16/9; aspect-ratio: 1/1;", category: "css"},
        {name: "object-fit", desc: "Object fit", usage: "object-fit: cover; object-fit: contain; object-fit: fill;", category: "css"},
        {name: "object-position", desc: "Object position", usage: "object-position: center; object-position: top left;", category: "css"},
        {name: "resize", desc: "Resize element", usage: "resize: both; resize: horizontal; resize: vertical;", category: "css"},
        {name: "user-select", desc: "User select", usage: "user-select: none; user-select: text; user-select: all;", category: "css"},
        {name: "pointer-events", desc: "Pointer events", usage: "pointer-events: none; pointer-events: auto;", category: "css"},
        {name: "touch-action", desc: "Touch action", usage: "touch-action: pan-x; touch-action: pinch-zoom;", category: "css"},
        {name: "will-change", desc: "Will change", usage: "will-change: transform; will-change: opacity;", category: "css"},
        {name: "backface-visibility", desc: "Backface visibility", usage: "backface-visibility: hidden; backface-visibility: visible;", category: "css"},
        {name: "perspective", desc: "Perspective", usage: "perspective: 1000px;", category: "css"}
    ];
    
    const jsGlossary = [
        {name: "let / const", desc: "Deklarasi variabel", usage: "let nama = 'Budi'; const PI = 3.14; const arr = [1,2,3];", category: "js"},
        {name: "function", desc: "Deklarasi fungsi", usage: "function sapa() { return 'Halo'; } const sapa = () => 'Halo';", category: "js"},
        {name: "if / else", desc: "Kondisional", usage: "if (umur >= 18) { ... } else { ... }", category: "js"},
        {name: "for loop", desc: "Perulangan for", usage: "for (let i = 0; i < 10; i++) { ... } for (const item of array) { ... }", category: "js"},
        {name: "while loop", desc: "Perulangan while", usage: "while (kondisi) { ... } do { ... } while (kondisi);", category: "js"},
        {name: "Array", desc: "Struktur data array", usage: "let arr = [1, 2, 3]; arr.push(4); arr.pop();", category: "js"},
        {name: "Object", desc: "Struktur data object", usage: "let obj = {nama: 'Budi', umur: 25}; obj.nama = 'Ali';", category: "js"},
        {name: "String methods", desc: "Method untuk string", usage: "str.length; str.toUpperCase(); str.slice(0,5); str.includes('text');", category: "js"},
        {name: "Array methods", desc: "Method untuk array", usage: "arr.map(); arr.filter(); arr.reduce(); arr.find(); arr.some();", category: "js"},
        {name: "addEventListener", desc: "Event handler", usage: "element.addEventListener('click', function); element.onclick = function;", category: "js"},
        {name: "querySelector", desc: "Seleksi elemen", usage: "document.querySelector('.class'); document.querySelectorAll('div');", category: "js"},
        {name: "getElementById", desc: "Seleksi elemen by ID", usage: "document.getElementById('id');", category: "js"},
        {name: "classList", desc: "Manipulasi class", usage: "element.classList.add('active'); element.classList.remove('active');", category: "js"},
        {name: "innerHTML", desc: "Mengubah konten HTML", usage: "element.innerHTML = '<p>Baru</p>';", category: "js"},
        {name: "textContent", desc: "Mengubah teks", usage: "element.textContent = 'Teks baru';", category: "js"},
        {name: "setAttribute", desc: "Mengatur atribut", usage: "element.setAttribute('href', '#'); element.getAttribute('href');", category: "js"},
        {name: "createElement", desc: "Membuat elemen baru", usage: "let div = document.createElement('div');", category: "js"},
        {name: "appendChild", desc: "Menambahkan elemen", usage: "parent.appendChild(child); parent.append(child1, child2);", category: "js"},
        {name: "localStorage", desc: "Penyimpanan browser", usage: "localStorage.setItem('key', 'value'); localStorage.getItem('key');", category: "js"},
        {name: "fetch", desc: "HTTP request", usage: "fetch('url').then(response => response.json());", category: "js"},
        {name: "Promise", desc: "Promise object", usage: "new Promise((resolve, reject) => { ... });", category: "js"},
        {name: "async / await", desc: "Async programming", usage: "async function getData() { let data = await fetch(); }", category: "js"},
        {name: "try / catch", desc: "Error handling", usage: "try { ... } catch (error) { ... } finally { ... }", category: "js"},
        {name: "Date", desc: "Objek tanggal", usage: "let sekarang = new Date(); sekarang.getFullYear();", category: "js"},
        {name: "Math", desc: "Objek matematika", usage: "Math.random(); Math.floor(3.7); Math.max(1,2,3);", category: "js"},
        {name: "JSON", desc: "JSON handling", usage: "JSON.stringify(obj); JSON.parse(jsonString);", category: "js"},
        {name: "Set", desc: "Set data structure", usage: "let set = new Set([1,2,3]); set.add(4); set.has(2);", category: "js"},
        {name: "Map", desc: "Map data structure", usage: "let map = new Map(); map.set('key', 'value'); map.get('key');", category: "js"},
        {name: "WeakMap", desc: "WeakMap", usage: "let weakMap = new WeakMap(); weakMap.set(obj, 'value');", category: "js"},
        {name: "WeakSet", desc: "WeakSet", usage: "let weakSet = new WeakSet(); weakSet.add(obj);", category: "js"},
        {name: "Proxy", desc: "Proxy object", usage: "let proxy = new Proxy(target, handler);", category: "js"},
        {name: "Reflect", desc: "Reflect object", usage: "Reflect.get(obj, 'property'); Reflect.set(obj, 'property', value);", category: "js"},
        {name: "Symbol", desc: "Symbol primitive", usage: "let sym = Symbol('description');", category: "js"},
        {name: "Generator", desc: "Generator function", usage: "function* generator() { yield 1; yield 2; }", category: "js"},
        {name: "Iterator", desc: "Iterator protocol", usage: "for (let value of iterable) { ... }", category: "js"},
        {name: "Promise.all", desc: "Multiple promises", usage: "Promise.all([promise1, promise2]).then(values => ...);", category: "js"},
        {name: "Promise.race", desc: "First promise", usage: "Promise.race([promise1, promise2]).then(value => ...);", category: "js"},
        {name: "Promise.any", desc: "Any promise", usage: "Promise.any([promise1, promise2]).then(value => ...);", category: "js"},
        {name: "Intl", desc: "Internationalization", usage: "new Intl.DateTimeFormat('id-ID').format(date);", category: "js"},
        {name: "Web Workers", desc: "Web Workers", usage: "let worker = new Worker('worker.js'); worker.postMessage(data);", category: "js"},
        {name: "Service Worker", desc: "Service Worker", usage: "navigator.serviceWorker.register('sw.js');", category: "js"},
        {name: "WebSocket", desc: "WebSocket", usage: "let ws = new WebSocket('ws://example.com'); ws.send(data);", category: "js"},
        {name: "IntersectionObserver", desc: "Intersection Observer", usage: "let observer = new IntersectionObserver(callback, options);", category: "js"},
        {name: "MutationObserver", desc: "Mutation Observer", usage: "let observer = new MutationObserver(callback);", category: "js"},
        {name: "ResizeObserver", desc: "Resize Observer", usage: "let observer = new ResizeObserver(callback);", category: "js"},
        {name: "Performance", desc: "Performance API", usage: "performance.now(); performance.mark('start');", category: "js"},
        {name: "console", desc: "Console methods", usage: "console.log(); console.error(); console.table(); console.time();", category: "js"},
        {name: "debugger", desc: "Debugger statement", usage: "debugger; // Pauses execution", category: "js"},
        {name: "eval", desc: "Eval function", usage: "eval('2 + 2'); // Returns 4 (use with caution)", category: "js"}
    ];
    
    const toolsGlossary = [
        {name: "Git", desc: "Version control system", usage: "git init, git add, git commit, git push, git pull", category: "tools"},
        {name: "GitHub", desc: "Code hosting platform", usage: "Repository hosting, pull requests, issues, GitHub Actions", category: "tools"},
        {name: "npm", desc: "Node Package Manager", usage: "npm install package-name, npm run script, package.json", category: "tools"},
        {name: "yarn", desc: "Package manager", usage: "yarn add package-name, yarn start, yarn.lock", category: "tools"},
        {name: "Webpack", desc: "Module bundler", usage: "Bundling JavaScript modules, loaders, plugins", category: "tools"},
        {name: "Babel", desc: "JavaScript compiler", usage: "Transpiling ES6+ to ES5, JSX to JavaScript", category: "tools"},
        {name: "ESLint", desc: "JavaScript linter", usage: "Code linting, enforcing coding standards", category: "tools"},
        {name: "Prettier", desc: "Code formatter", usage: "Automatic code formatting, .prettierrc config", category: "tools"},
        {name: "Jest", desc: "JavaScript testing", usage: "Unit testing, snapshot testing, mocking", category: "tools"},
        {name: "Cypress", desc: "E2E testing", usage: "End-to-end testing, browser automation", category: "tools"},
        {name: "Docker", desc: "Containerization", usage: "Containerized applications, Dockerfile, docker-compose", category: "tools"},
        {name: "VS Code", desc: "Code editor", usage: "Extensions, debugging, integrated terminal, IntelliSense", category: "tools"},
        {name: "Chrome DevTools", desc: "Browser developer tools", usage: "Debugging, performance analysis, network inspection", category: "tools"},
        {name: "Postman", desc: "API testing", usage: "API requests, testing, documentation", category: "tools"},
        {name: "Figma", desc: "Design tool", usage: "UI/UX design, prototyping, design systems", category: "tools"},
        {name: "Photoshop", desc: "Image editing", usage: "Image manipulation, graphic design", category: "tools"},
        {name: "Illustrator", desc: "Vector graphics", usage: "Vector illustrations, logos, icons", category: "tools"},
        {name: "Sketch", desc: "UI design", usage: "UI design, prototyping, design handoff", category: "tools"},
        {name: "Notion", desc: "Productivity tool", usage: "Note-taking, project management, documentation", category: "tools"},
        {name: "Slack", desc: "Team communication", usage: "Team messaging, channels, integrations", category: "tools"},
        {name: "Trello", desc: "Project management", usage: "Kanban boards, task management, collaboration", category: "tools"},
        {name: "Jira", desc: "Project tracking", usage: "Agile project management, issue tracking", category: "tools"},
        {name: "Confluence", desc: "Documentation", usage: "Team documentation, knowledge base", category: "tools"},
        {name: "Netlify", desc: "Static site hosting", usage: "Continuous deployment, serverless functions", category: "tools"},
        {name: "Vercel", desc: "Deployment platform", usage: "Frontend deployment, serverless functions", category: "tools"},
        {name: "AWS", desc: "Cloud platform", usage: "S3, EC2, Lambda, RDS, CloudFront", category: "tools"},
        {name: "Firebase", desc: "Backend as a service", usage: "Authentication, database, hosting, functions", category: "tools"},
        {name: "MongoDB", desc: "NoSQL database", usage: "Document database, MongoDB Atlas", category: "tools"},
        {name: "PostgreSQL", desc: "SQL database", usage: "Relational database, advanced features", category: "tools"},
        {name: "Redis", desc: "In-memory database", usage: "Caching, session storage, real-time features", category: "tools"},
        {name: "GraphQL", desc: "Query language", usage: "API query language, Apollo, Relay", category: "tools"},
        {name: "REST API", desc: "API architecture", usage: "RESTful API design, endpoints, HTTP methods", category: "tools"},
        {name: "TypeScript", desc: "Typed JavaScript", usage: "Static typing, interfaces, enums, generics", category: "tools"},
        {name: "Sass", desc: "CSS preprocessor", usage: "Variables, nesting, mixins, functions", category: "tools"},
        {name: "Less", desc: "CSS preprocessor", usage: "Variables, mixins, functions, import", category: "tools"},
        {name: "Tailwind CSS", desc: "Utility-first CSS", usage: "Utility classes, responsive design, customization", category: "tools"},
        {name: "Bootstrap", desc: "CSS framework", usage: "Components, grid system, responsive design", category: "tools"},
        {name: "Material-UI", desc: "React UI framework", usage: "Material Design components for React", category: "tools"},
        {name: "Ant Design", desc: "UI library", usage: "Enterprise UI components for React", category: "tools"},
        {name: "Next.js", desc: "React framework", usage: "Server-side rendering, static generation, API routes", category: "tools"},
        {name: "Gatsby", desc: "Static site generator", usage: "React-based, GraphQL, plugins", category: "tools"},
        {name: "Nuxt.js", desc: "Vue framework", usage: "Server-side rendering, static generation", category: "tools"},
        {name: "Svelte", desc: "Compiler framework", usage: "Compiles to efficient JavaScript, no virtual DOM", category: "tools"},
        {name: "React Native", desc: "Mobile framework", usage: "React for mobile apps, iOS and Android", category: "tools"},
        {name: "Flutter", desc: "UI toolkit", usage: "Cross-platform apps, Dart language", category: "tools"},
        {name: "Electron", desc: "Desktop apps", usage: "Cross-platform desktop apps with web technologies", category: "tools"}
    ];
    
    const conceptsGlossary = [
        {name: "DOM", desc: "Document Object Model", usage: "Tree representation of HTML document for manipulation", category: "concepts"},
        {name: "Virtual DOM", desc: "Virtual DOM", usage: "Lightweight copy of real DOM for efficient updates", category: "concepts"},
        {name: "Component", desc: "Component", usage: "Reusable UI piece with own logic and styling", category: "concepts"},
        {name: "State", desc: "State", usage: "Data that determines component behavior and rendering", category: "concepts"},
        {name: "Props", desc: "Properties", usage: "Data passed from parent to child component", category: "concepts"},
        {name: "Lifecycle", desc: "Component lifecycle", usage: "Methods called at different stages of component existence", category: "concepts"},
        {name: "Hooks", desc: "React Hooks", usage: "Functions that let you use state and lifecycle in functional components", category: "concepts"},
        {name: "Context", desc: "Context API", usage: "Passing data through component tree without prop drilling", category: "concepts"},
        {name: "Redux", desc: "State management", usage: "Predictable state container for JavaScript apps", category: "concepts"},
        {name: "MobX", desc: "State management", usage: "Simple, scalable state management", category: "concepts"},
        {name: "Router", desc: "Routing", usage: "Navigating between different views/pages in SPA", category: "concepts"},
        {name: "SPA", desc: "Single Page Application", usage: "Web app that loads a single HTML page and updates dynamically", category: "concepts"},
        {name: "MPA", desc: "Multi Page Application", usage: "Traditional web app with multiple HTML pages", category: "concepts"},
        {name: "SSR", desc: "Server-Side Rendering", usage: "Rendering web pages on server before sending to client", category: "concepts"},
        {name: "CSR", desc: "Client-Side Rendering", usage: "Rendering web pages in browser using JavaScript", category: "concepts"},
        {name: "SSG", desc: "Static Site Generation", usage: "Generating static HTML at build time", category: "concepts"},
        {name: "ISR", desc: "Incremental Static Regeneration", usage: "Updating static pages after build time", category: "concepts"},
        {name: "PWA", desc: "Progressive Web App", usage: "Web apps that work offline and feel like native apps", category: "concepts"},
        {name: "JAMstack", desc: "JAMstack", usage: "JavaScript, APIs, and Markup - modern web architecture", category: "concepts"},
        {name: "Microservices", desc: "Microservices", usage: "Architectural style with small, independent services", category: "concepts"},
        {name: "Monolith", desc: "Monolithic architecture", usage: "Traditional architecture with tightly coupled components", category: "concepts"},
        {name: "API", desc: "Application Programming Interface", usage: "Set of rules for software communication", category: "concepts"},
        {name: "REST", desc: "RESTful API", usage: "Architectural style for distributed systems", category: "concepts"},
        {name: "GraphQL", desc: "GraphQL", usage: "Query language for APIs with single endpoint", category: "concepts"},
        {name: "WebSocket", desc: "WebSocket", usage: "Protocol for real-time, bidirectional communication", category: "concepts"},
        {name: "HTTP/2", desc: "HTTP/2", usage: "Major revision of HTTP protocol with performance improvements", category: "concepts"},
        {name: "HTTPS", desc: "HTTPS", usage: "Secure version of HTTP with encryption", category: "concepts"},
        {name: "CORS", desc: "Cross-Origin Resource Sharing", usage: "Mechanism for cross-domain requests", category: "concepts"},
        {name: "SEO", desc: "Search Engine Optimization", usage: "Optimizing websites for search engines", category: "concepts"},
        {name: "Accessibility", desc: "Web Accessibility", usage: "Making websites usable for people with disabilities", category: "concepts"},
        {name: "Responsive Design", desc: "Responsive Design", usage: "Designing websites to work on all screen sizes", category: "concepts"},
        {name: "Mobile First", desc: "Mobile First Design", usage: "Designing for mobile first, then desktop", category: "concepts"},
        {name: "Progressive Enhancement", desc: "Progressive Enhancement", usage: "Starting with basic functionality, adding enhancements", category: "concepts"},
        {name: "Graceful Degradation", desc: "Graceful Degradation", usage: "Starting with full features, ensuring fallbacks", category: "concepts"},
        {name: "Critical Rendering Path", desc: "Critical Rendering Path", usage: "Sequence of steps browser takes to render page", category: "concepts"},
        {name: "Render Blocking", desc: "Render Blocking", usage: "Resources that prevent page from rendering", category: "concepts"},
        {name: "Code Splitting", desc: "Code Splitting", usage: "Splitting code into smaller bundles for faster loading", category: "concepts"},
        {name: "Lazy Loading", desc: "Lazy Loading", usage: "Loading resources only when needed", category: "concepts"},
        {name: "Tree Shaking", desc: "Tree Shaking", usage: "Removing unused code from bundle", category: "concepts"},
        {name: "Minification", desc: "Minification", usage: "Removing unnecessary characters from code", category: "concepts"},
        {name: "Bundling", desc: "Bundling", usage: "Combining multiple files into single file", category: "concepts"},
        {name: "Transpilation", desc: "Transpilation", usage: "Converting code from one language version to another", category: "concepts"},
        {name: "Polyfill", desc: "Polyfill", usage: "Code that provides modern functionality in older browsers", category: "concepts"},
        {name: "Shim", desc: "Shim", usage: "Library that intercepts API calls and changes parameters", category: "concepts"},
        {name: "Promise", desc: "Promise", usage: "Object representing eventual completion of async operation", category: "concepts"},
        {name: "Async/Await", desc: "Async/Await", usage: "Syntax for writing asynchronous code that looks synchronous", category: "concepts"},
        {name: "Callback", desc: "Callback", usage: "Function passed as argument to be executed later", category: "concepts"},
        {name: "Closure", desc: "Closure", usage: "Function with access to its own scope, outer function's scope, and global scope", category: "concepts"},
        {name: "Hoisting", desc: "Hoisting", usage: "JavaScript's behavior of moving declarations to top of scope", category: "concepts"},
        {name: "Prototype", desc: "Prototype", usage: "Mechanism for inheritance in JavaScript", category: "concepts"},
        {name: "Event Loop", desc: "Event Loop", usage: "JavaScript runtime model for handling async operations", category: "concepts"},
        {name: "Call Stack", desc: "Call Stack", usage: "Data structure for tracking function calls", category: "concepts"},
        {name: "Heap", desc: "Heap", usage: "Memory area for object allocation", category: "concepts"},
        {name: "Queue", desc: "Queue", usage: "Data structure for handling async tasks", category: "concepts"},
        {name: "Mutation", desc: "Mutation", usage: "Changing data or state", category: "concepts"},
        {name: "Immutable", desc: "Immutable", usage: "Cannot be changed after creation", category: "concepts"},
        {name: "Pure Function", desc: "Pure Function", usage: "Function that always returns same result for same arguments", category: "concepts"},
        {name: "Side Effect", desc: "Side Effect", usage: "Function effect that's observable outside its return value", category: "concepts"},
        {name: "Higher-Order Function", desc: "Higher-Order Function", usage: "Function that takes or returns another function", category: "concepts"},
        {name: "Currying", desc: "Currying", usage: "Transforming function with multiple arguments into sequence of functions", category: "concepts"},
        {name: "Memoization", desc: "Memoization", usage: "Caching results of expensive function calls", category: "concepts"},
        {name: "Debouncing", desc: "Debouncing", usage: "Limiting rate of function execution", category: "concepts"},
        {name: "Throttling", desc: "Throttling", usage: "Limiting function execution to once per specified period", category: "concepts"},
        {name: "Design Pattern", desc: "Design Pattern", usage: "Reusable solution to common problems", category: "concepts"},
        {name: "Singleton", desc: "Singleton", usage: "Design pattern ensuring single instance of class", category: "concepts"},
        {name: "Factory", desc: "Factory", usage: "Design pattern creating objects without specifying exact class", category: "concepts"},
        {name: "Observer", desc: "Observer", usage: "Design pattern for event handling", category: "concepts"},
        {name: "Module", desc: "Module", usage: "Design pattern for encapsulating code", category: "concepts"},
        {name: "MVC", desc: "Model-View-Controller", usage: "Architectural pattern separating data, UI, and logic", category: "concepts"},
        {name: "MVVM", desc: "Model-View-ViewModel", usage: "Architectural pattern with data binding", category: "concepts"},
        {name: "Flux", desc: "Flux", usage: "Application architecture for unidirectional data flow", category: "concepts"},
        {name: "CI/CD", desc: "Continuous Integration/Deployment", usage: "Automating build, test, and deployment processes", category: "concepts"},
        {name: "DevOps", desc: "DevOps", usage: "Combining development and operations", category: "concepts"},
        {name: "Agile", desc: "Agile", usage: "Iterative approach to project management", category: "concepts"},
        {name: "Scrum", desc: "Scrum", usage: "Agile framework for complex projects", category: "concepts"},
        {name: "Kanban", desc: "Kanban", usage: "Visual workflow management system", category: "concepts"},
        {name: "TDD", desc: "Test-Driven Development", usage: "Writing tests before writing code", category: "concepts"},
        {name: "BDD", desc: "Behavior-Driven Development", usage: "Collaborative approach to testing", category: "concepts"},
        {name: "Unit Test", desc: "Unit Test", usage: "Testing individual components in isolation", category: "concepts"},
        {name: "Integration Test", desc: "Integration Test", usage: "Testing interaction between components", category: "concepts"},
        {name: "E2E Test", desc: "End-to-End Test", usage: "Testing complete user flows", category: "concepts"},
        {name: "Regression Test", desc: "Regression Test", usage: "Testing to ensure changes don't break existing functionality", category: "concepts"},
        {name: "Performance Test", desc: "Performance Test", usage: "Testing speed, scalability, and stability", category: "concepts"},
        {name: "Security Test", desc: "Security Test", usage: "Testing for vulnerabilities and security issues", category: "concepts"},
        {name: "Load Test", desc: "Load Test", usage: "Testing system under expected load", category: "concepts"},
        {name: "Stress Test", desc: "Stress Test", usage: "Testing system beyond normal operational capacity", category: "concepts"}
    ];
    
    const glossaryData = {
        html: htmlGlossary,
        css: cssGlossary,
        js: jsGlossary,
        tools: toolsGlossary,
        concepts: conceptsGlossary
    };
    
    function populateGlossary(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'glosarium-item';
            itemElement.setAttribute('data-category', item.category);
            
            itemElement.innerHTML = `
                <div class="item-header">
                    <h4>${item.name}</h4>
                    <span class="item-category">${item.category.toUpperCase()}</span>
                </div>
                <p class="item-description">${item.desc}</p>
                <div class="item-usage">
                    <strong>Contoh:</strong> ${item.usage}
                </div>
            `;
            
            container.appendChild(itemElement);
        });
    }
    
    Object.keys(glossaryData).forEach(category => {
        const containerId = `${category}-glossary`;
        populateGlossary(containerId, glossaryData[category]);
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.glosarium-item').forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('.glosarium-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
