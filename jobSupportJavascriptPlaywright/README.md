# Cucumber Playwright Test Framework

This project contains automated tests for the login functionality using Cucumber.js and Playwright with JavaScript.

## Project Structure

```
├── features/
│   ├── login.feature                 # Feature file with Gherkin scenarios
│   ├── step-definitions/
│   │   └── login-steps.js           # Step definitions for login scenarios
│   └── support/
│       ├── hooks.js                 # Cucumber hooks and world setup
│       └── world.js                 # Shared utilities and configuration
├── pages/
│   └── LoginPage.js                 # Page Object Model for login page
├── screenshots/                     # Screenshots of failed tests
├── cucumber-report.html             # HTML test report
├── package.json                     # Project dependencies
├── cucumber.js                      # Cucumber configuration
└── README.md                        # This file
```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Configuration

The framework is configured with the following settings:

- **Base URL**: `https://backoffice-stg.tod-multiverse.com/devices`
- **Default Mode**: Headless (as per user preference)
- **Browser**: Chromium
- **Viewport**: 1280x720
- **Test Credentials**:
  - Username: `sadmin@storage-defender.com`
  - Password: `test@123`

## Running Tests

### Run all tests in headless mode (default)
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests with HTML report
```bash
npm run report
```

### Run specific scenarios
```bash
npx cucumber-js --tags "@login"
```

## Test Scenarios

The framework includes the following test scenarios:

1. **Successful Login**: Tests login with valid credentials
2. **Failed Login**: Tests login with invalid credentials
3. **Empty Credentials**: Tests validation for empty fields
4. **Forgot Password**: Tests the forgot password link functionality

## Features

- **Page Object Model**: Centralized page objects with reusable methods
- **Screenshot Capture**: Automatic screenshots on test failures
- **HTML Reporting**: Detailed test reports
- **Headless/Headed Mode**: Configurable browser visibility
- **Error Handling**: Robust error handling and timeouts
- **World Parameters**: Configurable test parameters
- **Reusable Methods**: Page-specific methods for common actions

## Page Elements

The login page contains the following elements (based on the provided HTML):

- Username input field (`input[type="text"]`)
- Password input field (`input[type="password"]`)
- Login button (`button[type="submit"]`)
- Cancel button (`button:has-text("Cancel")`)
- Forgot Password link (`a:has-text("Forgot Password?")`)
- Login title (`.v-toolbar__title`)

## Customization

### Adding New Scenarios

1. Add new scenarios to `features/login.feature`
2. Implement step definitions in `features/step-definitions/login-steps.js`
3. Add any new methods to `pages/LoginPage.js` if needed

### Modifying Configuration

- Update `features/support/hooks.js` for browser configuration
- Modify `features/support/world.js` for test data and utilities
- Update `cucumber.js` for Cucumber-specific settings

### Adding New Page Objects

1. Create new page object files in `pages/` directory
2. Define selectors and helper methods in the page class
3. Import and use in step definitions

## Troubleshooting

### Common Issues

1. **Element not found**: Check if selectors match the current page structure
2. **Timeout errors**: Increase timeout values in step definitions
3. **Browser issues**: Ensure Playwright browsers are installed

### Debug Mode

Run tests with additional logging:
```bash
DEBUG=pw:api npm test
```

## Contributing

1. Follow the existing code structure
2. Add appropriate error handling
3. Include screenshots for UI changes
4. Update documentation for new features

## License

ISC 