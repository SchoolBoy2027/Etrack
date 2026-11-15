import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({
    expenses,
    onCardPress = (expenseId) => {},
    onDelete = (expenseId) => {}
}) => {

    const cards = expenses.map((expense) => {
        return {
            id: String(expense.expense_id),
            item: (
                <ExpenseItem
                    description={expense.description}
                    amount={expense.amount}
                    date={expense.expense_date}
                    onPress={() => onCardPress(expense.expense_id)}
                    onDelete={() => onDelete(expense.expense_id)}
                />
            )
        };
    });

    return cards;
};

export default ExpenseList;
