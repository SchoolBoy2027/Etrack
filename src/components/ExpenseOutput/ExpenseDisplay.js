

import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import CardDeck from "../lib/CardDeck";
import ExpenseList from "./ExpenseList";

const ExpenseDisplay = ({
    expenses,
    message = "",
    onCardPress = (expenseId) => {},
    onDelete = (expenseId) => {}
}) => {

   

    const [showAll, setShowAll] = useState(false);

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    const filteredExpenses = expenses.filter((expense) => {
        if (showAll) {
            return true;
        }

        const expenseDate = new Date(expense.expense_date);
        return expenseDate >= cutoffDate;
    });

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        let result = 0;

        if (a.expense_date > b.expense_date) {
            result = -1;
        } else if (a.expense_date < b.expense_date) {
            result = 1;
        }

        return result;
    });

    const cards = ExpenseList({
        expenses: sortedExpenses,
        onCardPress,
        onDelete
    });

    return (
        <View style={styles.container}>

            <View style={styles.menuBar}>
                <Pressable
                    style={styles.toggleButton}
                    onPress={() => setShowAll(!showAll)}
                >
                    <Text style={styles.toggleText}>
                        {showAll ? "All" : "Last 30 Days"}
                    </Text>
                </Pressable>
                {message.length > 0 && (
                    <Text style={styles.message}>{message}</Text>
                )}
            </View>

            <CardDeck
                cards={cards}
                listStyle={true}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    menuBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#36648B"
    },

    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5
    },

    toggleText: {
        color: "white",
        fontSize: 14
    },

    message: {
        textAlign: "center",
        padding: 10,
        fontSize: 16,
        color: "white",
    },
});

export default ExpenseDisplay;
