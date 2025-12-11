document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav ul');
    const navLinks = document.querySelectorAll('.nav-link, .footer a[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const currentYearElement = document.getElementById('currentYear');
    const startLessonButtons = document.querySelectorAll('.start-lesson');
    const lessonContainer = document.getElementById('lesson-container');
    const learningPathList = document.getElementById('learning-path-list');
    const btnBackToList = document.querySelector('.btn-back-to-list');
    const prevStepBtn = document.getElementById('prev-step');
    const nextStepBtn = document.getElementById('next-step');
    const completeLessonBtn = document.getElementById('complete-lesson');
    const lessonTitle = document.getElementById('lesson-title');
    const currentStepSpan = document.getElementById('current-step');
    const totalStepsSpan = document.getElementById('total-steps');
    const explanationText = document.getElementById('explanation-text');
    const lessonCodeExample = document.getElementById('lesson-code-example');
    const progressDisplay = document.getElementById('progress-display');
    
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        menuToggle.innerHTML = mainNav.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
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
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    const htmlGlossary = [
        {name: "&lt;!DOCTYPE html&gt;", desc: "Deklarasi tipe dokumen HTML5", usage: "Harus ada di awal setiap dokumen HTML"},
        {name: "&lt;html&gt;", desc: "Elemen root dari dokumen HTML", usage: "Mengandung semua elemen HTML lainnya"},
        {name: "&lt;head&gt;", desc: "Container untuk metadata dokumen", usage: "Berisi title, styles, scripts, meta informasi"},
        {name: "&lt;title&gt;", desc: "Judul halaman untuk tab browser", usage: "Penting untuk SEO dan bookmark"},
        {name: "&lt;body&gt;", desc: "Konten utama halaman web", usage: "Berisi semua konten yang terlihat"},
        {name: "&lt;h1&gt; - &lt;h6&gt;", desc: "Heading level 1 sampai 6", usage: "Untuk judul dan subjudul"},
        {name: "&lt;p&gt;", desc: "Paragraf teks", usage: "Untuk teks biasa"},
        {name: "&lt;a&gt;", desc: "Link atau anchor", usage: "Untuk membuat hyperlink ke halaman lain"},
        {name: "&lt;img&gt;", desc: "Gambar", usage: "Untuk menampilkan gambar"},
        {name: "&lt;div&gt;", desc: "Division atau container", usage: "Untuk mengelompokkan elemen"},
        {name: "&lt;span&gt;", desc: "Inline container", usage: "Untuk styling bagian teks"},
        {name: "&lt;ul&gt;", desc: "Unordered list", usage: "Daftar dengan bullet points"},
        {name: "&lt;ol&gt;", desc: "Ordered list", usage: "Daftar dengan angka/huruf"},
        {name: "&lt;li&gt;", desc: "List item", usage: "Item dalam list"},
        {name: "&lt;table&gt;", desc: "Tabel", usage: "Untuk menampilkan data tabular"},
        {name: "&lt;form&gt;", desc: "Formulir", usage: "Untuk input pengguna"},
        {name: "&lt;input&gt;", desc: "Input field", usage: "Untuk berbagai jenis input"},
        {name: "&lt;button&gt;", desc: "Tombol", usage: "Tombol yang dapat diklik"},
        {name: "&lt;textarea&gt;", desc: "Text area", usage: "Input teks multi-baris"},
        {name: "&lt;select&gt;", desc: "Dropdown list", usage: "Daftar pilihan dropdown"},
        {name: "&lt;header&gt;", desc: "Header section", usage: "Bagian header halaman"},
        {name: "&lt;nav&gt;", desc: "Navigation section", usage: "Bagian navigasi"},
        {name: "&lt;main&gt;", desc: "Main content", usage: "Konten utama halaman"},
        {name: "&lt;section&gt;", desc: "Section", usage: "Bagian tematik dari konten"},
        {name: "&lt;article&gt;", desc: "Article", usage: "Konten independen"},
        {name: "&lt;footer&gt;", desc: "Footer section", usage: "Bagian footer halaman"}
    ];
    
    const cssGlossary = [
        {name: "color", desc: "Warna teks", usage: "color: red; color: #ff0000;"},
        {name: "background-color", desc: "Warna background", usage: "background-color: blue;"},
        {name: "font-size", desc: "Ukuran font", usage: "font-size: 16px; font-size: 1rem;"},
        {name: "font-family", desc: "Jenis font", usage: "font-family: Arial, sans-serif;"},
        {name: "margin", desc: "Jarak luar elemen", usage: "margin: 10px; margin: 0 auto;"},
        {name: "padding", desc: "Jarak dalam elemen", usage: "padding: 20px; padding: 10px 20px;"},
        {name: "border", desc: "Border elemen", usage: "border: 1px solid #000;"},
        {name: "display", desc: "Tipe display", usage: "display: block; display: flex;"},
        {name: "width / height", desc: "Lebar dan tinggi", usage: "width: 100%; height: 200px;"},
        {name: "text-align", desc: "Penjajaran teks", usage: "text-align: center; text-align: justify;"},
        {name: "position", desc: "Posisi elemen", usage: "position: relative; position: absolute;"},
        {name: "flex-direction", desc: "Arah flex container", usage: "flex-direction: row; flex-direction: column;"},
        {name: "justify-content", desc: "Penjajaran flex horizontal", usage: "justify-content: center; justify-content: space-between;"},
        {name: "align-items", desc: "Penjajaran flex vertikal", usage: "align-items: center; align-items: flex-start;"},
        {name: "grid-template-columns", desc: "Definisi kolom grid", usage: "grid-template-columns: 1fr 1fr 1fr;"},
        {name: "grid-template-rows", desc: "Definisi baris grid", usage: "grid-template-rows: auto 100px;"},
        {name: "gap", desc: "Jarak antar grid/flex items", usage: "gap: 20px; row-gap: 10px; column-gap: 20px;"},
        {name: "@media", desc: "Media query", usage: "@media (max-width: 768px) { ... }"},
        {name: "transition", desc: "Transisi animasi", usage: "transition: all 0.3s ease;"},
        {name: "transform", desc: "Transformasi elemen", usage: "transform: rotate(45deg); transform: scale(1.1);"},
        {name: "box-shadow", desc: "Bayangan elemen", usage: "box-shadow: 0 4px 8px rgba(0,0,0,0.1);"},
        {name: "border-radius", desc: "Sudut melengkung", usage: "border-radius: 10px; border-radius: 50%;"},
        {name: "z-index", desc: "Urutan tumpukan", usage: "z-index: 10; z-index: 999;"},
        {name: "overflow", desc: "Penanganan overflow", usage: "overflow: hidden; overflow: auto;"},
        {name: "opacity", desc: "Transparansi elemen", usage: "opacity: 0.5; opacity: 1;"}
    ];
    
    const jsGlossary = [
        {name: "let / const", desc: "Deklarasi variabel", usage: "let nama = 'Budi'; const PI = 3.14;"},
        {name: "function", desc: "Deklarasi fungsi", usage: "function sapa() { return 'Halo'; }"},
        {name: "if / else", desc: "Kondisional", usage: "if (umur >= 18) { ... } else { ... }"},
        {name: "for loop", desc: "Perulangan for", usage: "for (let i = 0; i < 10; i++) { ... }"},
        {name: "while loop", desc: "Perulangan while", usage: "while (kondisi) { ... }"},
        {name: "Array", desc: "Struktur data array", usage: "let arr = [1, 2, 3]; arr.push(4);"},
        {name: "Object", desc: "Struktur data object", usage: "let obj = {nama: 'Budi', umur: 25};"},
        {name: "String methods", desc: "Method untuk string", usage: "str.length; str.toUpperCase(); str.slice(0,5);"},
        {name: "Array methods", desc: "Method untuk array", usage: "arr.map(); arr.filter(); arr.reduce();"},
        {name: "addEventListener", desc: "Event handler", usage: "element.addEventListener('click', function);"},
        {name: "querySelector", desc: "Seleksi elemen", usage: "document.querySelector('.class');"},
        {name: "getElementById", desc: "Seleksi elemen by ID", usage: "document.getElementById('id');"},
        {name: "classList", desc: "Manipulasi class", usage: "element.classList.add('active');"},
        {name: "innerHTML", desc: "Mengubah konten HTML", usage: "element.innerHTML = '<p>Baru</p>';"},
        {name: "textContent", desc: "Mengubah teks", usage: "element.textContent = 'Teks baru';"},
        {name: "setAttribute", desc: "Mengatur atribut", usage: "element.setAttribute('href', '#');"},
        {name: "createElement", desc: "Membuat elemen baru", usage: "let div = document.createElement('div');"},
        {name: "appendChild", desc: "Menambahkan elemen", usage: "parent.appendChild(child);"},
        {name: "localStorage", desc: "Penyimpanan browser", usage: "localStorage.setItem('key', 'value');"},
        {name: "fetch", desc: "HTTP request", usage: "fetch('url').then(response => response.json());"},
        {name: "Promise", desc: "Promise object", usage: "new Promise((resolve, reject) => { ... });"},
        {name: "async / await", desc: "Async programming", usage: "async function getData() { let data = await fetch(); }"},
        {name: "try / catch", desc: "Error handling", usage: "try { ... } catch (error) { ... }"},
        {name: "Date", desc: "Objek tanggal", usage: "let sekarang = new Date();"},
        {name: "Math", desc: "Objek matematika", usage: "Math.random(); Math.floor(3.7);"}
    ];
    
    const generalGlossary = [
        {name: "DOM", desc: "Document Object Model", usage: "Representasi terstruktur dokumen HTML"},
        {name: "API", desc: "Application Programming Interface", usage: "Antarmuka untuk komunikasi antar software"},
        {name: "HTTP", desc: "Hypertext Transfer Protocol", usage: "Protokol untuk transfer data web"},
        {name: "URL", desc: "Uniform Resource Locator", usage: "Alamat website atau resource"},
        {name: "SEO", desc: "Search Engine Optimization", usage: "Optimasi untuk mesin pencari"},
        {name: "Responsive Design", desc: "Desain responsif", usage: "Desain yang menyesuaikan dengan berbagai ukuran layar"},
        {name: "Frontend", desc: "Frontend Development", usage: "Bagian client-side dari website"},
        {name: "Backend", desc: "Backend Development", usage: "Bagian server-side dari website"},
        {name: "Full Stack", desc: "Full Stack Developer", usage: "Developer yang menguasai frontend dan backend"},
        {name: "Git", desc: "Version Control System", usage: "Sistem kontrol versi untuk kode"},
        {name: "Framework", desc: "Framework", usage: "Kumpulan tools dan library untuk development"},
        {name: "Library", desc: "Library", usage: "Kumpulan fungsi dan method yang dapat digunakan kembali"},
        {name: "Debugging", desc: "Debugging", usage: "Proses mencari dan memperbaiki bug"},
        {name: "Variable", desc: "Variable", usage: "Tempat penyimpanan data dalam program"},
        {name: "Function", desc: "Function", usage: "Blok kode yang dapat dipanggil berulang"},
        {name: "Algorithm", desc: "Algorithm", usage: "Langkah-langkah untuk menyelesaikan masalah"},
        {name: "Syntax", desc: "Syntax", usage: "Aturan penulisan kode dalam bahasa pemrograman"},
        {name: "Semantic", desc: "Semantic HTML", usage: "HTML yang menggunakan elemen dengan makna"},
        {name: "CSS Preprocessor", desc: "CSS Preprocessor", usage: "Sass, Less - ekstensi CSS dengan fitur tambahan"},
        {name: "Package Manager", desc: "Package Manager", usage: "npm, yarn - mengelola dependensi proyek"}
    ];
    
    function populateGlossary(containerId, items, category) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'glosarium-item';
            itemElement.setAttribute('data-category', category);
            
            itemElement.innerHTML = `
                <div class="item-header">
                    <h4>${item.name}</h4>
                    <span class="item-category">${category.toUpperCase()}</span>
                </div>
                <p class="item-description">${item.desc}</p>
                <div class="item-usage">
                    <strong>Kegunaan:</strong> ${item.usage}
                </div>
            `;
            
            container.appendChild(itemElement);
        });
    }
    
    populateGlossary('html-glossary', htmlGlossary, 'html');
    populateGlossary('css-glossary', cssGlossary, 'css');
    populateGlossary('js-glossary', jsGlossary, 'js');
    populateGlossary('general-glossary', generalGlossary, 'general');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const allItems = document.querySelectorAll('.glosarium-item');
            allItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const allItems = document.querySelectorAll('.glosarium-item');
        
        allItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('.item-description').textContent.toLowerCase();
            const usage = item.querySelector('.item-usage').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || usage.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    const lessonsData = {
        'html-basic': {
            title: 'HTML Dasar',
            steps: [
                {
                    explanation: '<p>HTML (HyperText Markup Language) adalah bahasa markup yang digunakan untuk membuat struktur halaman web. Setiap dokumen HTML dimulai dengan deklarasi DOCTYPE.</p><p>Deklarasi ini memberitahu browser bahwa dokumen ini menggunakan HTML5.</p>',
                    code: `<!DOCTYPE html>
<html>
<head>
    <title>Halaman Pertama</title>
</head>
<body>
    <h1>Selamat Datang</h1>
</body>
</html>`
                },
                {
                    explanation: '<p>Elemen <strong>&lt;html&gt;</strong> adalah elemen root dari dokumen HTML. Semua elemen lainnya harus berada di dalam elemen ini.</p><p>Atribut <strong>lang</strong> menentukan bahasa dari dokumen, yang penting untuk aksesibilitas dan SEO.</p>',
                    code: `<!DOCTYPE html>
<html lang="id">
<!-- Konten HTML -->
</html>`
                },
                {
                    explanation: '<p>Bagian <strong>&lt;head&gt;</strong> berisi metadata tentang dokumen, seperti judul, link ke stylesheet, dan script.</p><p>Elemen <strong>&lt;title&gt;</strong> menentukan judul halaman yang muncul di tab browser.</p>',
                    code: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Belajar HTML</title>
    <link rel="stylesheet" href="styles.css">
</head>`
                },
                {
                    explanation: '<p>Elemen <strong>&lt;body&gt;</strong> berisi semua konten yang ditampilkan di halaman web, seperti teks, gambar, link, dan elemen lainnya.</p><p>Ini adalah area kerja utama untuk konten website Anda.</p>',
                    code: `<body>
    <header>
        <h1>Website Saya</h1>
    </header>
    <main>
        <p>Ini adalah konten utama.</p>
    </main>
</body>`
                },
                {
                    explanation: '<p>Heading tags (<strong>&lt;h1&gt; hingga &lt;h6&gt;</strong>) digunakan untuk judul dan subjudul. <strong>&lt;h1&gt;</strong> adalah yang terpenting dan seharusnya hanya ada satu per halaman.</p><p>Tag <strong>&lt;p&gt;</strong> digunakan untuk paragraf teks biasa.</p>',
                    code: `<h1>Judul Utama</h1>
<h2>Sub Judul</h2>
<p>Ini adalah paragraf pertama.</p>
<p>Ini adalah paragraf kedua.</p>`
                }
            ]
        },
        'css-basic': {
            title: 'CSS Dasar',
            steps: [
                {
                    explanation: '<p>CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan dan tata letak elemen HTML. CSS dapat ditulis inline, internal, atau eksternal.</p><p>Selektor CSS digunakan untuk memilih elemen yang akan distyling.</p>',
                    code: `/* Selektor element */
h1 {
    color: blue;
}

/* Selektor class */
.nama-class {
    font-size: 16px;
}

/* Selektor ID */
#nama-id {
    background-color: yellow;
}`
                },
                {
                    explanation: '<p>Box model adalah konsep fundamental dalam CSS. Setiap elemen dianggap sebagai kotak dengan margin, border, padding, dan konten.</p><p>Properti <strong>box-sizing: border-box</strong> memastikan padding dan border termasuk dalam lebar elemen.</p>',
                    code: `.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
    box-sizing: border-box;
}`
                }
            ]
        },
        'css-advanced': {
            title: 'CSS Lanjutan',
            steps: [
                {
                    explanation: '<p>Flexbox adalah model layout satu dimensi yang memudahkan penataan, perataan, dan distribusi ruang antar item dalam container.</p><p>Properti <strong>display: flex</strong> mengaktifkan flexbox pada container.</p>',
                    code: `.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.item {
    flex: 1;
}`
                }
            ]
        },
        'js-basic': {
            title: 'JavaScript Dasar',
            steps: [
                {
                    explanation: '<p>JavaScript adalah bahasa pemrograman yang membuat halaman web interaktif. Variabel digunakan untuk menyimpan data.</p><p><strong>let</strong> dan <strong>const</strong> adalah cara modern untuk mendeklarasikan variabel.</p>',
                    code: `// Deklarasi variabel
let nama = "Budi";
const umur = 25;
var kota = "Jakarta";

// Tipe data
let angka = 42;
let teks = "Hello";
let benar = true;
let array = [1, 2, 3];
let objek = {nama: "Ali", umur: 30};`
                }
            ]
        },
        'js-advanced': {
            title: 'JavaScript Lanjutan',
            steps: [
                {
                    explanation: '<p>Promise digunakan untuk menangani operasi asynchronous. Async/await adalah sintaks yang lebih bersih untuk bekerja dengan Promise.</p><p><strong>async</strong> membuat fungsi mengembalikan Promise, dan <strong>await</strong> menunggu Promise selesai.</p>',
                    code: `// Promise
let janji = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data diterima");
    }, 2000);
});

// Async/Await
async function ambilData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}`
                }
            ]
        },
        'tools-framework': {
            title: 'Tools & Framework',
            steps: [
                {
                    explanation: '<p>Git adalah sistem kontrol versi untuk melacak perubahan kode. GitHub adalah platform hosting untuk repository Git.</p><p>Perintah dasar Git: clone, add, commit, push, pull.</p>',
                    code: `# Clone repository
git clone https://github.com/user/repo.git

# Tambahkan perubahan
git add .

# Commit perubahan
git commit -m "Pesan commit"

# Push ke remote
git push origin main

# Pull perubahan terbaru
git pull origin main`
                }
            ]
        }
    };
    
    let currentLesson = null;
    let currentStepIndex = 0;
    let userProgress = JSON.parse(localStorage.getItem('webdev-progress')) || {
        completedLessons: [],
        currentLesson: null,
        currentStep: 0
    };
    
    function saveProgress() {
        localStorage.setItem('webdev-progress', JSON.stringify(userProgress));
        updateProgressDisplay();
    }
    
    function updateProgressDisplay() {
        const completedCount = userProgress.completedLessons.length;
        const totalLessons = Object.keys(lessonsData).length;
        const percentage = Math.round((completedCount / totalLessons) * 100);
        
        progressDisplay.innerHTML = `
            <strong>Progress Belajar:</strong>
            <div class="progress-bar" style="width: 100%; height: 10px; background: #333; border-radius: 5px; margin: 10px 0;">
                <div style="width: ${percentage}%; height: 100%; background: var(--primary); border-radius: 5px;"></div>
            </div>
            <div>${completedCount}/${totalLessons} pelajaran selesai (${percentage}%)</div>
        `;
    }
    
    updateProgressDisplay();
    
    startLessonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonId = this.getAttribute('data-lesson');
            startLesson(lessonId);
        });
    });
    
    function startLesson(lessonId) {
        currentLesson = lessonId;
        currentStepIndex = 0;
        
        userProgress.currentLesson = lessonId;
        userProgress.currentStep = 0;
        saveProgress();
        
        const lesson = lessonsData[lessonId];
        lessonTitle.textContent = lesson.title;
        totalStepsSpan.textContent = lesson.steps.length;
        
        learningPathList.style.display = 'none';
        lessonContainer.style.display = 'block';
        
        loadCurrentStep();
    }
    
    function loadCurrentStep() {
        const lesson = lessonsData[currentLesson];
        const step = lesson.steps[currentStepIndex];
        
        currentStepSpan.textContent = currentStepIndex + 1;
        explanationText.innerHTML = step.explanation;
        
        const codeBlock = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.textContent = step.code;
        codeBlock.appendChild(codeElement);
        
        lessonCodeExample.innerHTML = '';
        lessonCodeExample.appendChild(codeBlock);
        
        prevStepBtn.disabled = currentStepIndex === 0;
        
        if (currentStepIndex === lesson.steps.length - 1) {
            nextStepBtn.style.display = 'none';
            completeLessonBtn.style.display = 'block';
            
            if (userProgress.completedLessons.includes(currentLesson)) {
                completeLessonBtn.innerHTML = '<i class="fas fa-check"></i> Pelajaran Sudah Selesai';
                completeLessonBtn.disabled = true;
            } else {
                completeLessonBtn.innerHTML = '<i class="fas fa-check"></i> Selesaikan Pelajaran';
                completeLessonBtn.disabled = false;
            }
        } else {
            nextStepBtn.style.display = 'block';
            completeLessonBtn.style.display = 'none';
        }
    }
    
    if (btnBackToList) {
        btnBackToList.addEventListener('click', function() {
            lessonContainer.style.display = 'none';
            learningPathList.style.display = 'block';
        });
    }
    
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', function() {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                userProgress.currentStep = currentStepIndex;
                saveProgress();
                loadCurrentStep();
            }
        });
    }
    
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', function() {
            const lesson = lessonsData[currentLesson];
            if (currentStepIndex < lesson.steps.length - 1) {
                currentStepIndex++;
                userProgress.currentStep = currentStepIndex;
                saveProgress();
                loadCurrentStep();
            }
        });
    }
    
    if (completeLessonBtn) {
        completeLessonBtn.addEventListener('click', function() {
            if (!userProgress.completedLessons.includes(currentLesson)) {
                userProgress.completedLessons.push(currentLesson);
                saveProgress();
                
                this.innerHTML = '<i class="fas fa-check"></i> Pelajaran Selesai!';
                this.disabled = true;
                
                setTimeout(() => {
                    lessonContainer.style.display = 'none';
                    learningPathList.style.display = 'block';
                }, 1500);
            }
        });
    }
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle dark mode';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    const codeExamples = document.querySelectorAll('.code-example');
    codeExamples.forEach(codeBlock => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="far fa-copy"></i> Salin';
        
        codeBlock.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const codeText = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                }, 2000);
            });
        });
    });
});