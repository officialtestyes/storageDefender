class ProfilePage {
    constructor(page) {
        this.page = page;

        // Selectors for Enable Tenant Ledger Report section
        this.selectors = {
            // Enable Tenant Ledger Report slider
            enableTenantLedgerReportSlider: 'input[role="switch"][type="checkbox"]',
            enableTenantLedgerReportLabel: 'h5.subtitle-1:has-text("Enable Tenant Ledger Report")',

            // Frequency radio buttons (Daily, Weekly, First of month)
            frequencyRadioGroup: 'div[role="radiogroup"]',
            dailyRadio: 'input[value="daily"][type="radio"]',
            weeklyRadio: 'input[value="weekly"][type="radio"]',
            monthlyRadio: 'input[value="monthly"][type="radio"]',
            dailyLabel: 'label:has-text("Daily")',
            weeklyLabel: 'label:has-text("Weekly")',
            monthlyLabel: 'label:has-text("First of month")',

            // Report type radio buttons (Full Report, Delta Report)
            reportTypeRadioGroup: 'div[role="radiogroup"]',
            fullReportRadio: 'input[value="full"][type="radio"]',
            deltaReportRadio: 'input[value="delta"][type="radio"]',
            fullReportLabel: 'label:has-text("Full Report")',
            deltaReportLabel: 'label:has-text("Delta Report")',

            // Email input field
            emailInput: 'input[type="email"]',
            emailLabel: 'label:has-text("Enter Your Email Address")'
        };
    }

    /**
     * Validate the Enable Tenant Ledger Report section
     * Checks if the slider is enabled and at least one radio button is selected for each group
     */
    async validateTenantLedgerReportSection() {
        try {
            console.log('Starting validation of Enable Tenant Ledger Report section...');

            const validationResults = {
                sliderEnabled: false,
                frequencySelected: false,
                reportTypeSelected: false,
                emailFieldPresent: false,
                overallValidation: false
            };

            // 1. Validate the slider is enabled
            try {
                const slider = await this.page.waitForSelector(this.selectors.enableTenantLedgerReportSlider, { timeout: 5000 });
                const isChecked = await slider.isChecked();
                validationResults.sliderEnabled = isChecked;
                console.log(`Tenant Ledger Report slider enabled: ${isChecked}`);
            } catch (error) {
                console.error('Error validating slider:', error.message);
                validationResults.sliderEnabled = false;
            }

            // 2. Validate frequency radio buttons (Daily, Weekly, First of month)
            try {
                // Wait for at least one frequency radio button to be available
                await this.page.waitForSelector(this.selectors.dailyRadio, { timeout: 5000 });

                const dailyChecked = await this.page.isChecked(this.selectors.dailyRadio);
                const weeklyChecked = await this.page.isChecked(this.selectors.weeklyRadio);
                const monthlyChecked = await this.page.isChecked(this.selectors.monthlyRadio);

                validationResults.frequencySelected = dailyChecked || weeklyChecked || monthlyChecked;

                console.log(`Frequency radio buttons - Daily: ${dailyChecked}, Weekly: ${weeklyChecked}, Monthly: ${monthlyChecked}`);
                console.log(`At least one frequency selected: ${validationResults.frequencySelected}`);
            } catch (error) {
                console.error('Error validating frequency radio buttons:', error.message);
                validationResults.frequencySelected = false;
            }

            // 3. Validate report type radio buttons (Full Report, Delta Report)
            try {
                // Wait for at least one report type radio button to be available
                await this.page.waitForSelector(this.selectors.fullReportRadio, { timeout: 5000 });

                const fullReportChecked = await this.page.isChecked(this.selectors.fullReportRadio);
                const deltaReportChecked = await this.page.isChecked(this.selectors.deltaReportRadio);

                validationResults.reportTypeSelected = fullReportChecked || deltaReportChecked;

                console.log(`Report type radio buttons - Full Report: ${fullReportChecked}, Delta Report: ${deltaReportChecked}`);
                console.log(`At least one report type selected: ${validationResults.reportTypeSelected}`);
            } catch (error) {
                console.error('Error validating report type radio buttons:', error.message);
                validationResults.reportTypeSelected = false;
            }

            // 4. Validate email field is present
            try {
                const emailField = await this.page.waitForSelector(this.selectors.emailInput, { timeout: 3000 });
                validationResults.emailFieldPresent = await emailField.isVisible();
                console.log(`Email field present: ${validationResults.emailFieldPresent}`);
            } catch (error) {
                console.error('Error validating email field:', error.message);
                validationResults.emailFieldPresent = false;
            }

            // 5. Overall validation - all conditions must be met
            validationResults.overallValidation =
                validationResults.sliderEnabled &&
                validationResults.frequencySelected &&
                validationResults.reportTypeSelected &&
                validationResults.emailFieldPresent;

            console.log('=== Tenant Ledger Report Validation Results ===');
            console.log(`Slider Enabled: ${validationResults.sliderEnabled}`);
            console.log(`Frequency Selected: ${validationResults.frequencySelected}`);
            console.log(`Report Type Selected: ${validationResults.reportTypeSelected}`);
            console.log(`Email Field Present: ${validationResults.emailFieldPresent}`);
            console.log(`Overall Validation: ${validationResults.overallValidation}`);
            console.log('==============================================');

            return validationResults;

        } catch (error) {
            console.error('Error in validateTenantLedgerReportSection:', error.message);
            throw error;
        }
    }

    /**
     * Get the current state of the Enable Tenant Ledger Report slider
     */
    async getTenantLedgerReportSliderState() {
        try {
            await this.page.waitForSelector(this.selectors.enableTenantLedgerReportSlider, { timeout: 10000 });
            return await this.page.isChecked(this.selectors.enableTenantLedgerReportSlider);
        } catch (error) {
            console.error('Error getting slider state:', error.message);
            return false;
        }
    }

    /**
     * Get the selected frequency option
     */
    async getSelectedFrequency() {
        try {
            // Wait for at least one frequency radio button to be available
            await this.page.waitForSelector(this.selectors.dailyRadio, { timeout: 10000 });

            // Wait a moment for any state changes to settle
            await this.page.waitForTimeout(500);

            const dailyChecked = await this.page.isChecked(this.selectors.dailyRadio);
            const weeklyChecked = await this.page.isChecked(this.selectors.weeklyRadio);
            const monthlyChecked = await this.page.isChecked(this.selectors.monthlyRadio);

            console.log(`Frequency states - Daily: ${dailyChecked}, Weekly: ${weeklyChecked}, Monthly: ${monthlyChecked}`);

            if (dailyChecked) return 'daily';
            if (weeklyChecked) return 'weekly';
            if (monthlyChecked) return 'monthly';
            return null;
        } catch (error) {
            console.error('Error getting selected frequency:', error.message);
            return null;
        }
    }

    /**
     * Get the selected report type
     */
    async getSelectedReportType() {
        try {
            // Wait for at least one report type radio button to be available
            await this.page.waitForSelector(this.selectors.fullReportRadio, { timeout: 10000 });

            // Wait a moment for any state changes to settle
            await this.page.waitForTimeout(500);

            const fullReportChecked = await this.page.isChecked(this.selectors.fullReportRadio);
            const deltaReportChecked = await this.page.isChecked(this.selectors.deltaReportRadio);

            console.log(`Report type states - Full: ${fullReportChecked}, Delta: ${deltaReportChecked}`);

            if (fullReportChecked) return 'full';
            if (deltaReportChecked) return 'delta';
            return null;
        } catch (error) {
            console.error('Error getting selected report type:', error.message);
            return null;
        }
    }

    /**
     * Toggle the Enable Tenant Ledger Report slider
     */
    async toggleTenantLedgerReportSlider() {
        try {
            // Wait for the slider to be available
            await this.page.waitForSelector(this.selectors.enableTenantLedgerReportSlider, { timeout: 10000 });

            // Get current state
            const currentState = await this.page.isChecked(this.selectors.enableTenantLedgerReportSlider);
            const targetState = !currentState;

            // Try clicking the slider directly first
            try {
                await this.page.click(this.selectors.enableTenantLedgerReportSlider, {
                    timeout: 5000,
                    force: true,
                    position: { x: 10, y: 10 } // Click in the center
                });
                console.log('Tenant Ledger Report slider toggled via direct click');
            } catch (clickError) {
                console.log(`Direct click failed, trying JavaScript evaluation: ${clickError.message}`);

                // If direct click fails, use JavaScript to set the slider to target state
                await this.page.evaluate((sliderSelector, targetState) => {
                    const slider = document.querySelector(sliderSelector);
                    if (slider) {
                        slider.checked = targetState;
                        slider.dispatchEvent(new Event('change', { bubbles: true }));
                        slider.dispatchEvent(new Event('input', { bubbles: true }));
                        slider.dispatchEvent(new Event('click', { bubbles: true }));
                    }
                }, this.selectors.enableTenantLedgerReportSlider, targetState);
                console.log('Tenant Ledger Report slider toggled via JavaScript');
            }

            // Wait a moment for the toggle to take effect
            await this.page.waitForTimeout(500);

            // Verify the state changed
            const newState = await this.page.isChecked(this.selectors.enableTenantLedgerReportSlider);
            console.log(`Slider state changed from ${currentState} to ${newState}`);

        } catch (error) {
            console.error('Error toggling slider:', error.message);
            throw error;
        }
    }

    /**
     * Select a frequency option
     * @param {string} frequency - 'daily', 'weekly', or 'monthly'
     */
    async selectFrequency(frequency) {
        try {
            let selector;
            let labelSelector;
            switch (frequency.toLowerCase()) {
                case 'daily':
                    selector = this.selectors.dailyRadio;
                    labelSelector = this.selectors.dailyLabel;
                    break;
                case 'weekly':
                    selector = this.selectors.weeklyRadio;
                    labelSelector = this.selectors.weeklyLabel;
                    break;
                case 'monthly':
                    selector = this.selectors.monthlyRadio;
                    labelSelector = this.selectors.monthlyLabel;
                    break;
                default:
                    throw new Error(`Invalid frequency: ${frequency}`);
            }

            // Wait for the radio button to be available
            await this.page.waitForSelector(selector, { timeout: 10000 });

            // Try clicking the label first (more reliable for Vuetify components)
            try {
                await this.page.click(labelSelector, { timeout: 5000 });
                console.log(`Frequency selected via label: ${frequency}`);
            } catch (labelError) {
                console.log(`Label click failed, trying radio button directly: ${labelError.message}`);

                try {
                    // If label click fails, try clicking the radio button with force
                    await this.page.click(selector, {
                        force: true,
                        timeout: 5000,
                        position: { x: 5, y: 5 } // Click in the center
                    });
                    console.log(`Frequency selected via radio button: ${frequency}`);
                } catch (clickError) {
                    console.log(`Direct click failed, trying JavaScript evaluation: ${clickError.message}`);

                    // As a last resort, use JavaScript to set the radio button
                    await this.page.evaluate((radioSelector) => {
                        const radio = document.querySelector(radioSelector);
                        if (radio) {
                            radio.checked = true;
                            radio.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, selector);
                    console.log(`Frequency selected via JavaScript: ${frequency}`);
                }
            }

            // Wait a moment for the selection to take effect
            await this.page.waitForTimeout(1000);

            // Verify the selection took effect
            const selectedFrequency = await this.getSelectedFrequency();
            console.log(`Frequency selection verified: ${selectedFrequency}`);

        } catch (error) {
            console.error(`Error selecting frequency ${frequency}:`, error.message);
            throw error;
        }
    }

    /**
     * Select a report type
     * @param {string} reportType - 'full' or 'delta'
     */
    async selectReportType(reportType) {
        try {
            let selector;
            let labelSelector;
            switch (reportType.toLowerCase()) {
                case 'full':
                    selector = this.selectors.fullReportRadio;
                    labelSelector = this.selectors.fullReportLabel;
                    break;
                case 'delta':
                    selector = this.selectors.deltaReportRadio;
                    labelSelector = this.selectors.deltaReportLabel;
                    break;
                default:
                    throw new Error(`Invalid report type: ${reportType}`);
            }

            // Wait for the radio button to be available
            await this.page.waitForSelector(selector, { timeout: 10000 });

            // Try clicking the label first (more reliable for Vuetify components)
            try {
                await this.page.click(labelSelector, { timeout: 5000 });
                console.log(`Report type selected via label: ${reportType}`);
            } catch (labelError) {
                console.log(`Label click failed, trying radio button directly: ${labelError.message}`);

                try {
                    // If label click fails, try clicking the radio button with force
                    await this.page.click(selector, {
                        force: true,
                        timeout: 5000,
                        position: { x: 5, y: 5 } // Click in the center
                    });
                    console.log(`Report type selected via radio button: ${reportType}`);
                } catch (clickError) {
                    console.log(`Direct click failed, trying JavaScript evaluation: ${clickError.message}`);

                    // As a last resort, use JavaScript to set the radio button
                    await this.page.evaluate((radioSelector) => {
                        const radio = document.querySelector(radioSelector);
                        if (radio) {
                            radio.checked = true;
                            radio.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, selector);
                    console.log(`Report type selected via JavaScript: ${reportType}`);
                }
            }

            // Wait a moment for the selection to take effect
            await this.page.waitForTimeout(1000);

            // Verify the selection took effect
            const selectedReportType = await this.getSelectedReportType();
            console.log(`Report type selection verified: ${selectedReportType}`);

        } catch (error) {
            console.error(`Error selecting report type ${reportType}:`, error.message);
            throw error;
        }
    }

    /**
     * Enter email address
     * @param {string} email - The email address to enter
     */
    async enterEmailAddress(email) {
        try {
            await this.page.fill(this.selectors.emailInput, email);
            console.log(`Email address entered: ${email}`);
        } catch (error) {
            console.error('Error entering email address:', error.message);
            throw error;
        }
    }

    /**
     * Get the current email address
     */
    async getEmailAddress() {
        try {
            return await this.page.inputValue(this.selectors.emailInput);
        } catch (error) {
            console.error('Error getting email address:', error.message);
            return null;
        }
    }

    /**
 * Wait for the Profile page to load
 */
    async waitForProfilePage(timeout = 10000) {
        try {
            // Wait for the main label to be visible
            await this.page.waitForSelector(this.selectors.enableTenantLedgerReportLabel, { timeout });

            // Wait for the page to be fully loaded
            await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });

            // Wait a moment for any dynamic content to load
            await this.page.waitForTimeout(1000);

            console.log('Profile page loaded successfully');
        } catch (error) {
            console.error('Error waiting for Profile page:', error.message);
            throw error;
        }
    }

    /**
     * Set the Enable Tenant Ledger Report slider to a specific state
     * @param {boolean} enabled - true to enable, false to disable
     */
    async setTenantLedgerReportSliderState(enabled) {
        try {
            // Wait for the slider to be available
            await this.page.waitForSelector(this.selectors.enableTenantLedgerReportSlider, { timeout: 10000 });

            // Get current state
            const currentState = await this.page.isChecked(this.selectors.enableTenantLedgerReportSlider);

            // Only change if needed
            if (currentState !== enabled) {
                // Try clicking the slider directly first
                try {
                    await this.page.click(this.selectors.enableTenantLedgerReportSlider, {
                        timeout: 5000,
                        force: true,
                        position: { x: 10, y: 10 } // Click in the center
                    });
                    console.log(`Tenant Ledger Report slider set to ${enabled} via direct click`);
                } catch (clickError) {
                    console.log(`Direct click failed, trying JavaScript evaluation: ${clickError.message}`);

                    // If direct click fails, use JavaScript to set the slider state
                    await this.page.evaluate((sliderSelector, targetState) => {
                        const slider = document.querySelector(sliderSelector);
                        if (slider) {
                            slider.checked = targetState;
                            slider.dispatchEvent(new Event('change', { bubbles: true }));
                            slider.dispatchEvent(new Event('input', { bubbles: true }));
                            slider.dispatchEvent(new Event('click', { bubbles: true }));
                        }
                    }, this.selectors.enableTenantLedgerReportSlider, enabled);
                    console.log(`Tenant Ledger Report slider set to ${enabled} via JavaScript`);
                }

                // Wait a moment for the change to take effect
                await this.page.waitForTimeout(500);

                // Verify the state changed
                const newState = await this.page.isChecked(this.selectors.enableTenantLedgerReportSlider);
                console.log(`Slider state changed from ${currentState} to ${newState}`);
            } else {
                console.log(`Slider already in desired state: ${enabled}`);
            }

        } catch (error) {
            console.error('Error setting slider state:', error.message);
            throw error;
        }
    }
}

module.exports = ProfilePage; 