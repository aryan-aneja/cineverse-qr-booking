
// User authentication module for handling login/registration
const UserAuth = () => {
    let currentUser = null;
    
    // Check if a user is already logged in
    const checkExistingUser = () => {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                return currentUser;
            }
        } catch (e) {
            console.error('Error checking existing user:', e);
        }
        return null;
    };
    
    // Log user out
    const logout = () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        return true;
    };
    
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    const validatePassword = (password) => {
        return password.length >= 6;
    };
    
    // Process sign in form submission
    const processSignIn = (email, password) => {
        if (!validateEmail(email) || !password) {
            return { success: false, error: 'Invalid email or missing password' };
        }
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Save user info
            currentUser = { email: user.email, name: user.name };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            return { success: true, user: currentUser };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    };
    
    // Process sign up form submission
    const processSignUp = (name, email, phone, password, termsAccepted) => {
        if (!name || !email || !phone || !password) {
            return { success: false, error: 'Please fill in all fields' };
        }
        
        if (!validateEmail(email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }
        
        if (!validatePassword(password)) {
            return { success: false, error: 'Password must be at least 6 characters long' };
        }
        
        if (!termsAccepted) {
            return { success: false, error: 'Please agree to the Terms & Conditions' };
        }
        
        // Store user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            return { success: false, error: 'Email already registered' };
        }
        
        // Add new user
        users.push({ name, email, phone, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        return { success: true };
    };

    // Get current user
    const getCurrentUser = () => currentUser;
    
    return {
        checkExistingUser,
        logout,
        processSignIn,
        processSignUp,
        validateEmail,
        validatePassword,
        getCurrentUser
    };
};

export default UserAuth;
