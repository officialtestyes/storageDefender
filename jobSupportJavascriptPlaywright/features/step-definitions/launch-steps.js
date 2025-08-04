const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LaunchPad = require('../../pages/LaunchPad');

// Set default timeout for all steps
setDefaultTimeout(20000);


Given('I am clearing the filter panel', async function () {
    this.launchPad = new LaunchPad(this.page);
    await this.launchPad.performFilterWorkflow();
});
Then('I search for an organization {string}', async function (organizationName) {
    await this.launchPad.searchOrganization(organizationName);
})

Then('I should select the organization {string}', async function (organizationName) {
    await this.launchPad.selectOrganizationFromDropdown(organizationName);
})

Then('I click on link {string}', async function (linkText) {
    await this.launchPad.clickLink(linkText);
})

