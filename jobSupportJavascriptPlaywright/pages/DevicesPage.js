class DevicesPage {
    constructor(page) {
        this.page = page;

        // Page selectors based on the provided HTML structure
        this.selectors = {
            // Navigation elements
            devicesMenuItem: 'div.v-list-item__content:has-text("Devices")',
            addButton: 'a[href="/devices/new"]',

            // Form elements - using more robust selectors that don't rely on specific IDs
            externalDeviceIdInput: 'input[type="text"][autofocus]',
            shortIdInput: 'input[type="text"]',
            typeSelect: 'div.v-select:has(label:has-text("Type"))',
            typeInput: 'input[readonly][type="text"]',
            subtypeSelect: 'div.v-select:has(label:has-text("Subtype"))',
            subtypeInput: 'input[readonly][type="text"]',
            statusSelect: 'div.v-select:has(label:has-text("Status"))',
            statusInput: 'input[readonly][type="text"]',
            dispositionSelect: 'div.v-select:has(label:has-text("Disposition"))',
            dispositionInput: 'input[readonly][type="text"]',
            assignedOrgSelect: 'div.v-select:has(label:has-text("Assigned Organization"))',
            assignedOrgInput: 'input[readonly][type="text"]',

            // Buttons
            addDeviceButton: 'button[type="submit"]:has-text("Add Device")',
            cancelButton: 'button:has-text("Cancel")',

            // Messages
            successMessage: '.v-snack__content',
            errorMessage: '.v-messages__wrapper',

            // Page elements
            pageTitle: '.v-toolbar__title',
            form: 'form'
        };
    }

    /**
     * Navigate to the devices page
     */
    async navigateToDevicesPage(baseUrl) {
        try {
            const devicesUrl = `${baseUrl}/devices`;
            console.log(`Navigating to: ${devicesUrl}`);
            await this.page.goto(devicesUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 15000
            });
            console.log('Devices page loaded successfully');
        } catch (error) {
            console.error('Failed to navigate to devices page:', error.message);
            throw error;
        }
    }

    /**
     * Click on the Devices menu item
     */
    async clickDevicesMenuItem() {
        await this.page.click(this.selectors.devicesMenuItem);
    }

    /**
     * Click the Add button to navigate to add device page
     */
    async clickAddButton() {
        try {
            console.log('Clicking Add button to navigate to add device page...');
            await this.page.waitForSelector(this.selectors.addButton, { timeout: 2000 });
            await this.page.click(this.selectors.addButton);

            // Wait for navigation to complete
            await this.page.waitForLoadState('domcontentloaded');

            // Verify we're on the add device page
            const currentUrl = await this.getCurrentUrl();
            console.log('Current URL after clicking Add button:', currentUrl);

            if (!currentUrl.includes('/devices/new')) {
                console.log('Warning: Not on add device page, but continuing...');
            }

            console.log('Add button clicked successfully');
        } catch (error) {
            console.error('Error clicking Add button:', error.message);
            throw error;
        }
    }

    /**
 * Wait for the add device form to be visible
 */
    async waitForAddDeviceForm(timeout = 10000) {
        try {
            // Wait for the form to be present
            await this.page.waitForSelector(this.selectors.form, { timeout });

            // Wait for the external device ID input to be available (using autofocus attribute)
            await this.page.waitForSelector('input[type="text"][autofocus]', { timeout });

            console.log('Add device form is ready');
        } catch (error) {
            console.error('Error waiting for add device form:', error.message);
            throw error;
        }
    }

    /**
 * Enter external device ID
 */
    async enterExternalDeviceId(deviceId) {
        try {
            // Use a more specific selector that finds the input by its label
            const inputSelector = 'input[type="text"][autofocus]';

            // Wait for the input field to be ready
            await this.page.waitForSelector(inputSelector, { timeout: 10000 });

            // Clear the field first
            await this.page.fill(inputSelector, '');

            // Enter the device ID
            await this.page.fill(inputSelector, deviceId);

            console.log(`External device ID entered: ${deviceId}`);
        } catch (error) {
            console.error('Error entering external device ID:', error.message);
            throw error;
        }
    }

    /**
 * Enter short ID
 */
    async enterShortId(shortId) {
        try {
            // Find the Short ID input field by looking for the label with "Short ID" text
            const shortIdInputSelector = 'input[type="text"]';

            // Wait for the input field to be ready
            await this.page.waitForSelector(shortIdInputSelector, { timeout: 2000 });

            // Get all text inputs and find the one with "Short ID" label
            const inputs = await this.page.$$(shortIdInputSelector);
            let shortIdInput = null;

            for (const input of inputs) {
                // Check if this input has a label with "Short ID" text
                const label = await input.evaluateHandle(el => {
                    const labelElement = el.closest('.v-text-field__slot')?.querySelector('label');
                    return labelElement ? labelElement.textContent : null;
                });

                const labelText = await label.jsonValue();
                if (labelText && labelText.includes('Short ID')) {
                    shortIdInput = input;
                    break;
                }
            }

            if (!shortIdInput) {
                throw new Error('Short ID input field not found');
            }

            // Clear the field first
            await shortIdInput.fill('');

            // Enter the short ID
            await shortIdInput.fill(shortId);

            console.log(`Short ID entered: ${shortId}`);
        } catch (error) {
            console.error('Error entering short ID:', error.message);
            throw error;
        }
    }

    /**
 * Select device type
 */
    async selectType(type) {
        try {
            // Find the Type select dropdown by its label
            const typeSelect = 'div.v-select:has(label:has-text("Type"))';

            // Wait for the select to be available
            await this.page.waitForSelector(typeSelect, { timeout: 2000 });

            // Click the select dropdown
            await this.page.click(typeSelect);

            // Wait for the dropdown menu to open and be visible
            await this.page.waitForSelector('.v-menu__content:visible', { timeout: 2000 });

            // Wait a moment for the dropdown to fully open


            // Click the option in the dropdown menu (more specific selector)
            await this.page.click(`.v-menu__content:visible .v-list-item:has-text("${type}")`);

            console.log(`Type selected: ${type}`);
        } catch (error) {
            console.error('Error selecting type:', error.message);
            throw error;
        }
    }

    /**
 * Select device subtype
 */
    async selectSubtype(subtype) {
        try {
            const subtypeSelect = 'div.v-select:has(label:has-text("Subtype"))';
            await this.page.waitForSelector(subtypeSelect, { timeout: 2000 });
            await this.page.click(subtypeSelect);

            // Wait for the dropdown menu to open and be visible
            await this.page.waitForSelector('.v-menu__content:visible', { timeout: 2000 });


            // Click the option in the dropdown menu
            await this.page.click(`.v-menu__content:visible .v-list-item:has-text("${subtype}")`);
            console.log(`Subtype selected: ${subtype}`);
        } catch (error) {
            console.error('Error selecting subtype:', error.message);
            throw error;
        }
    }

    /**
 * Select device status
 */
    async selectStatus(status) {
        try {
            const statusSelect = 'div.v-select:has(label:has-text("Status"))';
            await this.page.waitForSelector(statusSelect, { timeout: 2000 });
            await this.page.click(statusSelect);

            // Wait for the dropdown menu to open and be visible
            await this.page.waitForSelector('.v-menu__content:visible', { timeout: 2000 });


            // Click the option in the dropdown menu
            await this.page.click(`.v-menu__content:visible .v-list-item:has-text("${status}")`);
            console.log(`Status selected: ${status}`);
        } catch (error) {
            console.error('Error selecting status:', error.message);
            throw error;
        }
    }

    /**
 * Select device disposition
 */
    async selectDisposition(disposition) {
        try {
            const dispositionSelect = 'div.v-select:has(label:has-text("Disposition"))';
            await this.page.waitForSelector(dispositionSelect, { timeout: 2000 });
            await this.page.click(dispositionSelect);

            // Wait for the dropdown menu to open and be visible
            await this.page.waitForSelector('.v-menu__content:visible', { timeout: 2000 });


            // Click the option in the dropdown menu
            await this.page.click(`.v-menu__content:visible .v-list-item:has-text("${disposition}")`);
            console.log(`Disposition selected: ${disposition}`);
        } catch (error) {
            console.error('Error selecting disposition:', error.message);
            throw error;
        }
    }

    /**
 * Select assigned organization
 */
    async selectAssignedOrganization(organization) {
        try {
            const assignedOrgSelect = 'div.v-select:has(label:has-text("Assigned Organization"))';
            await this.page.waitForSelector(assignedOrgSelect, { timeout: 2000 });
            await this.page.click(assignedOrgSelect);

            // Wait for the dropdown menu to open and be visible
            await this.page.waitForSelector('.v-menu__content:visible', { timeout: 2000 });

            // Click the option in the dropdown menu
            await this.page.click(`.v-menu__content:visible .v-list-item:has-text("${organization}")`);
            console.log(`Assigned organization selected: ${organization}`);
        } catch (error) {
            console.error('Error selecting assigned organization:', error.message);
            throw error;
        }
    }

    /**
     * Click the Add Device button
     */
    async clickAddDeviceButton() {
        try {
            await this.page.waitForSelector(this.selectors.addDeviceButton, { timeout: 10000 });
            await this.page.click(this.selectors.addDeviceButton);
            console.log('Add Device button clicked successfully');
        } catch (error) {
            console.error('Error clicking Add Device button:', error.message);
            throw error;
        }
    }

    /**
     * Check if success message is visible
     */
    async isSuccessMessageVisible(timeout = 5000) {
        try {
            await this.page.waitForSelector(this.selectors.successMessage, { timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(timeout = 5000) {
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
     * Check if we're on the add device page
     */
    async isOnAddDevicePage() {
        const currentUrl = this.page.url();
        return currentUrl.includes('/devices/new');
    }

    /**
     * Get current page URL
     */
    async getCurrentUrl() {
        return this.page.url();
    }

    /**
     * Clear external device ID field
     */
    async clearExternalDeviceId() {
        await this.page.fill(this.selectors.externalDeviceIdInput, '');
    }
}

module.exports = DevicesPage; 