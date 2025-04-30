
// Auth Styles module for injecting required CSS
const AuthStyles = () => {
    const addStyles = () => {
        const existingStyle = document.getElementById('auth-styles');
        if (existingStyle) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'auth-styles';
        styleElement.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .modal-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 20px;
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
                position: relative;
            }
            
            .close {
                position: absolute;
                right: 20px;
                top: 10px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .auth-tabs {
                display: flex;
                margin-bottom: 20px;
                border-bottom: 1px solid #ddd;
            }
            
            .auth-tab {
                padding: 10px 20px;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
                opacity: 0.7;
            }
            
            .auth-tab.active {
                opacity: 1;
                border-bottom: 2px solid #9b87f5;
            }
            
            .auth-form {
                display: none;
            }
            
            .auth-form.active {
                display: block;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            .form-group input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .password-input {
                position: relative;
            }
            
            .toggle-password {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
            }
            
            .btn {
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .btn-primary {
                background-color: #9b87f5;
                color: white;
            }
            
            .btn-outline {
                background-color: transparent;
                border: 1px solid #9b87f5;
                color: #9b87f5;
                margin-left: 10px;
            }
            
            .btn-block {
                width: 100%;
            }
            
            .checkbox-group {
                display: flex;
                align-items: center;
            }
            
            .checkbox-group input {
                width: auto;
                margin-right: 10px;
            }
            
            .password-strength-meter {
                margin-top: 5px;
            }
            
            .strength-bar {
                height: 5px;
                background-color: #eee;
                border-radius: 3px;
                margin-bottom: 5px;
            }
            
            .strength-bar-progress {
                height: 100%;
                width: 0;
                border-radius: 3px;
                transition: width 0.3s, background-color 0.3s;
            }
            
            .search-container {
                margin: 20px auto;
                max-width: 800px;
                padding: 0 15px;
            }
            
            .search-wrapper {
                display: flex;
                position: relative;
            }
            
            #movieSearch {
                width: 100%;
                padding: 12px 50px 12px 15px;
                border: 2px solid #9b87f5;
                border-radius: 25px;
                font-size: 16px;
            }
            
            .search-btn {
                position: absolute;
                right: 5px;
                top: 5px;
                background-color: #9b87f5;
                color: white;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .form-error {
                color: #e74c3c;
                margin-top: 10px;
                font-size: 14px;
            }
        `;
        
        document.head.appendChild(styleElement);
    };
    
    return {
        addStyles
    };
};

export default AuthStyles;
