const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const ProfilePage = require('../../pages/ProfilePage');

// Set default timeout for all steps
setDefaultTimeout(20000);

/**
 * Step to validate the Enable Tenant Ledger Report section
 * This step checks if the slider is enabled and at least one radio button is selected for each group
 */
Then('I should validate the Enable Tenant Ledger Report section', async function () {
    try {
        // Initialize ProfilePage
        this.profilePage = new ProfilePage(this.page);

        // Wait for the Profile page to load
        await this.profilePage.waitForProfilePage();

        // Perform the validation
        const validationResults = await this.profilePage.validateTenantLedgerReportSection();

        // Assert that the overall validation passed
        expect(validationResults.overallValidation).to.be.true;

        console.log('✅ Enable Tenant Ledger Report section validation passed');

    } catch (error) {
        console.error('❌ Enable Tenant Ledger Report section validation failed:', error.message);
        throw error;
    }
});

/**
 * Step to check if the Tenant Ledger Report slider is enabled
 */
Then('the Tenant Ledger Report slider should be enabled', async function () {
    try {
        this.profilePage = new ProfilePage(this.page);
        const isEnabled = await this.profilePage.getTenantLedgerReportSliderState();
        expect(isEnabled).to.be.true;
        console.log('✅ Tenant Ledger Report slider is enabled');
    } catch (error) {
        console.error('❌ Tenant Ledger Report slider validation failed:', error.message);
        throw error;
    }
});

/**
 * Step to check if a frequency option is selected
 */
Then('a frequency option should be selected', async function () {
    try {
        this.profilePage = new ProfilePage(this.page);
        const selectedFrequency = await this.profilePage.getSelectedFrequency();
        expect(selectedFrequency).to.not.be.null;
        console.log(`✅ Frequency option selected: ${selectedFrequency}`);
    } catch (error) {
        console.error('❌ Frequency option validation failed:', error.message);
        throw error;
    }
});

/**
 * Step to check if a report type is selected
 */
Then('a report type should be selected', async function () {
    try {
        this.profilePage = new ProfilePage(this.page);
        const selectedReportType = await this.profilePage.getSelectedReportType();
        expect(selectedReportType).to.not.be.null;
        console.log(`✅ Report type selected: ${selectedReportType}`);
    } catch (error) {
        console.error('❌ Report type validation failed:', error.message);
        throw error;
    }
});

/**
 * Step to select a specific frequency option
 */
When('I select the frequency {string}', async function (frequency) {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        await this.profilePage.selectFrequency(frequency);
        console.log(`✅ Frequency selected: ${frequency}`);
    } catch (error) {
        console.error(`❌ Failed to select frequency ${frequency}:`, error.message);
        throw error;
    }
});

/**
 * Step to select a specific report type
 */
When('I select the report type {string}', async function (reportType) {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        await this.profilePage.selectReportType(reportType);
        console.log(`✅ Report type selected: ${reportType}`);
    } catch (error) {
        console.error(`❌ Failed to select report type ${reportType}:`, error.message);
        throw error;
    }
});

/**
 * Step to toggle the Tenant Ledger Report slider
 */
When('I toggle the Tenant Ledger Report slider', async function () {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        await this.profilePage.toggleTenantLedgerReportSlider();
        console.log('✅ Tenant Ledger Report slider toggled');
    } catch (error) {
        console.error('❌ Failed to toggle slider:', error.message);
        throw error;
    }
});

/**
 * Step to set the Tenant Ledger Report slider to enabled state
 */
When('I enable the Tenant Ledger Report slider', async function () {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        await this.profilePage.setTenantLedgerReportSliderState(true);
        console.log('✅ Tenant Ledger Report slider enabled');
    } catch (error) {
        console.error('❌ Failed to enable slider:', error.message);
        throw error;
    }
});

/**
 * Step to set the Tenant Ledger Report slider to disabled state
 */
When('I disable the Tenant Ledger Report slider', async function () {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        await this.profilePage.setTenantLedgerReportSliderState(false);
        console.log('✅ Tenant Ledger Report slider disabled');
    } catch (error) {
        console.error('❌ Failed to disable slider:', error.message);
        throw error;
    }
});

/**
 * Step to enter email address
 */
When('I enter the email address {string}', async function (email) {
    try {
        this.profilePage = new ProfilePage(this.page);
        await this.profilePage.enterEmailAddress(email);
        console.log(`✅ Email address entered: ${email}`);
    } catch (error) {
        console.error(`❌ Failed to enter email address ${email}:`, error.message);
        throw error;
    }
});

/**
 * Step to verify the email address
 */
Then('the email address should be {string}', async function (expectedEmail) {
    try {
        this.profilePage = new ProfilePage(this.page);
        const actualEmail = await this.profilePage.getEmailAddress();
        expect(actualEmail).to.equal(expectedEmail);
        console.log(`✅ Email address verified: ${expectedEmail}`);
    } catch (error) {
        console.error(`❌ Email address verification failed:`, error.message);
        throw error;
    }
});

/**
 * Step to verify the selected frequency
 */
Then('the selected frequency should be {string}', async function (expectedFrequency) {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        // Retry mechanism for verification
        let actualFrequency = null;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                // Wait a moment for any UI updates to complete
                await this.page.waitForTimeout(1000);

                actualFrequency = await this.profilePage.getSelectedFrequency();

                if (actualFrequency === expectedFrequency.toLowerCase()) {
                    console.log(`✅ Frequency verified: ${expectedFrequency}`);
                    return;
                }

                console.log(`Retry ${retryCount + 1}: Expected ${expectedFrequency.toLowerCase()}, got ${actualFrequency}`);
                retryCount++;

                if (retryCount < maxRetries) {
                    await this.page.waitForTimeout(1000); // Wait before retry
                }
            } catch (error) {
                console.log(`Retry ${retryCount + 1} failed: ${error.message}`);
                retryCount++;

                if (retryCount < maxRetries) {
                    await this.page.waitForTimeout(1000); // Wait before retry
                }
            }
        }

        // If we get here, all retries failed
        expect(actualFrequency).to.equal(expectedFrequency.toLowerCase());

    } catch (error) {
        console.error(`❌ Frequency verification failed after retries:`, error.message);
        throw error;
    }
});

/**
 * Step to verify the selected report type
 */
Then('the selected report type should be {string}', async function (expectedReportType) {
    try {
        // Initialize ProfilePage if not already done
        if (!this.profilePage) {
            this.profilePage = new ProfilePage(this.page);
            await this.profilePage.waitForProfilePage();
        }

        // Retry mechanism for verification
        let actualReportType = null;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                // Wait a moment for any UI updates to complete
                await this.page.waitForTimeout(1000);

                actualReportType = await this.profilePage.getSelectedReportType();

                if (actualReportType === expectedReportType.toLowerCase()) {
                    console.log(`✅ Report type verified: ${expectedReportType}`);
                    return;
                }

                console.log(`Retry ${retryCount + 1}: Expected ${expectedReportType.toLowerCase()}, got ${actualReportType}`);
                retryCount++;

                if (retryCount < maxRetries) {
                    await this.page.waitForTimeout(1000); // Wait before retry
                }
            } catch (error) {
                console.log(`Retry ${retryCount + 1} failed: ${error.message}`);
                retryCount++;

                if (retryCount < maxRetries) {
                    await this.page.waitForTimeout(1000); // Wait before retry
                }
            }
        }

        // If we get here, all retries failed
        expect(actualReportType).to.equal(expectedReportType.toLowerCase());

    } catch (error) {
        console.error(`❌ Report type verification failed after retries:`, error.message);
        throw error;
    }
}); 