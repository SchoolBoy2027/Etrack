/**
 * File: FormBuilderStyles.ts
 * Purpose: Defines the styles used by the reusable FormBuilder component.
 *
 * Description:
 * Contains the React Native StyleSheet definitions for form layout,
 * input fields, labels, buttons, validation messages, and other
 * visual elements used by FormBuilder.tsx.
 *
 * Usage:
 * import styles from "./FormBuilderStyles";
 *
 * Keeping styles separate allows FormBuilder.tsx to focus on
 * form rendering, input handling, and validation logic.
 */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      container: {
        padding: 16,
         backgroundColor: "#0b4a7e",
    },
    field: {
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
        color: "white",
    },
    required: {
        color: "red",
        fontSize: 20,
        fontWeight: "bold",
        
    },
    input: {
        borderWidth: 1,
        borderColor: "#777",
        backgroundColor: "#dbe7f1",
        color:"black",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        minHeight: 45
    },
    multiline: {
        minHeight: 100
    },
    error: {
        color: "red",
        marginTop: 5
    },
    button: {
        backgroundColor: "#333",
        padding: 12,
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 25
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        maxHeight: "70%"
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    }

});

export default styles;