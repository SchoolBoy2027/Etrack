/**
 * File: ExpenseForm.tsx
 * Purpose: Handles adding and updating expenses.
 *
 * Usage:
 * <ExpenseForm />
 * <ExpenseForm expense={selectedExpense, onSubmit, onDelete } />
 */
import { Pressable, Text, View } from "react-native";
import DateUtils from "../lib/DateUtils";
import ExpenseFormBuilder from "./ExpenseFormBuilder";

/**
 * Expense
 *
 * Defines the data structure for an individual expense record.
 *
 * Each record contains a unique identifier, a description,
 * a numeric amount, and the date of the expense.
 *
 * @property expense_id - Unique identifier assigned to the
 * expense record.
 *
 * @property description - Text describing the expense.
 *
 * @property amount - Numeric value representing the expense
 * amount, stored as a JavaScript number.
 *
 * @property expense_date - Date associated with the expense,
 * stored as a string in YYYY-MM-DD format.
 */
interface Expense {
    expense_id: string;
    description: string;
    amount: number;
    expense_date: string;
}

/**
 * ExpenseFormProps
 *
 * Defines the properties used to configure and control
 * the ExpenseForm component.
 *
 * Supports creating new expense records, editing existing
 * records, and deleting records through parent callbacks.
 *
 * @property expense - Optional existing expense record used
 * to populate the form when editing. If omitted, the form
 * initializes with default values for a new record.
 *
 * @property onSubmit - Optional callback executed when valid
 * form data is submitted. Receives field values as a
 * name/value record.
 *
 * @property onDelete - Optional callback executed when an
 * expense is deleted. Receives the expense's unique identifier.
 */
interface ExpenseFormProps {
    expense?: Expense;
    onSubmit?: (values: Record<string, string>) => void;
    onDelete?: (expenseId: string) => void;
}


/**
 * ExpenseForm
 *
 * React Native component for creating, editing, and deleting
 * expense records.
 *
 * Uses FormBuilder to render input fields and validate user input.
 * Supports initializing form fields with existing record values
 * or default values when creating a new record.
 *
 * Handles form submission and deletion through callbacks
 * provided by the parent component.
 *
 * @param expense - Optional existing expense record to edit.
 * @param onSubmit - Callback executed when valid form data is submitted.
 * @param onDelete - Callback executed when an expense is deleted.
 *
 * @returns React Native expense form component.
 */
const ExpenseForm = ({ expense, onSubmit, onDelete }: ExpenseFormProps) => {

    const initialValues: Record<string, string> = {
        expense_date: DateUtils.currentDate()
    };

    let submitButtonText = "Add Expense";

    if (expense) {
        initialValues.description = expense.description;
        initialValues.amount = String(expense.amount);
        initialValues.expense_date = expense.expense_date;

        submitButtonText = "Update Expense";
    }

    const handleSubmit = (values: Record<string, string>) => {
        if (onSubmit) {
            onSubmit(values);
        }
    };

    return (
        <View>
            <ExpenseFormBuilder
                initialValues={initialValues}
                submitButtonText={submitButtonText}
                onSubmit={handleSubmit}
            />

            {/* Add the delete button at the bottom */}
            {expense && (
                <Pressable
                    onPress={() => {
                        if (onDelete) {
                            onDelete(expense.expense_id);
                        }
                    }}
                    style={{
                        backgroundColor: "#B22222",
                        padding: 12,
                        margin: 10,
                        borderRadius: 5,
                        alignItems: "center"
                    }}
                >
                    <Text style={{ color: "white", fontSize: 16 }}>
                        Delete Expense
                    </Text>
                </Pressable>
            )}
        </View>
    );



};

export default ExpenseForm;