document.addEventListener('DOMContentLoaded', function() {
    // Login Page Functionality
    if (document.querySelector('.login-container')) {
        initLoginPage();
    }
    
    // Main App Functionality
    if (document.querySelector('.app-container')) {
        initAppPage();
    }
});

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerLink = document.getElementById('registerLink');
    const backToLogin = document.getElementById('backToLogin');
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.getElementById('registerBox');
    const togglePassword = document.getElementById('togglePassword');
    const togglePasswordReg = document.getElementById('togglePasswordReg');
    
    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    if (togglePasswordReg) {
        togglePasswordReg.addEventListener('click', function() {
            const passwordInput = document.getElementById('passwordReg');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Show register form
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        });
    }
    
    // Back to login form
    if (backToLogin) {
        backToLogin.addEventListener('click', function() {
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Simple validation
            if (!username || !password) {
                alert('Silakan isi semua field');
                return;
            }
            
            // Simulate login process
            showLoading();
            
            setTimeout(() => {
                // In a real app, you would make an API call here
                // For demo, we'll just redirect to main page
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('rememberMe', rememberMe);
                
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('usernameReg').value;
            const password = document.getElementById('passwordReg').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!fullName || !email || !username || !password || !confirmPassword) {
                alert('Silakan isi semua field');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password tidak cocok');
                return;
            }
            
            if (password.length < 8) {
                alert('Password harus minimal 8 karakter');
                return;
            }
            
            // Simulate registration process
            showLoading();
            
            setTimeout(() => {
                // In a real app, you would make an API call here
                alert('Pendaftaran berhasil! Silakan masuk dengan akun Anda.');
                
                // Switch back to login form
                registerBox.style.display = 'none';
                loginBox.style.display = 'block';
                registerForm.reset();
            }, 1500);
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            alert(`Login dengan ${platform} akan diimplementasikan pada versi lengkap.`);
        });
    });
    
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }
}

function initAppPage() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Show the app container
    document.getElementById('appContainer').style.display = 'block';
    
    // Initialize posts
    loadPosts();
    
    // Initialize modals
    initModals();
    
    // Initialize bottom navigation for mobile
    initBottomNav();
    
    // Add event listeners for posting
    initPosting();
    
    // Add search functionality
    initSearch();
}

function loadPosts() {
    const postsContainer = document.querySelector('.posts-container');
    
    // Sample posts data
    const posts = [
        {
            id: 1,
            userName: 'Alex Johnson',
            userAvatar: 'https://i.pravatar.cc/45?img=5',
            userHandle: '@alexj',
            timeAgo: '2 jam yang lalu',
            title: 'Animasi Loading CSS Modern',
            description: 'Membuat animasi loading yang menarik hanya dengan CSS murni. Cocok untuk website modern dengan performa ringan.',
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
            description: 'Validasi form yang elegan dengan pesan error yang informatif. Mendukung validasi real-time dan tampilan yang responsif.',
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
            description: 'Navbar yang sepenuhnya responsif dengan menu hamburger di perangkat mobile. Dibuat dengan HTML, CSS, dan sedikit JavaScript.',
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
    
    // Clear container
    postsContainer.innerHTML = '';
    
    // Generate post elements
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
    
    // Add event listeners for this post
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
        
        // Simulate download
        downloadStat.style.color = '#4a5fc1';
        setTimeout(() => {
            downloadStat.style.color = '';
        }, 1000);
        
        // Increment download count
        downloadCount.textContent = parseInt(downloadCount.textContent) + 1;
        
        // Create and trigger download
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

function initModals() {
    const profileBtn = document.getElementById('profileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const addPostBtn = document.querySelector('.add-post');
    const postButton = document.querySelector('.post-button');
    const addPostModal = document.getElementById('addPostModal');
    const closePostModal = document.getElementById('closePostModal');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const submitPostBtn = document.getElementById('submitPostBtn');
    
    // Profile modal
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            profileModal.style.display = 'flex';
        });
    }
    
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => {
            profileModal.style.display = 'none';
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Add post modal
    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => {
            addPostModal.style.display = 'flex';
        });
    }
    
    if (postButton) {
        postButton.addEventListener('click', () => {
            addPostModal.style.display = 'flex';
        });
    }
    
    if (closePostModal) {
        closePostModal.addEventListener('click', () => {
            addPostModal.style.display = 'none';
        });
    }
    
    if (cancelPostBtn) {
        cancelPostBtn.addEventListener('click', () => {
            addPostModal.style.display = 'none';
            document.getElementById('postTitle').value = '';
            document.getElementById('postDescription').value = '';
            document.getElementById('postCode').value = '';
            document.getElementById('postTags').value = '';
        });
    }
    
    // Code type selector
    const codeTypeBtns = document.querySelectorAll('.code-type-btn');
    codeTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            codeTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
        if (e.target === addPostModal) {
            addPostModal.style.display = 'none';
        }
    });
    
    // Submit new post
    if (submitPostBtn) {
        submitPostBtn.addEventListener('click', () => {
            const title = document.getElementById('postTitle').value;
            const description = document.getElementById('postDescription').value;
            const code = document.getElementById('postCode').value;
            const tags = document.getElementById('postTags').value;
            const codeTypeBtn = document.querySelector('.code-type-btn.active');
            const codeType = codeTypeBtn ? codeTypeBtn.textContent.toLowerCase() : 'html';
            
            if (!title || !description || !code) {
                alert('Harap isi judul, deskripsi, dan kode.');
                return;
            }
            
            // Create new post object
            const newPost = {
                id: Date.now(),
                userName: 'John Doe',
                userAvatar: 'https://i.pravatar.cc/45?img=1',
                userHandle: '@johndoe',
                timeAgo: 'Baru saja',
                title: title,
                description: description,
                codeType: codeType,
                code: code,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                likes: 0,
                comments: 0,
                downloads: 0,
                isLiked: false
            };
            
            // Add to the beginning of posts container
            const postsContainer = document.querySelector('.posts-container');
            const postElement = createPostElement(newPost);
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
            
            // Reset form and close modal
            document.getElementById('postTitle').value = '';
            document.getElementById('postDescription').value = '';
            document.getElementById('postCode').value = '';
            document.getElementById('postTags').value = '';
            addPostModal.style.display = 'none';
            
            // Show success message
            alert('Postingan berhasil ditambahkan!');
        });
    }
}

function initBottomNav() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('add-post')) {
                document.getElementById('addPostModal').style.display = 'flex';
                return;
            }
            
            if (this.classList.contains('profileBtn')) {
                document.getElementById('profileModal').style.display = 'flex';
                return;
            }
            
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would navigate to different pages
            const pageName = this.querySelector('span').textContent;
            alert(`Navigasi ke halaman: ${pageName}`);
        });
    });
}

function initPosting() {
    const postFormInput = document.querySelector('.post-form-input input');
    
    if (postFormInput) {
        postFormInput.addEventListener('focus', function() {
            document.getElementById('addPostModal').style.display = 'flex';
        });
    }
}

function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    alert(`Pencarian untuk: "${query}"\nFitur pencarian lengkap akan diimplementasikan pada versi selanjutnya.`);
                    this.value = '';
                }
            }
        });
    }
}

function showLoading() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Memproses...</p>
    `;
    
    // Add styles for loading overlay
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
    
    // Remove loading after 1.5 seconds
    setTimeout(() => {
        if (loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 1500);
}