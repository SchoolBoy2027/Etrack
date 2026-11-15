
/**
 * File: DateUtils.ts
 * Purpose: Centralized date utility functions.
 *
 * Description:
 * Provides reusable methods for converting and formatting
 * dates using the YYYY-MM-DD format.
 */

class DateUtils {

    /**
     * stringToDate()
     * Converts a YYYY-MM-DD string to a Date object.
     * Returns null if the string is not a valid calendar date.
     *
     * @param value - Date string to convert.
     * @returns Date | null
     */
    public static stringToDate(value: string): Date | null {

        const parts = value.split("-");

        if (parts.length !== 3) {
            return null;
        }

        const year = Number(parts[0]);
        const month = Number(parts[1]);
        const day = Number(parts[2]);

        const date = new Date(year, month - 1, day);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        const formattedDate = DateUtils.dateToString(date);

        if (formattedDate !== value) {
            return null;
        }

        return date;
    }

    /**
     * dateToString()
     * Converts a Date object to a YYYY-MM-DD string
     * using the local calendar date.
     *
     * @param date - Date object to format.
     * @returns string
     */
    public static dateToString(date: Date): string {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    /**
     * currentDate()
     * Returns the current local date as a YYYY-MM-DD string.
     *
     * @returns Current date string.
     */
    public static currentDate(): string {
        const today = new Date();
        return DateUtils.dateToString(today);
    }
    /**
     * currentTimestamp()
     * Returns the current timestamp in milliseconds.
     *
     * @returns Current timestamp as a number.
     */
    public static currentTimestamp(): number {
        return Date.now();
    }
}

export default DateUtils;
