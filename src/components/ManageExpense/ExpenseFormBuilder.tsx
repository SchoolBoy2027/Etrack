
/**
 * File: ExpenseFormBuilder.tsx
 * Purpose: Generates the expense entry form using FormBuilder.
 *
 * Usage:
 *    <ExpenseFormBuilder onSubmit={handleSubmit} />
 *
 * Form Fields:
 * - description: Multiline text
 * - amount: Currency
 * - expense_date: Date
 *
 * Notes:
 * - Field definitions are maintained in data/Expense.js.
 * - FormBuilder handles rendering and validation.
 * - Parent handles submitted expense data.
 * - onSubmit and submitButton text are passed through.  
 */

import React from "react";
import FormBuilder, { type FormInput } from "../lib/FormBuilder";
import Expense from "../../data/Expense";

interface ExpenseFormBuilderProps {
    onSubmit: (values: Record<string, string>) => void;
    initialValues?: Record<string, string>;
    submitButtonText?: string;
}

const ExpenseFormBuilder = ({
    onSubmit,
    initialValues = {},
    submitButtonText = "Submit"
}: ExpenseFormBuilderProps) => {
    return (
        <FormBuilder
            inputs={Expense as FormInput[]}
            initialValues={initialValues}
            submitButtonText={submitButtonText}
            onSubmit={onSubmit}
        />
    );
};

export default ExpenseFormBuilder;