
/**
 * File: index.tsx
 * Purpose: Main screen for ETrack.
 *
 * Displays the expense list with a title bar
 * containing Back and Add Expense buttons.
 */
import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ExpenseDisplay from "@/components/ExpenseOutput/ExpenseDisplay";
import DateUtils from "@/components/lib/DateUtils";
import testdata from "@/data/testData";

const HomeScreen = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseMessage, setExpenseMessage] = useState<string>("");
  /**
   * Clears the expense message 60 seconds after it changes.
   */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (expenseMessage.length > 0) {
      timer = setTimeout(() => {
        setExpenseMessage("");
      }, 60000);
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [expenseMessage]);

  const router = useRouter();

  const handleBack = () => {
    console.log('back pressed');
    if (showExpenseForm) {
      setShowExpenseForm(false);

      return;
    }

    if (router.canGoBack()) {
      router.back();
    }
  };

  const [expenses, setExpenses] = useState([...testdata]);

  const handleAddExpense = () => {
    setSelectedExpense(undefined);
    setShowExpenseForm(true);
  };


  /**
   * handleSubmitExpense()
   * Adds a new expense or updates an existing expense.
   *
   * @param values - Validated form values.
   * @returns void
   */
  const handleSubmitExpense = (values: Record<string, string>): void => {

    let updatedExpenses = [...expenses];

    if (selectedExpense) {
      const expenseIndex = updatedExpenses.findIndex(
        (expense) => expense.expense_id === selectedExpense.expense_id
      );

      if (expenseIndex !== -1) {
        updatedExpenses[expenseIndex] = {
          ...updatedExpenses[expenseIndex],
          description: values.description,
          amount: Number(values.amount),
          expense_date: values.expense_date
        };
      }

      setExpenseMessage("Expense updated successfully.");

    } else {
      const newExpense = {
        expense_id: String(DateUtils.currentTimestamp()),
        description: values.description,
        amount: Number(values.amount),
        expense_date: values.expense_date
      };

      updatedExpenses.push(newExpense);

      setExpenseMessage("Expense added successfully.");
    }

    setExpenses(updatedExpenses);
    setSelectedExpense(undefined);
    setShowExpenseForm(false);

    return;
  };


  const handleDeleteExpense = (expenseId: string) => {
    setExpenses((currentExpenses) => {
      return currentExpenses.filter((expense) => {
        return expense.expense_id !== expenseId;
      });
    });
    setSelectedExpense(undefined);
    setShowExpenseForm(false);
    setExpenseMessage("Expense deleted successfully.");
  };

  const [selectedExpense, setSelectedExpense] =
    useState<(typeof expenses)[number] | undefined>(undefined);

  const handleCardPress = (expenseId: string) => {
    const expense = expenses.find((item) => {
      return item.expense_id === expenseId;
    });

    if (expense) {
      setSelectedExpense(expense);
      setShowExpenseForm(true);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.titleBar}>
          <Pressable onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>

          <Text style={styles.title}>ETrack</Text>

          <Pressable onPress={handleAddExpense}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </Pressable>
        </View>

        {showExpenseForm ? (
          <ExpenseForm expense={selectedExpense} onSubmit={handleSubmitExpense} onDelete={handleDeleteExpense} />
        ) : (
          <ExpenseDisplay expenses={expenses} onCardPress={handleCardPress} onDelete={handleDeleteExpense} message={expenseMessage} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#333"
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },

  buttonText: {
    color: "white",
    fontSize: 16
  }
});

export default HomeScreen;
