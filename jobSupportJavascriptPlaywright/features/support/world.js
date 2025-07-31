const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

class CustomWorld {
    constructor() {
        this.browser = null;
        this.page = null;
        this.context = null;
        this.baseUrl = 'https://backoffice-stg.tod-multiverse.com/login'; // Using a reliable test URL
        this.headless = false; // Default to headless mode as per user preference
        this.browserType = 'chromium'; // Default to chromium (Chrome)
        this.loginPage = null; // Will be initialized in step definitions
    }

    async init() {
        try {
            // Select browser type
            let browserLauncher;
            switch (this.browserType) {
                case 'firefox':
                    browserLauncher = firefox;
                    break;
                case 'webkit':
                    browserLauncher = webkit;
                    break;
                case 'chromium':
                default:
                    browserLauncher = chromium;
                    break;
            }

            const launchOptions = {
                headless: this.headless,
                slowMo: this.headless ? 1000 : 5000, // Much longer delay in headed mode
                args: [
                    '--start-maximized',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-background-timer-throttling',
                    '--disable-backgrounding-occluded-windows',
                    '--disable-renderer-backgrounding',
                    '--disable-features=TranslateUI',
                    '--disable-ipc-flooding-protection'
                ]
            };

            // Add extra options for headed mode
            if (!this.headless) {
                launchOptions.args.push('--force-device-scale-factor=1');
                launchOptions.args.push('--high-dpi-support=1');
            }

            this.browser = await browserLauncher.launch(launchOptions);
            this.context = await this.browser.newContext({
                viewport: { width: 1920, height: 1080 },
                ignoreHTTPSErrors: true
            });
            this.page = await this.context.newPage();
            console.log(`${this.browserType} browser initialized successfully`);

            // In headed mode, add extra logging and bring window to front
            if (!this.headless) {
                console.log(`Running in HEADED mode with ${this.browserType} - browser should be visible`);
                console.log('Browser window should be maximized and visible on your screen');

                // Try to bring the window to front
                try {
                    await this.page.bringToFront();
                } catch (e) {
                    console.log('Could not bring window to front, but browser should still be visible');
                }
            }
        } catch (error) {
            console.error('Failed to initialize browser:', error.message);
            throw error;
        }
    }

    async cleanup() {
        try {
            // Add a shorter delay before cleanup in headed mode so user can see the browser
            if (!this.headless) {
                console.log('Keeping browser open for 5 seconds in headed mode...');
                console.log('You should see the browser window on your screen now!');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }

            // Close resources with timeout protection
            const closeWithTimeout = async (resource, name) => {
                try {
                    if (resource) {
                        await Promise.race([
                            resource.close(),
                            new Promise((_, reject) =>
                                setTimeout(() => reject(new Error(`${name} close timeout`)), 5000)
                            )
                        ]);
                    }
                } catch (error) {
                    console.log(`Warning: Could not close ${name}:`, error.message);
                }
            };

            await closeWithTimeout(this.page, 'page');
            await closeWithTimeout(this.context, 'context');
            await closeWithTimeout(this.browser, 'browser');

            console.log('Browser cleanup completed');
        } catch (error) {
            console.error('Error during cleanup:', error.message);
        }
    }
}

setWorldConstructor(CustomWorld); 