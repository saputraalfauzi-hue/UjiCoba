document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.post-form-container')) {
        initPostPage();
    }
});

function initPostPage() {
    updateUserInfo();
    setupCodeTypeSelector();
    setupCharCounter();
    setupPreview();
    setupFormSubmission();
}

function updateUserInfo() {
    const userName = localStorage.getItem('userName') || 'John Doe';
    const userAvatar = localStorage.getItem('userAvatar') || 'https://i.pravatar.cc/150?img=1';
    const userHandle = localStorage.getItem('userHandle') || '@johndoe';
    
    document.getElementById('previewUserName').textContent = userName;
    document.getElementById('previewUserHandle').textContent = userHandle + ' • Baru saja';
    document.getElementById('previewAvatar').src = userAvatar;
}

function setupCodeTypeSelector() {
    const codeTypeBtns = document.querySelectorAll('.code-type-btn');
    codeTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            codeTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updatePreview();
        });
    });
}

function setupCharCounter() {
    const codeTextarea = document.getElementById('postCode');
    const charCount = document.getElementById('charCount');
    
    if (codeTextarea && charCount) {
        codeTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count} karakter`;
            updatePreview();
        });
    }
    
    const titleInput = document.getElementById('postTitle');
    const descInput = document.getElementById('postDescription');
    const tagsInput = document.getElementById('postTags');
    
    if (titleInput) titleInput.addEventListener('input', updatePreview);
    if (descInput) descInput.addEventListener('input', updatePreview);
    if (tagsInput) tagsInput.addEventListener('input', updatePreview);
}

function updatePreview() {
    const title = document.getElementById('postTitle').value || 'Judul Kode';
    const description = document.getElementById('postDescription').value || 'Deskripsi kode akan muncul di sini...';
    const code = document.getElementById('postCode').value || '// Kode Anda akan muncul di sini...';
    const tags = document.getElementById('postTags').value;
    
    const activeCodeType = document.querySelector('.code-type-btn.active');
    const codeType = activeCodeType ? activeCodeType.dataset.type.toUpperCase() : 'HTML';
    
    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewDescription').textContent = description;
    document.getElementById('previewCode').textContent = code;
    document.getElementById('previewCodeType').textContent = codeType;
    
    const tagsContainer = document.getElementById('previewTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            tagArray.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'post-tag';
                tagElement.textContent = '#' + tag;
                tagsContainer.appendChild(tagElement);
            });
        }
    }
    
    const codeIcon = document.querySelector('.code-type i');
    if (codeIcon) {
        const type = codeType.toLowerCase();
        if (type === 'css') codeIcon.className = 'fab fa-css3-alt';
        else if (type === 'javascript' || type === 'js') codeIcon.className = 'fab fa-js';
        else codeIcon.className = 'fas fa-code';
    }
}

function setupPreview() {
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            updatePreview();
            const previewSection = document.getElementById('postPreview');
            previewSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function setupFormSubmission() {
    const submitBtn = document.getElementById('submitPostBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const title = document.getElementById('postTitle').value;
            const description = document.getElementById('postDescription').value;
            const code = document.getElementById('postCode').value;
            const tags = document.getElementById('postTags').value;
            const visibility = document.getElementById('postVisibility').value;
            const activeCodeType = document.querySelector('.code-type-btn.active');
            const codeType = activeCodeType ? activeCodeType.dataset.type : 'html';
            
            if (!title || !code) {
                alert('Judul dan kode harus diisi.');
                return;
            }
            
            if (title.length > 100) {
                alert('Judul maksimal 100 karakter.');
                return;
            }
            
            showLoading();
            
            setTimeout(() => {
                alert('Postingan berhasil dibuat!');
                window.location.href = 'index.html';
            }, 1500);
        });
    }
}

function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Memposting kode...</p>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f0f0f0;
            border-top: 5px solid #4a5fc1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        if (loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 1500);
}