
/**
 * File: FormValidator.ts
 * Purpose: Reusable validation for FormBuilder.
 *
 * Description:
 * Validates fields using FormInput[] definitions.
 * Returns a boolean and provides getErrors()
 * to retrieve validation errors.
 */

import DateUtils from "./DateUtils";
import type { FormInput } from "./FormBuilder";

/**
 * FormValidator
 *
 * Provides reusable validation for dynamically generated form fields.
 *
 * Validates required fields and checks input values according to
 * their configured data types:
 *
 * - text: Validates length and control characters.
 * - multiline: Validates length and control characters.
 * - currency: Validates numeric format and positive amounts.
 * - integer: Validates whole numbers, including negative values.
 * - date: Validates date strings using DateUtils.
 * - select: Validates values against predefined options.
 *
 * Validation errors are stored by field name and can be retrieved
 * through the Errors getter.
 *
 * Note:
 * Client-side validation improves data integrity but does not
 * replace server-side validation or database injection protection.
 *
 * @example
 * const validator = new FormValidator();
 * const valid = validator.validate(inputs, values);
 * const errors = validator.Errors;
 */
class FormValidator {

    private isValid: boolean = false;
    private errors: Record<string, string> = {};

    /**
     * errors
     * Returns the error list.
     *
     * @returns Record<string, string> - Validation errors.
     */
    public get Errors(): Record<string, string> {
        return this.errors;
    }

    /**
     * validate 
     * @param inputs 
     * @param values 
     * @returns 
     */
    public validate(
        inputs: FormInput[],
        values: Record<string, string>
    ): boolean {

        this.errors = {};           //clear the error array

        inputs.forEach((input) => {
            const value = values[input.name] || "";

            if (input.required && value.trim().length === 0) {
                this.errors[input.name] = `${input.label} is required`;
            } else {
                switch (input.type) {
                    case "currency":
                        this.validateCurrency(input, value);
                        break;

                    case "integer":
                        this.validateInteger(input, value);
                        break;

                    case "number":
                        this.validateNumber(input, value);
                        break;

                    case "date":
                        this.validateDate(input, value);
                        break;

                    case "select":
                        this.validateSelect(input, value);
                        break;

                    case "text":
                        this.validateText(input, value);

                    case "multiline":
                        this.validateMultiline(input, value);
                        break;
                }

            }
        });


        this.isValid = (Object.keys(this.errors).length === 0);
        return this.isValid;
    }

    /**
     * validateNumber()
     * Validates a floating-point numeric value.
     * Allows positive numbers, negative numbers, zero,
     * and decimal values.
     *
     * @param input - Field configuration.
     * @param value - Value to validate.
     * @returns void
     */
    private validateNumber(input: FormInput, value: string): void {

        const number = Number(value);

        if (Number.isNaN(number)) {
            this.errors[input.name] = "Value must be numeric";
            return;
        }

        if (!Number.isFinite(number)) {
            this.errors[input.name] = "Value must be finite";
            return;
        }

        const validFormat = /^-?\d+(\.\d+)?$/.test(value);

        if (!validFormat) {
            this.errors[input.name] = "Invalid number format";
            return;
        }
    }

    /**
     * validateCurrency()
     * Validates that a currency amount is numeric, correctly
     * formatted, and greater than zero.
     *
     * @param input - Field configuration.
     * @param value - Value to validate.
     * @returns void
     */
    private validateCurrency(input: FormInput, value: string): void {

        // Convert to number
        const amount = Number(value);

        // Check numeric value
        if (Number.isNaN(amount)) {
            this.errors[input.name] = "Currency amount must be numeric";
            return;
        }

        // Check currency format
        const validFormat = /^\d+(\.\d{1,2})?$/.test(value);

        if (!validFormat) {
            this.errors[input.name] = "Invalid currency format";
            return;
        }

        // Check positive amount
        if (amount <= 0) {
            this.errors[input.name] = "Currency amount must be greater than zero";
            return;
        }
    }
    /**
     * validateInteger()
     * Validates that a value is a whole number.
     * Allows positive numbers, negative numbers, and zero.
     *
     * @param input - Field configuration.
     * @param value - Value to validate.
     * @returns void
     */
    private validateInteger(input: FormInput, value: string): void {

        // Convert to number
        const number = Number(value);

        // Check numeric value
        if (Number.isNaN(number)) {
            this.errors[input.name] = "Value must be numeric";
            return;
        }

        // Check integer format
        const validFormat = /^-?\d+$/.test(value);

        if (!validFormat) {
            this.errors[input.name] = "Invalid integer format";
            return;
        }

        // Check whole number
        if (!Number.isInteger(number)) {
            this.errors[input.name] = "Value must be a whole number";
            return;
        }
    }


    /**
     * validateDate()
     * Validates a date string in YYYY-MM-DD format.
     *
     * @param input - Field configuration.
     * @param value - Date string to validate.
     * @returns void
     */
    private validateDate(input: FormInput, value: string): void {

        const date = DateUtils.stringToDate(value);

        if (date === null) {
            this.errors[input.name] = "Invalid date";
            return;
        }
    }

    /**
     * validateSelect()
     * Validates that a selected value exists in the
     * field's predefined options.
     *
     * @param input - Field configuration containing options.
     * @param value - Selected value to validate.
     * @returns void
     */
    private validateSelect(input: FormInput, value: string): void {
        const exists = (input.options || []).some((option) => {
            return option.value === value;
        });

        if (!exists) {
            this.errors[input.name] = "Invalid selection";
        }
    }

    /**
     * validateText()
     * Validates single-line text input.
     *
     * @param input - Field configuration.
     * @param value - Text to validate.
     * @returns void
     */
    private validateText(input: FormInput, value: string): void {

        if (value.length > 255) {
            this.errors[input.name] = "Text cannot exceed 255 characters";
            return;
        }

        if (/[\x00-\x1F\x7F]/.test(value)) {
            this.errors[input.name] = "Text contains invalid control characters";
            return;
        }
    }

    /**
     * validateMultiline()
     * Validates multiline text input.
     *
     * @param input - Field configuration.
     * @param value - Text to validate.
     * @returns void
     */
    private validateMultiline(input: FormInput, value: string): void {

        if (value.length > 2000) {
            this.errors[input.name] = "Text cannot exceed 2000 characters";
            return;
        }

        if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(value)) {
            this.errors[input.name] = "Text contains invalid control characters";
            return;
        }
    }

}

export default FormValidator;
