document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.profile-content')) {
        initProfilePage();
    }
});

function initProfilePage() {
    loadUserData();
    setupTabs();
    setupEditModal();
    loadUserPosts();
}

function loadUserData() {
    const userName = localStorage.getItem('userName') || 'John Doe';
    const userAvatar = localStorage.getItem('userAvatar') || 'https://i.pravatar.cc/150?img=1';
    const userHandle = localStorage.getItem('userHandle') || '@johndoe';
    
    document.getElementById('profileName').textContent = userName;
    document.getElementById('profileUsername').textContent = userHandle;
    document.getElementById('profileAvatar').src = userAvatar;
    
    document.getElementById('editName').value = userName;
    document.getElementById('editUsername').value = userHandle;
    document.getElementById('editAvatarPreview').src = userAvatar;
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + 'Tab') {
                    content.classList.add('active');
                }
            });
        });
    });
}

function setupEditModal() {
    const editBtn = document.getElementById('editProfileBtn');
    const closeBtn = document.getElementById('closeEditModal');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const modal = document.getElementById('editProfileModal');
    const avatarInput = document.getElementById('editAvatarInput');
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
    }
    
    const closeModal = () => {
        modal.style.display = 'none';
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    if (avatarInput) {
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('editAvatarPreview').src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const newName = document.getElementById('editName').value;
            const newUsername = document.getElementById('editUsername').value;
            const newBio = document.getElementById('editBio').value;
            const newLocation = document.getElementById('editLocation').value;
            const newAvatar = document.getElementById('editAvatarPreview').src;
            
            if (!newName || !newUsername) {
                alert('Nama dan username harus diisi.');
                return;
            }
            
            localStorage.setItem('userName', newName);
            localStorage.setItem('userHandle', newUsername);
            localStorage.setItem('userAvatar', newAvatar);
            
            document.getElementById('profileName').textContent = newName;
            document.getElementById('profileUsername').textContent = newUsername;
            document.getElementById('profileAvatar').src = newAvatar;
            document.getElementById('profileBio').textContent = newBio || 'Frontend Developer dengan passion untuk membuat kode yang bersih dan efisien.';
            
            const avatarImages = document.querySelectorAll('img[src*="pravatar"]');
            avatarImages.forEach(img => {
                if (img.id === 'currentUserAvatar' || img.id === 'profileAvatar') {
                    img.src = newAvatar;
                }
            });
            
            closeModal();
            
            alert('Profil berhasil diperbarui!');
        });
    }
}

function loadUserPosts() {
    const postsContainer = document.getElementById('userPostsContainer');
    if (!postsContainer) return;
    
    const userPosts = [
        {
            id: 1,
            title: 'CSS Grid Layout System',
            description: 'Membuat sistem layout modern dengan CSS Grid.',
            codeType: 'css',
            tags: ['css', 'grid', 'layout'],
            likes: 156,
            comments: 24,
            downloads: 89
        },
        {
            id: 2,
            title: 'JavaScript Form Validation',
            description: 'Validasi form client-side dengan JavaScript murni.',
            codeType: 'javascript',
            tags: ['javascript', 'form', 'validation'],
            likes: 98,
            comments: 18,
            downloads: 67
        },
        {
            id: 3,
            title: 'Responsive Navigation',
            description: 'Navbar responsif dengan menu hamburger.',
            codeType: 'html',
            tags: ['html', 'css', 'responsive'],
            likes: 204,
            comments: 35,
            downloads: 112
        }
    ];
    
    postsContainer.innerHTML = '';
    
    userPosts.forEach(post => {
        const postElement = createUserPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

function createUserPostElement(post) {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    
    const tagsHTML = post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('');
    
    postEl.innerHTML = `
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-description">${post.description}</p>
            <div class="post-tags">${tagsHTML}</div>
            <div class="post-footer">
                <div class="post-stats">
                    <div class="post-stat">
                        <i class="fas fa-heart"></i>
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
                <div class="post-actions">
                    <button class="post-action-btn"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            </div>
        </div>
    `;
    
    return postEl;
}