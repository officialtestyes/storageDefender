module.exports = {
    default: {
        require: ['features/step-definitions/*.js', 'features/support/*.js'],
        format: ['progress-bar', 'html:cucumber-report.html'],
        formatOptions: { snippetInterface: 'async-await' }
    }
}; 