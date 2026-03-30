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
        // All URLs verified directly from pexels.com — no rate limits, no API key needed
        const products = [
          // 🍎 Fresh Fruits
          { name: "Organic Red Apple",    price: 120, desc: "Crisp organic red apples fresh from the orchard",            cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Golden Banana",        price: 60,  desc: "Perfectly ripened golden bananas, rich in potassium",        cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Fresh Strawberries",   price: 250, desc: "Sweet hand-picked strawberries bursting with flavour",       cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Alphonso Mango",       price: 180, desc: "Premium Alphonso mangoes — king of all mangoes",             cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Blueberry Pack 250g",  price: 320, desc: "Antioxidant-rich fresh blueberries, 250g pack",              cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Navel Oranges",        price: 90,  desc: "Vitamin C-rich navel oranges, thin-skinned and juicy",       cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Fresh Grapes",         price: 140, desc: "Plump, seedless grapes — perfect for snacking",              cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Fresh Pineapple",      price: 150, desc: "Tropical golden pineapple — sweet and tangy every bite",     cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Kiwi Fruit (6pc)",     price: 199, desc: "Vitamin C powerhouse — bright green kiwis, pack of 6",      cat: "Fresh Fruits",      img: "https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },

          // 🥦 Vital Vegetables
          { name: "Fresh Broccoli",       price: 80,  desc: "Farm-fresh broccoli florets — superfood for your family",   cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Vine Tomatoes",        price: 45,  desc: "Ripened on the vine for maximum sweetness and flavour",     cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Baby Carrots 500g",    price: 55,  desc: "Tender, sweet baby carrots — perfect for snacking",         cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Purple Cabbage",       price: 70,  desc: "Vibrant purple cabbage — packed with antioxidants",         cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Baby Spinach Leaves",  price: 40,  desc: "Baby spinach leaves — tender, mild, and iron-rich",         cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Mixed Bell Peppers",   price: 120, desc: "Red, yellow, green bell peppers — colourful and crunchy",   cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Organic Cucumber",     price: 35,  desc: "Cool, crispy cucumbers straight from organic farms",        cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Red Onions",           price: 30,  desc: "Sharp, flavourful red onions for cooking and salads",       cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Sweet Corn",           price: 50,  desc: "Fresh golden sweet corn, naturally sweet and juicy",        cat: "Vital Vegetables",  img: "https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },

          // 🥛 Pure Dairy
          { name: "Farm Fresh Milk 1L",   price: 65,  desc: "Full-cream whole milk from local farms, 1 litre",           cat: "Pure Dairy",        img: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Organic Eggs 12pk",    price: 180, desc: "Free-range organic eggs — golden yolk, superior nutrition", cat: "Pure Dairy",        img: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Cheddar Cheese 200g",  price: 290, desc: "Aged sharp cheddar cheese, 200g — rich and crumbly",        cat: "Pure Dairy",        img: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Greek Yogurt 400g",    price: 140, desc: "Thick, creamy Greek yogurt — high protein, probiotic-rich", cat: "Pure Dairy",        img: "https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Organic Butter 250g",  price: 210, desc: "Pure churned organic butter from grass-fed cows, 250g",     cat: "Pure Dairy",        img: "https://images.pexels.com/photos/531334/pexels-photo-531334.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Fresh Mozzarella",     price: 350, desc: "Soft, milky fresh mozzarella ball in water — 125g",         cat: "Pure Dairy",        img: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Almond Milk 1L",       price: 240, desc: "Unsweetened creamy almond milk, 1 litre carton",            cat: "Pure Dairy",        img: "https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Paneer 200g",          price: 160, desc: "Fresh, firm Indian cottage cheese — perfect for curries",   cat: "Pure Dairy",        img: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },

          // 🥖 Fresh Bakery
          { name: "Whole Wheat Bread",    price: 55,  desc: "Wholesome hearty whole wheat loaf baked fresh daily",       cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Butter Croissant",     price: 90,  desc: "Flaky, golden French butter croissant — freshly baked",     cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/3847660/pexels-photo-3847660.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Chocolate Muffin",     price: 75,  desc: "Moist double chocolate chip muffin, baked from scratch",    cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/3654064/pexels-photo-3654064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "French Baguette",      price: 110, desc: "Traditional French baguette with a crisp golden crust",     cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Garlic Focaccia",      price: 140, desc: "Italian-style focaccia with rosemary and roasted garlic",   cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Cinnamon Danish",      price: 120, desc: "Flaky pastry swirl filled with sweet cinnamon and glaze",   cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/3847660/pexels-photo-3847660.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Sourdough Loaf",       price: 180, desc: "Traditionally fermented sourdough with tangy open crumb",   cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Banana Walnut Cake",   price: 200, desc: "Moist banana loaf with crunchy walnuts, a bakery favourite",cat: "Fresh Bakery",      img: "https://images.pexels.com/photos/3654064/pexels-photo-3654064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },

          // 🥤 Healthy Beverages
          { name: "Fresh Orange Juice",   price: 150, desc: "Cold-pressed 100% pure orange juice — no added sugar",      cat: "Healthy Beverages", img: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Cold Brew Coffee",     price: 220, desc: "Smooth, low-acid cold brew concentrate — 500ml bottle",     cat: "Healthy Beverages", img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Matcha Green Tea",     price: 280, desc: "Premium ceremonial-grade matcha — add hot water or milk",   cat: "Healthy Beverages", img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Sparkling Water 750ml",price: 45,  desc: "Refreshing sparkling mineral water — zero calories, 750ml", cat: "Healthy Beverages", img: "https://images.pexels.com/photos/1292862/pexels-photo-1292862.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Tender Coconut Water", price: 95,  desc: "Pure natural coconut water — nature's finest electrolyte",  cat: "Healthy Beverages", img: "https://images.pexels.com/photos/1030946/pexels-photo-1030946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Detox Green Juice",    price: 210, desc: "Cold-pressed spinach, apple, ginger and cucumber blend",    cat: "Healthy Beverages", img: "https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Apple Cider Vinegar",  price: 160, desc: "Raw, unfiltered ACV with the mother — 500ml bottle",        cat: "Healthy Beverages", img: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" },
          { name: "Peppermint Herbal Tea",price: 110, desc: "Refreshing organic peppermint tea bags — pack of 20",       cat: "Healthy Beverages", img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400" }
        ];

        for (const prod of products) {
            const discount = Math.random() < 0.4 ? Math.floor(Math.random() * 26) + 10 : 0;
            await pool.query(
                "INSERT INTO products (name, description, price, discount, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
                [prod.name, prod.desc, prod.price, discount, categoryIds[prod.cat], prod.img]
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
