
// Authentication module
import UserAuth from './auth/userAuth.js';
import AuthUI from './auth/authUI.js';
import ModalManager from './auth/modalManager.js';
import SearchManager from './auth/searchManager.js';
import AuthStyles from './auth/styles.js';
import TicketHelper from './auth/ticketHelper.js';

const Auth = (() => {
    // Initialize modules
    const userAuth = UserAuth();
    const authUI = AuthUI(userAuth);
    const modalManager = ModalManager(userAuth);
    const searchManager = SearchManager();
    const authStyles = AuthStyles();
    const ticketHelper = TicketHelper();
    
    // DOM elements
    const initAuthElements = () => {
        // Initialize elements only after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Add required styles
            authStyles.addStyles();
            
            // Check for existing user
            const currentUser = userAuth.checkExistingUser();
            if (currentUser) {
                authUI.updateUIForLoggedInUser(currentUser);
            }
            
            // Setup event listeners
            setupEventListeners();
            
            // Setup search
            authUI.createSearchBar();
            searchManager.setupSearch();
        });
    };
    
    const setupEventListeners = () => {
        // Sign In button functionality
        const signInBtn = document.getElementById('signInBtn');
        const signInModal = document.getElementById('signInModal');
        
        if (signInBtn) {
            signInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const currentUser = userAuth.getCurrentUser();
                if (currentUser) {
                    // User is already signed in, do nothing or show profile
                    return;
                }
                
                if (signInModal) {
                    signInModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    // Create and initialize modal
                    modalManager.initializeModal(
                        authUI.updateUIForLoggedInUser,
                        closeModal
                    );
                }
            });
        } else {
            // Create button if it doesn't exist
            const button = authUI.createSignInButton(userAuth.getCurrentUser());
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const currentUser = userAuth.getCurrentUser();
                if (currentUser) {
                    // User is already signed in, do nothing or show profile
                    return;
                }
                
                const modal = document.getElementById('signInModal');
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    // Create and initialize modal
                    modalManager.initializeModal(
                        authUI.updateUIForLoggedInUser,
                        closeModal
                    );
                }
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('signInModal');
            if (e.target === modal) {
                closeModal('signInModal');
            }
        });
    };
    
    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Return public API
    return {
        initAuthElements,
        getCurrentUser: userAuth.getCurrentUser,
        downloadTicket: ticketHelper.downloadTicket
    };
})();

export default Auth;
