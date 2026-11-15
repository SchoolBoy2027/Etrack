Using FormBuilder.tsx



/*The selected value is the primary key, not the displayed text. For example, selecting Sports stores "2" in the form values.
5. Validation behavior
Input type	Local validation
Text	Required fields cannot be blank
Multiline	Required fields cannot be blank
Date	Must contain a valid date
Select	Required fields must have a selected value

All required fields display a red asterisk. Validation errors appear below the corresponding input.

Implementation note: This version uses a function component rather than a TypeScript class because React Native forms require hooks for state and lifecycle management. 
It does not write submitted values to SQLite automatically; 
the onSubmit callback receives validated values so the calling screen can decide whether to insert or update a record.

For production use, the select queries should be developer-defined rather than supplied directly by users. 
SQLite query parameters should be used for any dynamic values.

*/


import type { FormInput } from "@/components/FormBuilder";

const formInputs: FormInput[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        required: true
    },
    {
        name: "description",
        label: "Description",
        type: "multiline"
    },
    {
        name: "event_date",
        label: "Event Date",
        type: "date",
        required: true
    },
    {
        name: "category_id",
        label: "Category",
        type: "select",
        required: true,
        query: "SELECT category_id, category_name FROM categories ORDER BY category_name",
        primaryKey: "category_id",
        displayField: "category_name"
    }
];



//rendering 
<FormBuilder
    inputs={ formInputs }
database = { database }
onSubmit = {(values) => {
    console.log("Validated form:", values);
}}
/>

