document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav ul');
    const navLinks = document.querySelectorAll('.nav-link, .footer a[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const htmlEditor = document.getElementById('htmlEditor');
    const runHtmlButton = document.getElementById('runHtml');
    const previewFrame = document.getElementById('previewFrame');
    const exampleButtons = document.querySelectorAll('.example');
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
    
    runHtmlButton.addEventListener('click', function() {
        const htmlCode = htmlEditor.value;
        const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        
        iframeDoc.open();
        iframeDoc.write(htmlCode);
        iframeDoc.close();
    });
    
    runHtmlButton.click();
    
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exampleHTML = this.getAttribute('data-html');
            htmlEditor.value = `<!DOCTYPE html>
<html>
<head>
    <title>Contoh Praktik</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        ${exampleHTML}
    </div>
</body>
</html>`;
            runHtmlButton.click();
        });
    });
    
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
    
    const stepHeaders = document.querySelectorAll('.step-header');
    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const stepContent = this.nextElementSibling;
            const isVisible = stepContent.style.display !== 'none';
            
            stepHeaders.forEach(h => {
                if (h !== this) {
                    h.nextElementSibling.style.display = 'none';
                }
            });
            
            stepContent.style.display = isVisible ? 'none' : 'block';
        });
        
        header.nextElementSibling.style.display = 'none';
    });
    
    if (stepHeaders.length > 0) {
        stepHeaders[0].nextElementSibling.style.display = 'block';
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
    
    const darkThemeStyles = `
        .dark-theme {
            background-color: #121212;
            color: #e0e0e0;
        }
        
        .dark-theme .header,
        .dark-theme .feature-card,
        .dark-theme .path-step,
        .dark-theme .glosarium-item,
        .dark-theme .resource-card,
        .dark-theme .shortcuts-section,
        .dark-theme .cheatsheet,
        .dark-theme .practice-examples,
        .dark-theme .quick-start {
            background-color: #1e1e1e;
            color: #e0e0e0;
            border-color: #333;
        }
        
        .dark-theme .main-nav a {
            color: #e0e0e0;
        }
        
        .dark-theme .step-header h3,
        .dark-theme .section-header h2,
        .dark-theme .glosarium-category h3,
        .dark-theme .resource-card h3 {
            color: #bb86fc;
        }
        
        .dark-theme .footer {
            background-color: #0f0f0f;
        }
        
        .dark-theme .search-box input {
            background-color: #2d2d2d;
            border-color: #444;
            color: #e0e0e0;
        }
        
        .dark-theme .filter-btn {
            background-color: #333;
            color: #e0e0e0;
        }
        
        .dark-theme .filter-btn.active {
            background-color: #bb86fc;
            color: #121212;
        }
        
        .dark-theme .shortcut-item,
        .dark-theme .cheat-item,
        .dark-theme .example {
            background-color: #2d2d2d;
        }
        
        .dark-theme .shortcut-item kbd,
        .dark-theme .cheat-item code {
            background-color: #333;
            border-color: #444;
            color: #e0e0e0;
        }
        
        .dark-theme .code-editor .editor-header {
            background-color: #2d2d2d;
        }
        
        .dark-theme .preview-area h3 {
            background-color: #2d2d2d;
            color: #e0e0e0;
            border-color: #444;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = darkThemeStyles;
    document.head.appendChild(style);
    
    const progressTracker = document.createElement('div');
    progressTracker.className = 'progress-tracker';
    progressTracker.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">Menguasai: <span>0%</span></div>
    `;
    progressTracker.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 999;
        width: 200px;
        display: none;
    `;
    
    const progressBar = progressTracker.querySelector('.progress-bar');
    const progressFill = progressTracker.querySelector('.progress-fill');
    const progressText = progressTracker.querySelector('.progress-text span');
    
    progressBar.style.cssText = `
        width: 100%;
        height: 8px;
        background: #eee;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 10px;
    `;
    
    progressFill.style.cssText = `
        height: 100%;
        background: var(--primary);
        width: 0%;
        transition: width 0.5s ease;
    `;
    
    document.body.appendChild(progressTracker);
    
    const stepContents = document.querySelectorAll('.step-content');
    let completedSteps = 0;
    
    stepContents.forEach(step => {
        const checkButton = document.createElement('button');
        checkButton.className = 'step-complete-btn';
        checkButton.innerHTML = '<i class="far fa-check-circle"></i> Tandai selesai';
        checkButton.style.cssText = `
            margin-top: 20px;
            padding: 8px 16px;
            background: var(--light);
            border: 2px solid var(--primary);
            color: var(--primary);
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        
        checkButton.addEventListener('click', function() {
            if (!this.classList.contains('completed')) {
                this.classList.add('completed');
                this.innerHTML = '<i class="fas fa-check-circle"></i> Selesai dipelajari';
                this.style.background = 'var(--success)';
                this.style.color = 'white';
                this.style.borderColor = 'var(--success)';
                completedSteps++;
                updateProgress();
            }
        });
        
        step.appendChild(checkButton);
    });
    
    function updateProgress() {
        const totalSteps = stepContents.length;
        const percentage = Math.round((completedSteps / totalSteps) * 100);
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
        
        if (percentage > 0) {
            progressTracker.style.display = 'block';
        }
        
        if (percentage === 100) {
            progressTracker.innerHTML += '<div class="congrats">🎉 Selamat! Anda telah menyelesaikan semua materi!</div>';
        }
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
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;
        
        if (scrollPercent > 10 && completedSteps > 0) {
            progressTracker.style.display = 'block';
        } else {
            progressTracker.style.display = 'none';
        }
    });
});
