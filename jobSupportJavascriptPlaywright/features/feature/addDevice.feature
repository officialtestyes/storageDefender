@regression
Feature: Add Device Functionality
  As a user
  I want to be able to add new devices to the system
  So that I can manage device inventory

  Background:
    Given I am on the login page
    When I enter username "sadmin@storage-defender.com"
    And I enter password "test@123"
    And I click the login button
    Then I should be logged in successfully

  @Testing-addDevice-success
  Scenario: Successfully add a new device with all required fields
    Given I navigate to the devices page
    When I click on the "Devices" menu item
    And I click the "Add" button
    #And I enter external device ID "random"
    And I enter external device ID with dash format "random"
    And I select type "XP"
    And I select subtype "Defender"
    And I enter short ID as random
    And I select status "OK"
    And I select disposition "In Service"
    And I select assigned organization "StorageDefender"
    And I click the Add Device button

    
  # Scenario: Add device with minimal required fields
  #   Given I navigate to the devices page
  #   When I click on the "Devices" menu item
  #   And I click the "Add" button
  #   And I enter external device ID "123456"
  #   And I select type "XP"
  #   And I select subtype "Defender"
  #   And I select status "OK"
  #   And I select disposition "In Service"
  #   And I click the Add Device button
  #   Then I should see a success message
  #   And the device should be added successfully
  # Scenario: Validation error when external device ID is empty
  #   Given I navigate to the devices page
  #   When I click on the "Devices" menu item
  #   And I click the "Add" button
  #   And I leave external device ID empty
  #   And I click the Add Device button
  #   Then I should see validation error for external device ID
  #   And I should remain on the add device page
  # Scenario: Validation error when type is not selected
  #   Given I navigate to the devices page
  #   When I click on the "Devices" menu item
  #   And I click the "Add" button
  #   And I enter external device ID "789012"
  #   And I leave type unselected
  #   And I click the Add Device button
  #   Then I should see validation error for type
  #   And I should remain on the add device page
