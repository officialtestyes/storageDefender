const { Before, After, AfterAll } = require('@cucumber/cucumber');

Before(async function () {
    // Check if headless parameter is passed from command line
    const worldParams = this.parameters || {};
    if (worldParams.headless !== undefined) {
        this.headless = worldParams.headless;
    }

    // Check if browser type is passed from command line
    if (worldParams.browserType !== undefined) {
        this.browserType = worldParams.browserType;
    }

    await this.init();
});

After(async function (scenario) {
    try {
        // Add shorter delay in headed mode so user can see the browser
        if (!this.headless) {
            console.log('Test completed. Browser will stay open for 3 seconds...');
            console.log('Look for the browser window on your screen!');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Add timeout protection for cleanup
        await Promise.race([
            this.cleanup(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Cleanup timeout')), 15000)
            )
        ]);
    } catch (error) {
        console.error('Error in After hook:', error.message);
        // Force cleanup even if timeout occurs
        try {
            if (this.page) await this.page.close().catch(() => { });
            if (this.context) await this.context.close().catch(() => { });
            if (this.browser) await this.browser.close().catch(() => { });
        } catch (cleanupError) {
            console.error('Force cleanup error:', cleanupError.message);
        }
    }
});

AfterAll(async function () {
    console.log('All tests completed');
}); 