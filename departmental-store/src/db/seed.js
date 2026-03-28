import pool from "./pool.js";

const categories = [
    { name: "Fresh Fruits", description: "Seasonal and exotic whole fruits" },
    { name: "Vital Vegetables", description: "Farm fresh farm vegetables" },
    { name: "Dairy & Eggs", description: "Fresh milk, cheese, and eggs" },
    { name: "Bread & Bakery", description: "Freshly baked artisan breads" },
    { name: "Beverages", description: "Hydrating juices and drinks" }
];

const products = [
    // Fresh Fruits
    { name: "Organic Red Apple", price: 120.00, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400" },
    { name: "Ripe Bananas", price: 40.00, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1571771894821-ad99026107b8?w=400" },
    { name: "Juicy Grapes", price: 90.00, cat: "Fresh Fruits", img: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?w=400" },
    
    // Vital Vegetables
    { name: "Fresh Broccoli", price: 60.00, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1452948491233-ad8a1ed01085?w=400" },
    { name: "Red Tomatoes", price: 30.00, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400" },
    { name: "Crunchy Carrots", price: 45.00, cat: "Vital Vegetables", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400" },

    // Dairy & Eggs
    { name: "Full Cream Milk", price: 65.00, cat: "Dairy & Eggs", img: "https://images.unsplash.com/photo-1550583724-1255818c053b?w=400" },
    { name: "Organic Eggs", price: 180.00, cat: "Dairy & Eggs", img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400" },
    { name: "Artisan Cheese", price: 450.00, cat: "Dairy & Eggs", img: "https://images.unsplash.com/photo-1486297678162-ad2a19b05840?w=400" },

    // Bread & Bakery
    { name: "Whole Wheat Bread", price: 55.00, cat: "Bread & Bakery", img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400" },
    { name: "Butter Croissant", price: 80.00, cat: "Bread & Bakery", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" },
    { name: "French Baguette", price: 120.00, cat: "Bread & Bakery", img: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?w=400" },

    // Beverages
    { name: "Orange Juice", price: 150.00, cat: "Beverages", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400" },
    { name: "Premium Green Tea", price: 250.00, cat: "Beverages", img: "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?w=400" },
    { name: "Sparkling Water", price: 45.00, cat: "Beverages", img: "https://images.unsplash.com/photo-1551613204-2fd1f7294bbd?w=400" }
];

const seed = async () => {
    try {
        console.log("Seeding database for FreshMart...");
        
        // Clean up existing data to avoid duplicates/mess
        await pool.query("DELETE FROM carts;");
        await pool.query("DELETE FROM order_items;");
        await pool.query("DELETE FROM products;");
        await pool.query("DELETE FROM categories;");

        // Insert Categories
        for (const cat of categories) {
            await pool.query(
                "INSERT INTO categories (name, description) VALUES ($1, $2)",
                [cat.name, cat.description]
            );
        }

        // Get category IDs
        const catRes = await pool.query("SELECT id, name FROM categories;");
        const catMap = {};
        catRes.rows.forEach(r => catMap[r.name] = r.id);

        // Insert Products
        for (const p of products) {
            await pool.query(
                "INSERT INTO products (name, price, category_id, image_url, description) VALUES ($1, $2, $3, $4, $5)",
                [p.name, p.price, catMap[p.cat], p.img, `Fresh and natural ${p.name}`]
            );
        }

        console.log("Database seeded successfully with 5 categories and fresh products!");
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        process.exit();
    }
};

seed();
