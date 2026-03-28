import pool from "./pool.js";

const schema = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    emoji VARCHAR(10),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    attributes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventories (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    variant_id INTEGER REFERENCES product_variants(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    method VARCHAR(50),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipping (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    address_id INTEGER REFERENCES user_addresses(id),
    tracking_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const seedData = async () => {
    try {
        console.log("Cleaning old data...");
        await pool.query("DELETE FROM carts;");
        await pool.query("DELETE FROM order_items;");
        await pool.query("DELETE FROM inventories;");
        await pool.query("DELETE FROM product_variants;");
        await pool.query("DELETE FROM products;");
        await pool.query("DELETE FROM categories;");

        console.log("Seeding FreshMart organic categories...");
        const categories = [
            { name: "Fresh Fruits", description: "Organic & garden-fresh fruits" },
            { name: "Vital Vegetables", description: "Crisp, vitalizing vegetables" },
            { name: "Pure Dairy", description: "Farm-fresh milk, eggs & cheese" },
            { name: "Fresh Bakery", description: "Artisan breads and sweet treats" },
            { name: "Healthy Beverages", description: "Natural juices and health drinks" }
        ];

        const categoryIds = {};
        for (const cat of categories) {
            const res = await pool.query(
                "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id",
                [cat.name, cat.description]
            );
            categoryIds[cat.name] = res.rows[0].id;
        }

        console.log("Seeding organic products...");
        const products = [
            // Fruits
            { name: "Organic Red Apple", price: 120, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6" },
            { name: "Golden Banana", price: 60, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1571771894821-ad99026107b8" },
            { name: "Fresh Strawberries", price: 250, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1464965811823-300482596954" },
            
            // Vegetables
            { name: "Green Broccoli", price: 80, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },
            { name: "Vine Tomatoes", price: 45, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655" },
            
            // Dairy
            { name: "Farm Fresh Milk", price: 65, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1550583724-1255818c053b" },
            { name: "Organic Eggs (12pk)", price: 180, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03" },
            
            // Bakery
            { name: "Whole Wheat Bread", price: 55, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
            { name: "French Croissant", price: 90, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
            
            // Beverages
            { name: "Natural Orange Juice", price: 150, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423" }
        ];

        for (const prod of products) {
            await pool.query(
                "INSERT INTO products (name, description, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5)",
                [prod.name, `${prod.name} from organic farms`, prod.price, categoryIds[prod.cat], `${prod.img}?auto=format&fit=crop&q=80&w=600`]
            );
        }

        console.log("FreshMart database restored successfully!");
    } catch (err) {
        console.error("Seeding error:", err);
    }
};

const runMigration = async () => {
    try {
        console.log("Starting database migration...");
        await pool.query(schema);
        console.log("Database migration completed successfully!");
        
        // Run seed after migration
        await seedData();
    } catch (error) {
        console.error("Migration error:", error);
    } finally {
        process.exit();
    }
};

runMigration();
