document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('isLoggedIn') && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }
    
    if (localStorage.getItem('isLoggedIn') && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
        return;
    }
    
    if (document.querySelector('.app-container')) {
        initIndexPage();
    }
});

function initIndexPage() {
    loadPosts();
    updateUserInfo();
    setupSearch();
    setupBottomNav();
}

function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    if (!postsContainer) return;
    
    const posts = [
        {
            id: 1,
            userName: localStorage.getItem('userName') || 'John Doe',
            userAvatar: localStorage.getItem('userAvatar') || 'https://i.pravatar.cc/45?img=1',
            userHandle: localStorage.getItem('userHandle') || '@johndoe',
            timeAgo: '2 jam yang lalu',
            title: 'Animasi Loading CSS Modern',
            description: 'Membuat animasi loading yang menarik hanya dengan CSS murni.',
            codeType: 'css',
            code: `.loader {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(#4a5fc1, #1a2a6c, #ff6b81);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
            tags: ['css', 'animation', 'loading', 'ui'],
            likes: 245,
            comments: 42,
            downloads: 189,
            isLiked: false
        },
        {
            id: 2,
            userName: 'Sarah Miller',
            userAvatar: 'https://i.pravatar.cc/45?img=8',
            userHandle: '@sarahm',
            timeAgo: '5 jam yang lalu',
            title: 'Form Validasi dengan JavaScript',
            description: 'Validasi form yang elegan dengan pesan error yang informatif.',
            codeType: 'javascript',
            code: `function validateForm(formData) {
  const errors = {};
  
  if (!formData.email) {
    errors.email = 'Email harus diisi';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Format email tidak valid';
  }
  
  if (!formData.password) {
    errors.password = 'Password harus diisi';
  } else if (formData.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}`,
            tags: ['javascript', 'form', 'validation', 'webdev'],
            likes: 189,
            comments: 31,
            downloads: 156,
            isLiked: true
        },
        {
            id: 3,
            userName: 'Mike Chen',
            userAvatar: 'https://i.pravatar.cc/45?img=12',
            userHandle: '@mikec',
            timeAgo: '1 hari yang lalu',
            title: 'Responsive Navigation Bar',
            description: 'Navbar yang sepenuhnya responsif dengan menu hamburger.',
            codeType: 'html',
            code: `<nav class="navbar">
  <div class="nav-brand">Logo</div>
  <div class="nav-menu">
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">About</a>
    <a href="#" class="nav-link">Services</a>
    <a href="#" class="nav-link">Contact</a>
  </div>
  <button class="nav-toggle">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>`,
            tags: ['html', 'css', 'navbar', 'responsive'],
            likes: 312,
            comments: 58,
            downloads: 267,
            isLiked: false
        }
    ];
    
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.dataset.id = post.id;
    
    const tagsHTML = post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('');
    
    const codeIcon = post.codeType === 'css' ? 'fa-css3-alt' : 
                     post.codeType === 'javascript' ? 'fa-js' : 'fa-code';
    
    postEl.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="${post.userAvatar}" alt="${post.userName}">
                <div class="user-info">
                    <h4>${post.userName}</h4>
                    <span>${post.userHandle} • ${post.timeAgo}</span>
                </div>
            </div>
            <div class="post-actions">
                <button class="post-action-btn"><i class="fas fa-ellipsis-h"></i></button>
            </div>
        </div>
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-description">${post.description}</p>
            <div class="post-tags">${tagsHTML}</div>
            <div class="code-preview">
                <div class="code-header">
                    <div class="code-type">
                        <i class="fab ${codeIcon}"></i>
                        <span>${post.codeType.toUpperCase()}</span>
                    </div>
                    <button class="download-btn">
                        <i class="fas fa-download"></i>
                        <span>Download</span>
                    </button>
                </div>
                <pre class="code-snippet">${post.code}</pre>
            </div>
        </div>
        <div class="post-footer">
            <div class="post-stats">
                <div class="post-stat">
                    <i class="fas fa-heart ${post.isLiked ? 'liked' : ''}"></i>
                    <span>${post.likes}</span>
                </div>
                <div class="post-stat">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </div>
                <div class="post-stat">
                    <i class="fas fa-download"></i>
                    <span>${post.downloads}</span>
                </div>
            </div>
            <div class="post-interactions">
                <button class="interaction-btn like-btn ${post.isLiked ? 'liked' : ''}">
                    <i class="fas fa-heart"></i>
                    <span>Suka</span>
                </button>
                <button class="interaction-btn comment-btn">
                    <i class="fas fa-comment"></i>
                    <span>Komentar</span>
                </button>
            </div>
        </div>
    `;
    
    const likeBtn = postEl.querySelector('.like-btn');
    const downloadBtn = postEl.querySelector('.download-btn');
    const commentBtn = postEl.querySelector('.comment-btn');
    
    likeBtn.addEventListener('click', function() {
        const isLiked = this.classList.contains('liked');
        const heartIcon = this.querySelector('i');
        const likeStat = postEl.querySelector('.post-stat .fa-heart');
        const likeCount = postEl.querySelector('.post-stat span');
        
        if (isLiked) {
            this.classList.remove('liked');
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            likeStat.classList.remove('liked');
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
        } else {
            this.classList.add('liked');
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            likeStat.classList.add('liked');
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        }
    });
    
    downloadBtn.addEventListener('click', function() {
        const postId = postEl.dataset.id;
        const downloadStat = postEl.querySelectorAll('.post-stat')[2];
        const downloadCount = downloadStat.querySelector('span');
        
        downloadStat.style.color = '#4a5fc1';
        setTimeout(() => {
            downloadStat.style.color = '';
        }, 1000);
        
        downloadCount.textContent = parseInt(downloadCount.textContent) + 1;
        
        const blob = new Blob([post.code], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code-${postId}.${post.codeType}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    commentBtn.addEventListener('click', function() {
        alert('Fitur komentar akan diimplementasikan pada versi lengkap.');
    });
    
    return postEl;
}

function updateUserInfo() {
    const userName = localStorage.getItem('userName');
    const userAvatar = localStorage.getItem('userAvatar');
    const userHandle = localStorage.getItem('userHandle');
    
    const avatarImg = document.getElementById('currentUserAvatar');
    if (avatarImg && userAvatar) {
        avatarImg.src = userAvatar;
    }
    
    const headerAvatar = document.querySelector('.user-avatar img');
    if (headerAvatar && userAvatar) {
        headerAvatar.src = userAvatar;
    }
    
    const postFormHeader = document.querySelector('.post-form-header');
    if (postFormHeader && userName) {
        const userInfo = postFormHeader.querySelector('.user-info');
        if (userInfo) {
            const nameElement = userInfo.querySelector('h4');
            const handleElement = userInfo.querySelector('span');
            
            if (nameElement) nameElement.textContent = userName;
            if (handleElement) handleElement.textContent = userHandle || `@${userName.toLowerCase().replace(/\s+/g, '')}`;
        }
    }
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    alert(`Pencarian untuk: "${query}"`);
                    this.value = '';
                }
            }
        });
    }
}

function setupBottomNav() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item:not(.add-post)');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userHandle');
        window.location.href = 'login.html';
    }
}