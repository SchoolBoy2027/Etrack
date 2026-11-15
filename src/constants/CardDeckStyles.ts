
/**
 * File: CardDeckStyle.ts
 * Purpose: Defines the styles used by the reusable CardDeck component.
 *
 * Description:
 * Contains React Native StyleSheet definitions for card layout,
 * grid and list displays, pagination controls, and card spacing.
 *
 * Usage:
 * import styles from "../../constants/CardDeckStyle";
 */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 5,
          backgroundColor: "#36648B",
         alignItems: "center",
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        backgroundColor: "transparent"
    },

    paginationButton: {
        backgroundColor: "light-blue",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    paginationButtonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    },

    pageText: {
        color: "white",
        fontSize: 16
    },

    cardGrid: {
        paddingBottom: 10
    },

    cardRow: {
        flexDirection: "row",
        gap: 5,
        marginBottom: 5
    },

    card: {
        backgroundColor: "#36648B",
        borderWidth: 1,
        borderColor: "#36648B",
        borderRadius: 5,
        padding: 1,
        elevation:0
    },

    listCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }

   
});

export default styles;
