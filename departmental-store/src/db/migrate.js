import pool from "./pool.js";

const schema = `
DROP TABLE IF EXISTS shipping CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS inventories CASCADE;
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS user_addresses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_addresses (
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

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    emoji VARCHAR(10),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    attributes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventories (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    variant_id INTEGER REFERENCES product_variants(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    method VARCHAR(50),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipping (
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
          // Fresh Fruits
          { name: "Organic Red Apple", price: 120, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6" },
          { name: "Golden Banana", price: 60, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1571771894821-ad99026107b8" },
          { name: "Fresh Strawberries", price: 250, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1464965811823-300482596954" },
          { name: "Sweet Mango", price: 180, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1553279768-865429fa0078" },
          { name: "Blueberry Pack", price: 320, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1497534446932-c946d731f81d" },
          { name: "Juicy Orange", price: 90, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1557800636-894a64c1696f" },
          { name: "Green Pear", price: 110, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1514756331096-242f3900ef8e" },
          { name: "Fresh Pineapple", price: 150, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1550258114-68bd299768c5" },
          
          // Vital Vegetables
          { name: "Green Broccoli", price: 80, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },
          { name: "Vine Tomatoes", price: 45, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655" },
          { name: "Baby Carrots", price: 55, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1590865101275-483624df0dd0" },
          { name: "Purple Cabbage", price: 70, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1509372265551-04df865f7215" },
          { name: "Fresh Spinach", price: 40, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb" },
          { name: "Bell Peppers (Mix)", price: 120, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1566385101042-1a000c1268c4" },
          { name: "Organic Cucumber", price: 35, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1544650030-3c7278d910af" },
          { name: "Red Onion", price: 30, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1508747703725-71977713d540" },
          
          // Pure Dairy
          { name: "Farm Fresh Milk", price: 65, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1550583724-1255818c053b" },
          { name: "Organic Eggs (12pk)", price: 180, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03" },
          { name: "Cheddar Cheese", price: 290, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1486297678162-ad2a19b05845" },
          { name: "Greek Yogurt", price: 140, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777" },
          { name: "Farm Butter", price: 210, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d" },
          { name: "Mozzarella Ball", price: 350, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1559561853-08451507cbe7" },
          { name: "Almond Milk", price: 240, cat: "Pure Dairy", img: "https://images.unsplash.com/photo-1563444536294-811ad4824dc7" },
          
          // Fresh Bakery
          { name: "Whole Wheat Bread", price: 55, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
          { name: "French Croissant", price: 90, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
          { name: "Chocolate Muffin", price: 75, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1582231370720-639a09995393" },
          { name: "Baguette Tradicion", price: 110, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729" },
          { name: "Garlic Focaccia", price: 140, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1534073828943-f801091bb24f" },
          { name: "Blueberry Danishes", price: 120, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812" },
          { name: "Sourdough Loaf", price: 180, cat: "Fresh Bakery", img: "https://images.unsplash.com/photo-1585478259715-876a2371ee58" },
          
          // Healthy Beverages
          { name: "Natural Orange Juice", price: 150, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423" },
          { name: "Cold Brew Coffee", price: 220, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" },
          { name: "Matcha Green Tea", price: 280, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1515696955266-4167e13233ee" },
          { name: "Sparkling Water", price: 45, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1551613284-cd974df833b1" },
          { name: "Fresh Coconut Water", price: 95, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1522045330386-89680373ab9f" },
          { name: "Detox Green Juice", price: 210, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1622597467825-f82856250b34" },
          { name: "Organic Apple Cider", price: 160, cat: "Healthy Beverages", img: "https://images.unsplash.com/photo-1624462966581-bc6d768cbce5" }
        ];

        for (const prod of products) {
            const discount = Math.random() < 0.35 ? Math.floor(Math.random() * 31) + 20 : 0;
            await pool.query(
                "INSERT INTO products (name, description, price, discount, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
                [prod.name, `${prod.name} from organic farms`, prod.price, discount, categoryIds[prod.cat], `${prod.img}?auto=format&fit=crop&q=80&w=600`]
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
