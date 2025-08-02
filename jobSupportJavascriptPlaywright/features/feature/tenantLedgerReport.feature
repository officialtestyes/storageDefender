@regression @Testing-tenantLedgerReport-success
Feature: Enable Tenant Ledger Report Validation
  As a user
  I want to validate the Enable Tenant Ledger Report section
  So that I can ensure all required elements are properly configured

  Background:
    Given I am on the login page
    When I enter username "sadmin@storage-defender.com"
    And I enter password "test@123"
    And I click the login button
    Then I should be logged in successfully
    And I am clearing the filter panel
    And I search for an organization "The Jenkins Organization"
    Then I should select the organization "The Jenkins Organization"
    And I click on link "Profile"

  @validate-tenant-ledger-report
  Scenario: Validate Enable Tenant Ledger Report section
    Then I should validate the Enable Tenant Ledger Report section
    And the Tenant Ledger Report slider should be enabled
    And a frequency option should be selected
    And a report type should be selected

  @test-frequency-selection
  Scenario: Test frequency selection options
    When I select the frequency "Daily"
    Then the selected frequency should be "Daily"
    When I select the frequency "Weekly"
    Then the selected frequency should be "Weekly"
    When I select the frequency "Monthly"
    Then the selected frequency should be "Monthly"

  @test-report-type-selection
  Scenario: Test report type selection options
    When I select the report type "Full"
    Then the selected report type should be "Full"
    When I select the report type "Delta"
    Then the selected report type should be "Delta"

  @test-slider-toggle
  Scenario: Test slider toggle functionality
    When I toggle the Tenant Ledger Report slider
    Then the Tenant Ledger Report slider should be enabled

  @test-email-input
  Scenario: Test email address input
    When I enter the email address "test@example.com"
    Then the email address should be "test@example.com"

  @complete-validation
  Scenario: Complete validation of all elements
    Then I should validate the Enable Tenant Ledger Report section
    And the Tenant Ledger Report slider should be enabled
    And a frequency option should be selected
    And a report type should be selected
    When I enter the email address "admin@organization.com"
    Then the email address should be "admin@organization.com"
