

/**
 * File: Expense.js
 * Purpose: Defines the expense entry form fields for FormBuilder.
 *
 * Usage:
 * 1. Import Expense into the component using FormBuilder.
 *
 *    import Expense from "@/data/Expense";
 *
 * 2. Pass Expense to FormBuilder as the field configuration.
 *
 *    <FormBuilder fields={Expense} />
 *
 * Fields:
 * - description: Multiline text input (required)
 * - amount: Currency input (required)
 * - expense_date: Date input (required)
 *
 * Notes:
 * - This file defines form fields only.
 * - FormBuilder handles input rendering and validation.
 * - ExpenseItem handles displaying saved expense records.
 */

const Expense = [
    {
        name: "description",
        label: "Description",
        type: "multiline",
        required: true
    },
    {
        name: "amount",
        label: "Amount",
        type: "currency",
        required: true
    },
    {
        name: "expense_date",
        label: "Date",
        type: "date",
        required: true
    }
];

export default Expense;