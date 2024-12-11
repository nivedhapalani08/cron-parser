class CronParser {
    constructor(cronString) {
        const parts = cronString.split(' ');
        if (parts.length !== 6) {
            throw new Error("Invalid cron string format. Expected 6 parts.");
        }

        this.minute = parts[0];
        this.hour = parts[1];
        this.dayOfMonth = parts[2];
        this.month = parts[3];
        this.dayOfWeek = parts[4];
        this.command = parts[5];
    }

    _expandRange(field, minVal, maxVal) {
        if (field === '*') {
            return Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal);
        }

        if (field.includes(',')) {
            return field.split(',').map(x => parseInt(x)).sort((a, b) => a - b);
        }

        if (field.includes('-')) {
            const [start, end] = field.split('-').map(x => parseInt(x));
            return Array.from({ length: end - start + 1 }, (_, i) => i + start);
        }

        if (field.includes('/')) {
            const step = parseInt(field.split('/')[1]);
            return Array.from({ length: Math.floor((maxVal - minVal) / step) + 1 }, 
                (_, i) => minVal + (i * step));
        }

        return [parseInt(field)];
    }

    expand() {
        return {
            'minute': this._expandRange(this.minute, 0, 59),
            'hour': this._expandRange(this.hour, 0, 23),
            'day of month': this._expandRange(this.dayOfMonth, 1, 31),
            'month': this._expandRange(this.month, 1, 12),
            'day of week': this._expandRange(this.dayOfWeek, 1, 5),
            'command': this.command
        };
    }
}

module.exports = CronParser;