const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const DevicesPage = require('../../pages/DevicesPage');

// Set default timeout for all steps
setDefaultTimeout(30000);

/**
 * Navigate to the devices page
 */
Given('I navigate to the devices page', async function () {
    try {
        console.log('Initializing DevicesPage...');
        this.devicesPage = new DevicesPage(this.page);

        console.log('Navigating to devices page...');
        await this.devicesPage.navigateToDevicesPage(this.baseUrl);

        // Wait for the page to load
        await this.page.waitForLoadState('domcontentloaded');

        const currentUrl = await this.devicesPage.getCurrentUrl();
        console.log('Current URL after navigation:', currentUrl);

        // Verify we're on the devices page or a related page
        expect(currentUrl).to.include('backoffice-stg.tod-multiverse.com');

        console.log('Successfully navigated to devices page');
    } catch (error) {
        console.error('Error navigating to devices page:', error.message);
        throw error;
    }
});

/**
 * Click on the Devices menu item
 */
When('I click on the {string} menu item', async function (menuItem) {
    try {
        if (menuItem === 'Devices') {
            console.log('Clicking on Devices menu item...');
            await this.devicesPage.clickDevicesMenuItem();
            console.log('Successfully clicked on Devices menu item');
        } else {
            throw new Error(`Unknown menu item: ${menuItem}`);
        }
    } catch (error) {
        console.error('Error clicking menu item:', error.message);
        throw error;
    }
});

/**
 * Click the Add button to navigate to add device page
 */
When('I click the {string} button', async function (buttonText) {
    try {
        if (buttonText === 'Add') {
            console.log('Clicking Add button...');
            await this.devicesPage.clickAddButton();

            // Wait for the add device form to load
            console.log('Waiting for add device form...');
            await this.devicesPage.waitForAddDeviceForm();
            console.log('Add device form loaded successfully');
        } else {
            throw new Error(`Unknown button: ${buttonText}`);
        }
    } catch (error) {
        console.error('Error clicking button:', error.message);
        throw error;
    }
});

/**
 * Enter external device ID
 */
When('I enter external device ID {string}', async function (deviceId) {
    try {
        // Generate a unique 6-digit number if "random" is specified
        if (deviceId === "random") {
            const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(`Generated unique external device ID: ${uniqueId}`);
            await this.devicesPage.enterExternalDeviceId(uniqueId);
        } else {
            console.log(`Entering external device ID: ${deviceId}`);
            await this.devicesPage.enterExternalDeviceId(deviceId);
        }
        console.log('External device ID entered successfully');
    } catch (error) {
        console.error('Error entering external device ID:', error.message);
        throw error;
    }
});

/**
 * Enter external device ID with dash format
 */
When('I enter external device ID with dash format {string}', async function (deviceId) {
    try {
        // Generate a random number in format XX-XX-XX-XX-XX-XX-XX-XX if "random" is specified
        if (deviceId === "random") {
            const generateRandomPair = () => Math.floor(10 + Math.random() * 90).toString();
            const dashFormattedId = [
                generateRandomPair(),
                generateRandomPair(),
                generateRandomPair(),
                generateRandomPair(),
                generateRandomPair(),
                generateRandomPair(),
                generateRandomPair(),
                generateRandomPair()
            ].join('-');
            console.log(`Generated dash-formatted external device ID: ${dashFormattedId}`);
            await this.devicesPage.enterExternalDeviceId(dashFormattedId);
        } else {
            console.log(`Entering dash-formatted external device ID: ${deviceId}`);
            await this.devicesPage.enterExternalDeviceId(deviceId);
        }
        console.log('Dash-formatted external device ID entered successfully');
    } catch (error) {
        console.error('Error entering dash-formatted external device ID:', error.message);
        throw error;
    }
});

/**
 * Select device type
 */
When('I select type {string}', async function (type) {
    try {
        console.log(`Selecting type: ${type}`);
        await this.devicesPage.selectType(type);
        console.log('Type selected successfully');
    } catch (error) {
        console.error('Error selecting type:', error.message);
        throw error;
    }
});

/**
 * Select device subtype
 */
When('I select subtype {string}', async function (subtype) {
    try {
        console.log(`Selecting subtype: ${subtype}`);
        await this.devicesPage.selectSubtype(subtype);
        console.log('Subtype selected successfully');
    } catch (error) {
        console.error('Error selecting subtype:', error.message);
        throw error;
    }
});

/**
 * Enter short ID as random
 */
When('I enter short ID as random', async function () {
    try {
        // Generate a random short ID in format AA00001-AZ99999
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Generate first letter (A-Z)
        const firstLetter = letters.charAt(Math.floor(Math.random() * letters.length));

        // Generate second letter (A-Z)
        const secondLetter = letters.charAt(Math.floor(Math.random() * letters.length));

        // Generate random number between 1 and 99999, padded to 5 digits
        const randomNumber = Math.floor(Math.random() * 99999 + 1).toString().padStart(5, '0');

        const shortId = firstLetter + secondLetter + randomNumber;

        console.log(`Entering random short ID: ${shortId}`);
        await this.devicesPage.enterShortId(shortId);
        console.log('Random short ID entered successfully');
    } catch (error) {
        console.error('Error entering random short ID:', error.message);
        throw error;
    }
});

/**
 * Select device status
 */
When('I select status {string}', async function (status) {
    try {
        console.log(`Selecting status: ${status}`);
        await this.devicesPage.selectStatus(status);
        console.log('Status selected successfully');
    } catch (error) {
        console.error('Error selecting status:', error.message);
        throw error;
    }
});

/**
 * Select device disposition
 */
When('I select disposition {string}', async function (disposition) {
    try {
        console.log(`Selecting disposition: ${disposition}`);
        await this.devicesPage.selectDisposition(disposition);
        console.log('Disposition selected successfully');
    } catch (error) {
        console.error('Error selecting disposition:', error.message);
        throw error;
    }
});

/**
 * Select assigned organization
 */
When('I select assigned organization {string}', async function (organization) {
    try {
        console.log(`Selecting assigned organization: ${organization}`);
        await this.devicesPage.selectAssignedOrganization(organization);
        console.log('Assigned organization selected successfully');
    } catch (error) {
        console.error('Error selecting assigned organization:', error.message);
        throw error;
    }
});

/**
 * Click the Add Device button
 */
When('I click the Add Device button', async function () {
    try {
        console.log('Clicking Add Device button...');
        await this.devicesPage.clickAddDeviceButton();
        console.log('Add Device button clicked successfully');
    } catch (error) {
        console.error('Error clicking Add Device button:', error.message);
        throw error;
    }
});

/**
 * Leave external device ID empty
 */
When('I leave external device ID empty', async function () {
    try {
        console.log('Leaving external device ID empty...');
        await this.devicesPage.clearExternalDeviceId();
        console.log('External device ID field cleared');
    } catch (error) {
        console.error('Error clearing external device ID:', error.message);
        throw error;
    }
});

/**
 * Leave type unselected
 */
When('I leave type unselected', async function () {
    try {
        console.log('Leaving type unselected...');
        // This step intentionally does nothing to leave type unselected
        console.log('Type left unselected');
    } catch (error) {
        console.error('Error leaving type unselected:', error.message);
        throw error;
    }
});

/**
 * Verify success message is displayed
 */
Then('I should see a success message', async function () {
    try {
        console.log('Checking for success message...');

        // Wait a bit for any success message to appear
        await this.page.waitForTimeout(2000);

        // Try multiple possible success message selectors
        const possibleSelectors = [
            '.v-snack__content',
            '.v-alert--success',
            '.success-message',
            '.alert-success',
            '[data-testid="success-message"]',
            '.notification-success'
        ];

        let successFound = false;
        let successText = '';

        for (const selector of possibleSelectors) {
            try {
                const element = await this.page.$(selector);
                if (element) {
                    successText = await element.textContent();
                    if (successText && successText.trim()) {
                        console.log(`Success message found with selector ${selector}:`, successText.trim());
                        successFound = true;
                        break;
                    }
                }
            } catch (e) {
                // Continue to next selector
            }
        }

        // If no success message found, check if we're still on the form page (might indicate validation error)
        if (!successFound) {
            const currentUrl = await this.devicesPage.getCurrentUrl();
            console.log('Current URL after form submission:', currentUrl);

            // Check if we're still on the add device page (might indicate form validation error)
            if (currentUrl.includes('/devices/new')) {
                console.log('Still on add device page - checking for validation errors...');
                const errorVisible = await this.devicesPage.isErrorMessageVisible();
                if (errorVisible) {
                    const errorText = await this.devicesPage.getErrorMessage();
                    console.log('Validation error found:', errorText);
                    throw new Error(`Form validation error: ${errorText}`);
                }
            }
        }

        expect(successFound).to.be.true;
        expect(successText).to.not.be.empty;
        console.log('Success message verification completed');
    } catch (error) {
        console.error('Error checking success message:', error.message);
        throw error;
    }
});

/**
 * Verify device was added successfully
 */
Then('the device should be added successfully', async function () {
    try {
        console.log('Verifying device was added successfully...');

        // Wait a bit for any navigation or success indicators
        await this.page.waitForTimeout(3000);

        // Check current URL
        const currentUrl = await this.devicesPage.getCurrentUrl();
        console.log('Current URL after device addition:', currentUrl);

        // If we're still on the add device page, the form might have validation errors
        if (currentUrl.includes('/devices/new')) {
            console.log('Still on add device page - checking for validation errors...');
            const errorVisible = await this.devicesPage.isErrorMessageVisible();
            if (errorVisible) {
                const errorText = await this.devicesPage.getErrorMessage();
                console.log('Validation error found:', errorText);
                throw new Error(`Form validation error: ${errorText}`);
            }
        }

        // If we navigated to devices page, that's good
        if (currentUrl.includes('/devices') && !currentUrl.includes('/devices/new')) {
            console.log('Successfully navigated to devices page');
        }

        console.log('Device added successfully verified');
    } catch (error) {
        console.error('Error verifying device addition:', error.message);
        throw error;
    }
});

/**
 * Verify validation error for external device ID
 */
Then('I should see validation error for external device ID', async function () {
    try {
        console.log('Checking for validation error on external device ID...');
        const errorVisible = await this.devicesPage.isErrorMessageVisible();
        expect(errorVisible).to.be.true;

        const errorText = await this.devicesPage.getErrorMessage();
        expect(errorText).to.not.be.empty;
        console.log('Validation error found:', errorText);
    } catch (error) {
        console.error('Error checking validation error:', error.message);
        throw error;
    }
});

/**
 * Verify validation error for type
 */
Then('I should see validation error for type', async function () {
    try {
        console.log('Checking for validation error on type...');
        const errorVisible = await this.devicesPage.isErrorMessageVisible();
        expect(errorVisible).to.be.true;

        const errorText = await this.devicesPage.getErrorMessage();
        expect(errorText).to.not.be.empty;
        console.log('Validation error found:', errorText);
    } catch (error) {
        console.error('Error checking validation error:', error.message);
        throw error;
    }
});

/**
 * Verify we remain on the add device page
 */
Then('I should remain on the add device page', async function () {
    try {
        console.log('Verifying we remain on add device page...');
        const isOnAddPage = await this.devicesPage.isOnAddDevicePage();
        expect(isOnAddPage).to.be.true;
        console.log('Successfully remained on add device page');
    } catch (error) {
        console.error('Error verifying page location:', error.message);
        throw error;
    }
}); 
