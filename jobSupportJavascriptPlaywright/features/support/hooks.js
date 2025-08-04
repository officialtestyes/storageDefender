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
        // Simple delay in headed mode
        if (!this.headless) {
            console.log('Test completed. Browser will stay open for 3 seconds...');
            console.log('Look for the browser window on your screen!');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Simple cleanup with timeout protection
        await Promise.race([
            this.cleanup(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Cleanup timeout')), 10000)
            )
        ]);

    } catch (error) {
        console.error('Error in After hook:', error.message);

        // Force cleanup with individual error handling
        const cleanupPromises = [];

        if (this.page) {
            cleanupPromises.push(
                this.page.close().catch(e => console.log('Page close error:', e.message))
            );
        }

        if (this.context) {
            cleanupPromises.push(
                this.context.close().catch(e => console.log('Context close error:', e.message))
            );
        }

        if (this.browser) {
            cleanupPromises.push(
                this.browser.close().catch(e => console.log('Browser close error:', e.message))
            );
        }

        // Wait for all cleanup operations with a timeout
        if (cleanupPromises.length > 0) {
            await Promise.race([
                Promise.all(cleanupPromises),
                new Promise(resolve => setTimeout(resolve, 5000))
            ]);
        }
    }
});

AfterAll(async function () {
    console.log('All tests completed');
}); 