import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("myapp.db");

const statement = await db.prepareAsync(
    "SELECT * FROM categories WHERE category_id = $categoryId"
);

try {
    const result = await statement.executeAsync({
        $categoryId: 2
    });

    const rows = await result.getAllAsync();

    console.log(rows);
} finally {
    await statement.finalizeAsync();
}



//prepared insert
const statement = await db.prepareAsync(
    `INSERT INTO categories (category_name)
     VALUES ($categoryName)`
);

try {
    await statement.executeAsync({
        $categoryName: "Music"
    });
} finally {
    await statement.finalizeAsync();
}


//prepared with parameters 
const statement = await database.prepareAsync(
    "SELECT category_id, category_name FROM categories WHERE is_active = $active"
);

try {
    const result = await statement.executeAsync({
        $active: 1
    });

    const rows = await result.getAllAsync();
} finally {
    await statement.finalizeAsync();
}


//simpler version 

const rows = await db.getAllAsync(
    "SELECT * FROM categories WHERE category_id = ?",
    [2]
);


//Prepared statement cleanup
//Always release prepared statements, including when execution fails:
const statement = await database.prepareAsync(
    "SELECT * FROM categories WHERE category_id = ?"
);

try {
    const result = await statement.executeAsync([categoryId]);
    const rows = await result.getAllAsync();

    console.log(rows);
} finally {
    await statement.finalizeAsync();
}