
/**
 * File: ExpenseItem.ts
 * Purpose: Defines the styles used by the ExpenseItem component.
 *
 * Description:
 * Contains React Native StyleSheet definitions for expense
 * display, horizontal and vertical layouts, labels, values,
 * and the delete button.
 *
 * Usage:
 * import styles from "../../constants/ExpenseItem";
 */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 1,
        backgroundColor: "#e4eff8",
        padding:5,
        alignItems: "center",
    },
    horizontalContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dbe7f1",
        padding:5,

    },
    horizontalField: {
        flex: 1,
        minWidth: 0,
        marginRight: 1
    },
    horizontalValue: {
        flexShrink: 1
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 1
    },
    descriptionField: {
        flex: 2
        },
    amountField: {
        marginLeft:2,
        flex: 1
        },
    dateField: {
        flex: 1
        },
    date: {
        fontSize: 16,
        marginBottom: 1,
        flex: 1,
    },
    description: {
        fontSize: 16,
        flexWrap: "wrap",
        marginBottom: 1,
        flex: 2,
    },
    value: {
        fontSize: 16,
        marginBottom: 1,
        marginLeft:2,
        flex: 1,
    },
    deleteButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
    }
});

export default styles;
