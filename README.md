# ETrack

ETrack is an expense-tracking mobile app built with **Expo**, **React Native**, and **TypeScript**. It provides an expense list, date filtering, and forms to create, update, and delete expenses.

## Features

- Add, view, edit, and delete expenses.
- Switch between **All** and **Last 30 Days** expenses.
- Display filtered expenses in reverse date order (newest first).
- Show CRUD confirmation messages that disappear after 30 seconds.
- Use reusable form, validation, date, and card components.
- Respect the Android status-bar safe area.

## Run the app

Install dependencies and start Expo from the project directory:

## bash
npm install
npx expo start
 
Press **a** in the Expo terminal to launch on an Android emulator. Alternatively:

## bash
npx expo start --android


## Project structure
```text 
src/
├── app/
│   └── index.tsx                  # HomeScreen, state and CRUD handlers
├── components/
│   ├── ExpenseOutput/
│   │   ├── ExpenseDisplay.js      # Filter, sort, message and list display
│   │   ├── ExpenseList.js         # Expense cards
│   │   └── ExpenseItem.js         # Individual expense card
│   ├── ManageExpense/
│   │   ├── ExpenseForm.tsx        # Add/edit form and delete action
│   │   └── ExpenseFormBuilder.tsx # Expense field configuration
│   └── lib/
│       ├── CardDeck.tsx           # Reusable grid/list card presentation
│       ├── DateUtils.ts           # Central date operations
│       ├── FormBuilder.tsx        # Schema-driven form rendering
│       └── FormValidator.ts      # Form validation
├── constants/
│   ├── CardDeckStyles.ts          # CardDeck component styles
│   └── FormBuilderStyles.ts       # FormBuilder component styles
└── data/
    ├── Expense.js                # Expense field definitions
    └── testData                  # Initial sample expenses
```
> Verify actual filenames and extensions against your repository. An earlier version of the code used the spelling DateUtlils in an import.

## Application components

### HomeScreen — src/app/index.tsx

Owns the expense array, selected expense, form visibility, and confirmation message. CRUD handlers update React state, then return to the list. A useEffect clears each message after 30 seconds.

### ExpenseDisplay

Shows the **All / Last 30 Days** filter, the message area, and the expense list. Filter first, then sort by expense_date descending.

#### Example
<ExpenseDisplay
    expenses={expenses}
    message={expenseMessage}
    onCardPress={handleCardPress}
    onDelete={handleDeleteExpense}
/>
 
### ExpenseForm

Uses an existing expense to populate edit fields or initializes a new record with DateUtils.currentDate(). Displays a delete action for an existing expense.

#### Example
<ExpenseForm
    expense={selectedExpense}
    onSubmit={handleSubmitExpense}
    onDelete={handleDeleteExpense}
/>
 
### ExpenseFormBuilder, ExpenseList, and ExpenseItem

ExpenseFormBuilder supplies expense-specific field definitions to the generic form library. ExpenseList renders expense records as cards, while ExpenseItem presents one expense and its actions.

## Reusable component library

      The components in src/components/lib are designed to be **domain-neutral** and reusable in other projects.

      ### FormBuilder.tsx

      A schema-driven React Native form component. It renders inputs, stores values, displays validation errors, and invokes onSubmit when validation succeeds.

      **Field definitions:**

### FormBuilder
      export type SelectOption = {
         label: string;
         value: string;
      };

      export type FormInput = {
         name: string;
         label: string;
         type: "text" | "multiline" | "date" | "select"
            | "currency" | "integer" | "number";
         required?: boolean;
         options?: SelectOption[];
      };
      
      **Example usage inside a React component:**

##### Example
      import FormBuilder, { type FormInput } from "@/components/lib/FormBuilder";

      const inputs: FormInput[] = [
         { name: "title", label: "Title", type: "text", required: true },
         { name: "quantity", label: "Quantity", type: "integer", required: true },
         {
            name: "category",
            label: "Category",
            type: "select",
            options: [
                  { label: "Standard", value: "standard" },
                  { label: "Premium", value: "premium" }
            ]
         }
      ];

      const handleSubmit = (values: Record<string, string>): void => {
         console.log(values);
         return;
      };

      // In the component's JSX:
      <FormBuilder
         inputs={inputs}
         initialValues={{ title: "", quantity: "1", category: "standard" }}
         submitButtonText="Save"
         onSubmit={handleSubmit}
      />
      
>All form values are strings to prevent nuisance errors; the consuming application converts appropriate values where needed.

### FormValidator

      Validates an array of FormInput definitions against a record of string values. Supports required-field checks and type-specific validation for text, multiline text, currency, integer, number, date, and select fields.

      **Public API:** validate(inputs, values): boolean and Errors: Record<string, string>.
#### Example
      import FormValidator from "@/components/lib/FormValidator";
      import type { FormInput } from "@/components/lib/FormBuilder";

      const inputs: FormInput[] = [
         { name: "count", label: "Count", type: "integer", required: true }
      ];

      const validator = new FormValidator();
      const isValid = validator.validate(inputs, { count: "12" });

      if (!isValid) {
         console.log(validator.Errors);
      }
      
>Client-side validation does **not** replace backend validation or safe database queries.

### DateUtils.ts

      A centralized wrapper for JavaScript date operations. **All date creation, conversion, formatting, comparison, filtering, and timestamp generation must be performed through DateUtils**, not directly inside application components.

      | Method | Purpose |
      |---|---|
      | currentDate() | Current local date as YYYY-MM-DD |
      | stringToDate(value) | Parse and validate YYYY-MM-DD; return Date or null |
      | dateToString(date) | Format a Date object as YYYY-MM-DD |
      | currentTimestamp() | Current timestamp in milliseconds |

#### Example
      import DateUtils from "@/components/lib/DateUtils";

      const today = DateUtils.currentDate();
      const parsedDate = DateUtils.stringToDate("2026-11-15");
      const timestamp = DateUtils.currentTimestamp();
      
      If a new date operation is needed, add a reusable method to DateUtils and call it from the component. A timestamp alone does not guarantee a unique identifier for persistent records.

### CardDeck.tsx

      A reusable card presentation component with **grid** and **list** modes. Grid mode supports pagination; list mode supports scrolling. It accepts a cards collection, an optional listStyle flag, and an onCardPress handler.

#### Example
      <CardDeck
         cards={cards}
         listStyle={true}
         onCardPress={handleCardPress}
      />
      
      Ensure cards matches the CardItem type declared in your current CardDeck.tsx.

## Application data flow
```text
HomeScreen (index.tsx)
├── ExpenseDisplay
│    └── ExpenseList
│        └── ExpenseItem
│            ├── CardDeck
│            └── DateUtils
├── ExpenseForm
│    └── ExpenseFormBuilder
│        └── FormBuilder
│            ├── FormValidator
│            └── DateUtils
└── Data
    ├──Expense.js    
    └──testData.js
```
1. The user selects **Add Expense** or an existing expense.
2. ExpenseForm displays the appropriate initial values.
3. FormBuilder validates and submits the values.
4. HomeScreen creates or updates the expense and returns to ExpenseDisplay.
5. A confirmation message appears for 60 seconds. Deletion follows the corresponding onDelete flow.

## Development conventions

- Prefer TypeScript (.ts / .tsx) for new code.
- Use **exactly one return per function, at the very end**; no early returns.
- Avoid unnecessary ternary operators and function chaining.
- Explicitly declare class members public or private.
- Keep reusable component documentation independent of expense-specific terminology.
- Use DateUtils for **every** date-related operation.
- Preserve existing styling, layout, and event handlers when making targeted changes.
- Use descriptive JSDoc comments for reusable APIs.

## Persistence

The app currently initializes its expense list from test data and updates it in React state. Those in-memory changes are not automatically retained after restarting the app unless persistent storage is added.

---

*This README reflects the architecture discussed during ETrack development. Confirm filenames, imports, and any subsequent code changes against the current repository before publishing.*




# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [create-expo-app](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ## bash
   npm install
    
2. Start the app

   ## bash
   npx expo start
    
In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

## bash
npm run reset-project
 
This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run npx expo lint, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
