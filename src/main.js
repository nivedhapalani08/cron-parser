#!/usr/bin/env node

const CronParser = require('./cronParser');

function formatOutput(expandedValues) {
    Object.entries(expandedValues).forEach(([field, values]) => {
        if (field === 'command') {
            console.log(`${field.padEnd(14)} ${values}`);
        } else {
            const valuesStr = values.join(' ');
            console.log(`${field.padEnd(14)} ${valuesStr}`);
        }
    });
}

function main() {
    if (process.argv.length !== 3) {
        console.log('Usage: node main.js "<cron_string>"');
        process.exit(1);
    }

    try {
        const parser = new CronParser(process.argv[2]);
        const expanded = parser.expand();
        formatOutput(expanded);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
