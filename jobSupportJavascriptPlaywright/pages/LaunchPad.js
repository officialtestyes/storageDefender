class LaunchPad {
    constructor(page) {
        this.page = page;

        // Page selectors based on the provided HTML structure
        this.selectors = {
            // Filter functionality
            filterButton: 'button.v-btn--outlined:has-text("Filter")',
            clearButton: 'button.v-btn--outlined:has-text("Clear")',
            doneButton: 'button.v-btn--has-bg.primary:has-text("Done")',

            // Filter button with icon
            filterButtonWithIcon: 'button.v-btn--outlined:has(i.mdi-filter)',

            // Page elements
            pageTitle: '.v-toolbar__title',
            container: '.container.fill-height',

            // Navigation elements (if any)
            navigationMenu: '.v-navigation-drawer',

            // Content area
            contentArea: '.v-main',

            // Common button patterns
            outlinedButtons: 'button.v-btn--outlined',
            primaryButtons: 'button.v-btn--has-bg.primary',
            smallButtons: 'button.v-size--small',

            // Organization search functionality
            organizationSearchInput: 'input[autofocus="autofocus"][type="text"][autocomplete="off"]',
            organizationSearchLabel: 'label:has-text("Search StorageDefender organizations")',
            organizationSelect: 'div.v-select__slot:has(label:has-text("Search StorageDefender organizations"))',
            organizationDropdown: 'div.v-select__selections',

            // Navigation links
            navigationLink: 'a.v-btn--outlined.v-btn--router.v-btn--text.v-btn--tile.theme--light.v-size--small.primary--text'
        };
    }

    /**
     * Click the Filter button
     */
    async clickFilterButton() {
        try {
            console.log('Clicking Filter button...');
            await this.page.waitForSelector(this.selectors.filterButton, { timeout: 5000 });
            await this.page.click(this.selectors.filterButton);
            console.log('Filter button clicked successfully');
        } catch (error) {
            console.error('Error clicking Filter button:', error.message);
            throw error;
        }
    }

    /**
     * Click the Clear button
     */
    async clickClearButton() {
        try {
            console.log('Clicking Clear button...');
            await this.page.waitForSelector(this.selectors.clearButton, { timeout: 5000 });
            await this.page.click(this.selectors.clearButton);
            console.log('Clear button clicked successfully');
        } catch (error) {
            console.error('Error clicking Clear button:', error.message);
            throw error;
        }
    }

    /**
     * Click the Done button
     */
    async clickDoneButton() {
        try {
            console.log('Clicking Done button...');
            await this.page.waitForSelector(this.selectors.doneButton, { timeout: 5000 });
            await this.page.click(this.selectors.doneButton);
            console.log('Done button clicked successfully');
        } catch (error) {
            console.error('Error clicking Done button:', error.message);
            throw error;
        }
    }

    /**
     * Perform the complete filter workflow: Click Filter → Clear → Done
     */
    async performFilterWorkflow() {
        try {
            console.log('Starting filter workflow...');

            // Step 1: Click Filter
            await this.clickFilterButton();

            // Step 2: Click Clear
            await this.clickClearButton();

            // Step 3: Click Done
            await this.clickDoneButton();

            console.log('Filter workflow completed successfully');
        } catch (error) {
            console.error('Error performing filter workflow:', error.message);
            throw error;
        }
    }

    /**
     * Enter organization name in the search field
     */
    async enterOrganizationName(organizationName = 'The Jenkins Organization') {
        try {
            console.log(`Entering organization name: ${organizationName}`);

            // Wait for the organization search input to be available
            await this.page.waitForSelector(this.selectors.organizationSearchInput, { timeout: 10000 });

            // Clear the input field first
            await this.page.fill(this.selectors.organizationSearchInput, '');

            // Enter the organization name
            await this.page.fill(this.selectors.organizationSearchInput, organizationName);

            // Wait a moment for the input to be processed
            await this.page.waitForTimeout(500);

            console.log(`Organization name entered successfully: ${organizationName}`);
        } catch (error) {
            console.error('Error entering organization name:', error.message);
            throw error;
        }
    }

    /**
     * Wait for organization dropdown to be visible (if applicable)
     */
    async waitForOrganizationDropdown(timeout = 5000) {
        try {
            await this.page.waitForSelector('.v-menu__content:visible', { timeout });
            console.log('Organization dropdown is visible');
        } catch (error) {
            console.log('Organization dropdown not found or not visible');
        }
    }

    /**
     * Select organization from dropdown (if dropdown appears)
     */
    async selectOrganizationFromDropdown(organizationName = 'The Jenkins Organization') {
        try {
            console.log(`Selecting organization from dropdown: ${organizationName}`);

            // Wait for dropdown to be visible
            await this.waitForOrganizationDropdown();

            // Click on the organization option in the dropdown
            await this.page.click(`.v-menu__content:visible .v-list-item:has-text("${organizationName}")`);

            console.log(`Organization selected from dropdown: ${organizationName}`);
        } catch (error) {
            console.error('Error selecting organization from dropdown:', error.message);
            throw error;
        }
    }

    /**
     * Complete organization search workflow: Enter name and optionally select from dropdown
     */
    async searchOrganization(organizationName = 'The Jenkins Organization', selectFromDropdown = false) {
        try {
            console.log(`Starting organization search workflow for: ${organizationName}`);

            // Enter the organization name
            await this.enterOrganizationName(organizationName);

            // Optionally select from dropdown if specified
            if (selectFromDropdown) {
                await this.selectOrganizationFromDropdown(organizationName);
            }

            console.log('Organization search workflow completed successfully');
        } catch (error) {
            console.error('Error in organization search workflow:', error.message);
            throw error;
        }
    }

    /**
     * Click on navigation links like Profile or Dashboard
     * @param {string} linkText - The text of the link to click (e.g., "Profile", "Dashboard")
     */
    async clickLink(linkText) {
        try {
            console.log(`Clicking link with text: ${linkText}`);

            // Wait for the link to be available and visible
            const linkSelector = `${this.selectors.navigationLink}:has-text("${linkText}")`;
            await this.page.waitForSelector(linkSelector, { timeout: 10000 });

            // Click the link
            await this.page.click(linkSelector);

            console.log(`Successfully clicked link: ${linkText}`);
        } catch (error) {
            console.error(`Error clicking link "${linkText}":`, error.message);
            throw error;
        }
    }
}

module.exports = LaunchPad;
