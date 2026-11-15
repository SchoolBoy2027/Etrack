
import React from "react";
import { View, Text, Pressable} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../constants/ExpenseItem";
const ExpenseItem = ({
    description,
    amount,
    date,
    onPress,
    onDelete,
    horizontal = true
}) => {
    return (
        <Pressable
            style={[
                styles.container,
                horizontal && styles.horizontalContainer
            ]}
            onPress={onPress}
        >
            <View style={horizontal && styles.dateField}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.date}>{date}</Text>
            </View>

            <View style={horizontal && styles.descriptionField}>
                <Text style={styles.label}>Description</Text>
                <Text style={[
                    styles.description,
                    horizontal && styles.horizontalValue
                ]}>
                    {description}
                </Text>
            </View>

            <View style={horizontal && styles.amountField}>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.value}>
                    {Number(amount).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}
                </Text>
            </View>
            <Pressable
                onPress={(event) => {
                    event.stopPropagation();
                    if (onDelete) {
                        onDelete();
                    }
                }}
                style={styles.deleteButton}
            >
                <Ionicons name="trash-outline" size={24} color="#e22727" />
            </Pressable>
        </Pressable>);
};


export default ExpenseItem;
