@regression
Feature: Login Functionality
  As a user
  I want to be able to log in to the application
  So that I can access the backoffice system

  Background:
    Given I am on the login page

  @Testing
  Scenario: Successful login with valid credentials
    When I enter username "sadmin@storage-defender.com"
    And I enter password "test@123"
    And I click the login button
    Then I should be logged in successfully
    #And I should be redirected to the devices page
  # Scenario: Failed login with invalid credentials
  #   When I enter username "invalid@email.com"
  #   And I enter password "wrongpassword"
  #   And I click the login button
  #   Then I should see an error message
  #   And I should remain on the login page
  # Scenario: Login with empty credentials
  #   When I click the login button without entering credentials
  #   Then I should see validation error messages
  #   And I should remain on the login page
  # Scenario: Forgot password link functionality
  #   When I click on the "Forgot Password?" link
  #   Then I should be redirected to the forgot password page
