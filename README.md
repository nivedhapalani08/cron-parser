# Cron Expression Parser

A command-line application that parses cron expressions and displays their scheduled execution times in a readable format.

## Description

This application takes a cron expression as input and expands each field to show the specific times at which it will run. It handles the standard cron format with five time fields (minute, hour, day of month, month, and day of week) plus a command.

## Requirements
- Node.js version 14.0.0 or higher
- npm version 6.0.0 or higher

## Example

Input:
*/15 0 1,15 * 1-5 /usr/bin/find

Output:
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find

## Installation
git clone https://github.com/nivedhapalani08/cron-parser.git
cd cron-parser
npm install

## Usage
node src/main.js "*/15 0 1,15 * 1-5 /usr/bin/find"

## Testing
npm test

## Supported Format
- Minute: 0-59
- Hour: 0-23
- Day of Month: 1-31
- Month: 1-12
- Day of Week: 0-6 or 1-7 (0 or 7 represents Sunday)
- Command: Any valid command string

## Limitations
- Does not support special time strings (@yearly, @monthly)
- Does not handle extended cron syntax
