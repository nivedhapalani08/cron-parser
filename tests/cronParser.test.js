const CronParser = require('../src/cronParser');

describe('CronParser', () => {
    test('basic cron string', () => {
        const parser = new CronParser('*/15 0 1,15 * 1-5 /usr/bin/find');
        const result = parser.expand();

        expect(result.minute).toEqual([0, 15, 30, 45]);
        expect(result.hour).toEqual([0]);
        expect(result['day of month']).toEqual([1, 15]);
        expect(result.month).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        expect(result['day of week']).toEqual([1, 2, 3, 4, 5]);
        expect(result.command).toBe('/usr/bin/find');
    });

    test('invalid cron string', () => {
        expect(() => {
            new CronParser('* * * *');
        }).toThrow('Invalid cron string format');
    });

    test('simple values', () => {
        const parser = new CronParser('1 2 3 4 5 /test/command');
        const result = parser.expand();

        expect(result.minute).toEqual([1]);
        expect(result.hour).toEqual([2]);
        expect(result['day of month']).toEqual([3]);
        expect(result.month).toEqual([4]);
        expect(result['day of week']).toEqual([5]);
        expect(result.command).toBe('/test/command');
    });
});