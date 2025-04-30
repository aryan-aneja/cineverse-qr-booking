
// Auth UI module for handling auth-related UI components
const AuthUI = (userAuth) => {
    // Update UI for logged in user
    const updateUIForLoggedInUser = (currentUser) => {
        if (!currentUser) return;
        
        const signInBtn = document.getElementById('signInBtn');
        if (signInBtn) {
            signInBtn.textContent = `Welcome, ${currentUser.name}`;
            
            // Remove existing logout button if it exists
            const existingLogoutBtn = document.getElementById('logoutBtn');
            if (existingLogoutBtn) {
                existingLogoutBtn.remove();
            }
            
            // Add logout option
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logoutBtn';
            logoutBtn.className = 'btn btn-outline';
            logoutBtn.textContent = 'Logout';
            logoutBtn.addEventListener('click', () => {
                if (userAuth.logout()) {
                    // Update UI after logout
                    if (signInBtn) {
                        signInBtn.textContent = 'Sign In';
                    }
                    
                    if (logoutBtn) {
                        logoutBtn.remove();
                    }
                    
                    alert('You have been logged out.');
                }
            });
            
            // Insert logout button after sign in button
            signInBtn.parentNode.insertBefore(logoutBtn, signInBtn.nextSibling);
        }
    };
    
    // Create sign in button if it doesn't exist
    const createSignInButton = (currentUser) => {
        const header = document.querySelector('header') || document.body.firstChild;
        const signInBtn = document.createElement('button');
        signInBtn.id = 'signInBtn';
        signInBtn.className = 'btn btn-primary';
        signInBtn.textContent = 'Sign In';
        
        // Check if user is already signed in
        if (currentUser) {
            signInBtn.textContent = `Welcome, ${currentUser.name}`;
        }
        
        // Add button to header or body
        if (header) {
            const nav = header.querySelector('nav') || header;
            nav.appendChild(signInBtn);
            
            // Add logout button if user is signed in
            if (currentUser) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'logoutBtn';
                logoutBtn.className = 'btn btn-outline';
                logoutBtn.textContent = 'Logout';
                logoutBtn.addEventListener('click', () => {
                    if (userAuth.logout()) {
                        // Update UI after logout
                        if (signInBtn) {
                            signInBtn.textContent = 'Sign In';
                        }
                        
                        if (logoutBtn) {
                            logoutBtn.remove();
                        }
                        
                        alert('You have been logged out.');
                    }
                });
                nav.appendChild(logoutBtn);
            }
        } else {
            // Create a simple header if none exists
            const newHeader = document.createElement('header');
            newHeader.className = 'site-header';
            newHeader.appendChild(signInBtn);
            
            // Add logout button if user is signed in
            if (currentUser) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'logoutBtn';
                logoutBtn.className = 'btn btn-outline';
                logoutBtn.textContent = 'Logout';
                logoutBtn.addEventListener('click', () => {
                    if (userAuth.logout()) {
                        // Update UI after logout
                        if (signInBtn) {
                            signInBtn.textContent = 'Sign In';
                        }
                        
                        if (logoutBtn) {
                            logoutBtn.remove();
                        }
                        
                        alert('You have been logged out.');
                    }
                });
                newHeader.appendChild(logoutBtn);
            }
            
            document.body.insertBefore(newHeader, document.body.firstChild);
        }
        
        return signInBtn;
    };
    
    // Create search bar if it doesn't exist
    const createSearchBar = () => {
        const mainSection = document.querySelector('main') || document.body;
        const existingSearch = document.getElementById('movieSearch');
        
        if (!existingSearch) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <div class="search-wrapper">
                    <input type="text" id="movieSearch" placeholder="Search for movies by title, genre, or language">
                    <button class="search-btn">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            `;
            
            // Insert before the first child or append
            if (mainSection.firstChild) {
                mainSection.insertBefore(searchContainer, mainSection.firstChild);
            } else {
                mainSection.appendChild(searchContainer);
            }
        }
    };
    
    return {
        updateUIForLoggedInUser,
        createSignInButton,
        createSearchBar
    };
};

export default AuthUI;
