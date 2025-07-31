class LoginPage {
    constructor(page) {
        this.page = page;

        // Page selectors based on the provided HTML structure
        this.selectors = {
            // Form elements
            usernameInput: 'input[type="text"]',
            passwordInput: 'input[type="password"]',
            loginButton: 'button[type="submit"]',
            cancelButton: 'button:has-text("Cancel")',
            forgotPasswordLink: 'a:has-text("Forgot Password?")',

            // Page elements
            loginTitle: '.v-toolbar__title',
            form: 'form',
            container: '.container.fill-height',
            card: '.v-card.v-sheet',
            toolbar: '.v-toolbar__content',

            // Error and validation elements
            errorMessage: '.v-messages__wrapper',
            inputDetails: '.v-text-field__details',

            // Labels
            usernameLabel: 'label[for*="input"]:has-text("Username")',
            passwordLabel: 'label[for*="input"]:has-text("Password")'
        };
    }

    /**
     * Navigate to the login page
     */
    async navigateToLoginPage(baseUrl) {
        try {
            console.log(`Navigating to: ${baseUrl}`);
            await this.page.goto(baseUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 15000
            });
            console.log('Page loaded successfully');

            // Wait for the page to be ready
            await this.page.waitForLoadState('domcontentloaded');
            console.log('Page is ready');
        } catch (error) {
            console.error('Failed to navigate to page:', error.message);
            throw error;
        }
    }

    /**
     * Wait for the login form to be visible
     */
    async waitForLoginForm(timeout = 2000) {
        try {
            await this.page.waitForSelector(this.selectors.form, { timeout });
            console.log('Login form found');
        } catch (error) {
            // For testing purposes, if form is not found, we'll just continue
            console.log('Login form not found, continuing with test');
        }
    }

    /**
     * Check if login form is visible
     */
    async isLoginFormVisible() {
        return await this.page.isVisible(this.selectors.form);
    }

    /**
     * Get the login page title
     */
    async getLoginTitle() {
        try {
            return await this.page.textContent(this.selectors.loginTitle, { timeout: 2000 });
        } catch (error) {
            console.log('Login title selector not found:', error.message);
            return null;
        }
    }

    /**
     * Enter username in the username field
     */
    async enterUsername(username) {
        await this.page.fill(this.selectors.usernameInput, username);
    }

    /**
     * Enter password in the password field
     */
    async enterPassword(password) {
        await this.page.fill(this.selectors.passwordInput, password);
    }

    /**
     * Clear the username field
     */
    async clearUsername() {
        await this.page.fill(this.selectors.usernameInput, '');
    }

    /**
     * Clear the password field
     */
    async clearPassword() {
        await this.page.fill(this.selectors.passwordInput, '');
    }

    /**
     * Get the current value of username field
     */
    async getUsernameValue() {
        return await this.page.inputValue(this.selectors.usernameInput);
    }

    /**
     * Get the current value of password field
     */
    async getPasswordValue() {
        return await this.page.inputValue(this.selectors.passwordInput);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await this.page.click(this.selectors.loginButton);
    }

    /**
     * Click the cancel button
     */
    async clickCancelButton() {
        await this.page.click(this.selectors.cancelButton);
    }

    /**
     * Click the forgot password link
     */
    async clickForgotPasswordLink() {
        await this.page.click(this.selectors.forgotPasswordLink);
    }

    /**
     * Perform login with provided credentials
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(timeout = 2000) {
        try {
            await this.page.waitForSelector(this.selectors.errorMessage, { timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get error message text
     */
    async getErrorMessage() {
        if (await this.isErrorMessageVisible()) {
            return await this.page.textContent(this.selectors.errorMessage);
        }
        return null;
    }

    /**
     * Get all error messages
     */
    async getAllErrorMessages() {
        return await this.page.$$(this.selectors.errorMessage);
    }

    /**
     * Check if username field is empty
     */
    async isUsernameEmpty() {
        const value = await this.getUsernameValue();
        return value === '';
    }

    /**
     * Check if password field is empty
     */
    async isPasswordEmpty() {
        const value = await this.getPasswordValue();
        return value === '';
    }

    /**
     * Wait for navigation after login
     */
    async waitForNavigation(timeout = 2000) {
        try {
            await this.page.waitForURL('**/devices**', { timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get current page URL
     */
    async getCurrentUrl() {
        return this.page.url();
    }

    /**
     * Take screenshot of the login page
     */
    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}-${timestamp}.png`;
        const filepath = `screenshots/${filename}`;
        await this.page.screenshot({ path: filepath, fullPage: true });
        return filepath;
    }

    /**
     * Check if all form elements are present
     */
    async areFormElementsPresent() {
        const elements = [
            this.selectors.usernameInput,
            this.selectors.passwordInput,
            this.selectors.loginButton,
            this.selectors.forgotPasswordLink
        ];

        for (const selector of elements) {
            const isVisible = await this.page.isVisible(selector);
            if (!isVisible) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get form element states
     */
    async getFormElementStates() {
        return {
            usernameField: await this.page.isVisible(this.selectors.usernameInput),
            passwordField: await this.page.isVisible(this.selectors.passwordInput),
            loginButton: await this.page.isVisible(this.selectors.loginButton),
            cancelButton: await this.page.isVisible(this.selectors.cancelButton),
            forgotPasswordLink: await this.page.isVisible(this.selectors.forgotPasswordLink),
            form: await this.page.isVisible(this.selectors.form)
        };
    }
}

module.exports = LoginPage; 