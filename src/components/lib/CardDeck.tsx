
/**
 * File: CardDeck.tsx
 * Purpose: Universal component for displaying cards in a grid or list.
 *
 * Usage:
 * 1. Import CardDeck into the parent component.
 *
 *    import CardDeck from "@/components/lib/CardDeck";
 *
 * 2. Create an array of card objects containing an id and item.
 *
 *    const cards = [
 *        { id: "1", item: <MyCard /> },
 *        { id: "2", item: <MyCard /> }
 *    ];
 *
 * 3. Pass the card array to CardDeck.
 *
 *    <CardDeck cards={cards} listStyle={true} />
 *
 * Props:
 * - cards: Required array of { id, item } objects.
 * - listStyle: true = scrollable list, false = grid (default).
 * - cardsPerPage: Number of cards per grid page (default 6).
 *
 * Features:
 * - Responsive grid based on screen orientation.
 * - Scrollable list display.
 * - Grid pagination with Previous and Next buttons.
 * - Supports any React component as a card item.
 *
 * Notes:
 * - CardDeck handles layout and pagination only.
 * - Each card component handles its own content and events.
 * - CardDeck does not handle navigation or data processing.
 */


import { useState, type ReactNode } from "react";
import styles from "@/constants/CardDeckStyles";
import {
    FlatList,
    Pressable,
    Text,
    View,
    useWindowDimensions
} from "react-native";

interface CardItem {
    id: string;
    item: ReactNode;
}

interface CardDeckProps {
    cards: CardItem[];
    listStyle?: boolean;
    cardsPerPage?: number;
}

/**
 * CardDeck is a universal display component.
 * The parent supplies the card contents.
 *
 * @param cards         Array of card items to display
 * @param listStyle     List when true, grid when false
 * @param cardsPerPage  Number of cards per grid page
 * @returns Displayed cards in a grid or list layout
 */
const CardDeck = ({
    cards,
    listStyle = false,
    cardsPerPage = 6
}: CardDeckProps) => {

    const [currentPage, setCurrentPage] = useState<number>(0);
    const { width, height } = useWindowDimensions();

    let visibleCards = cards;

    if (!listStyle) {
        const startIndex = currentPage * cardsPerPage;
        visibleCards = cards.slice(startIndex, startIndex + cardsPerPage);
    }

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const containerPadding = 20;

    let numColumns = 1;

    let cardWidth = width - containerPadding;
    let cardHeight = (height - (containerPadding * 4)) / cardsPerPage;

    if (!listStyle) {
        numColumns = width > height ? 6 : 2;
        cardHeight = (height - containerPadding * 10) / (cardsPerPage / numColumns);
        cardWidth = (width - containerPadding -
            ((numColumns - 1) * containerPadding)) / numColumns;
    }

    /**
     * Displays the React element supplied by the parent.
     */
    const renderCard = ({ item }: { item: CardItem }) => {
        return (
            <View
                style={[
                    styles.card,
                    listStyle && styles.listCard,
                    { width: cardWidth },
                    !listStyle && { height: cardHeight }
                ]}
            >
                {item.item}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                key={numColumns}
                data={visibleCards}
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                numColumns={numColumns}
                columnWrapperStyle={
                    numColumns > 1 ? styles.cardRow : undefined
                }
                contentContainerStyle={styles.cardGrid}
                scrollEnabled={listStyle}
            />

            {!listStyle && totalPages > 1 && (
                <View style={styles.pagination}>
                    <Pressable
                        style={[
                            styles.paginationButton,
                            currentPage === 0 && { opacity: 0 }
                        ]}
                        disabled={currentPage === 0}
                        onPress={() => setCurrentPage(currentPage - 1)}
                    >
                        <Text style={styles.paginationButtonText}>
                            Previous
                        </Text>
                    </Pressable>

                    <Text style={styles.pageText}>
                        Page {currentPage + 1} of {totalPages}
                    </Text>

                    <Pressable
                        style={[
                            styles.paginationButton,
                            currentPage === totalPages - 1 && { opacity: 0 }
                        ]}
                        disabled={currentPage === totalPages - 1}
                        onPress={() => setCurrentPage(currentPage + 1)}
                    >
                        <Text style={styles.paginationButtonText}>
                            Next
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};


export type { CardItem };
export default CardDeck;
