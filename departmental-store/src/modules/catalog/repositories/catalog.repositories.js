import { query } from "../../../db/dboperation.js";

// -- products --
export const createProduct = async ({name, description, price, categoryId}) => {
    const res = await query(
        "INSERT INTO products (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, price, categoryId]
    );
    return res[0];
};

export const getAllProducts = async () => {
    const res = await query(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id
    `);
    return res;
};

export const getProductById = async (id) => {
    const res = await query("SELECT * FROM products WHERE id = $1", [id]);
    return res[0];
};

export const updateProduct = async (id, {name, description, price, categoryId}) => {
    const res = await query(
        "UPDATE products SET name = $1, description = $2, price = $3, category_id = $4 WHERE id = $5 RETURNING *",
        [name, description, price, categoryId, id]
    );
    return res[0];
};

// -- product variants --
export const createProductVariant = async (productId, {sku, attributes}) => {
    const res = await query(
        "INSERT INTO product_variants (product_id, sku, attributes) VALUES ($1, $2, $3) RETURNING *",
        [productId, sku, attributes]
    );
    return res[0];
};

export const getVariantsByProductId = async (productId) => {
    const res = await query("SELECT * FROM product_variants WHERE product_id = $1", [productId]);
    return res;
};

// -- categories --
export const createCategory = async ({name, description}) => {
    const res = await query(
        "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
    );
    return res[0];
};

export const getAllCategories = async () => {
    const res = await query("SELECT * FROM categories");
    return res;
};

export const getCategoryById = async (id) => {
    const res = await query("SELECT * FROM categories WHERE id = $1", [id]);
    return res[0];
};

export const updateCategory = async (id, {name, description}) => {
    const res = await query(
        "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [name, description, id]
    );
    return res[0];
};

// -- inventories --
export const createInventory = async ({variantId, quantity}) => {
    const res = await query(
        "INSERT INTO inventories (variant_id, quantity) VALUES ($1, $2) RETURNING *",
        [variantId, quantity]
    );
    return res[0];
};

export const getAllInventories = async () => {
    const res = await query("SELECT * FROM inventories");
    return res;
};

export const updateInventory = async (id, {quantity}) => {
    const res = await query(
        "UPDATE inventories SET quantity = $1 WHERE id = $2 RETURNING *",
        [quantity, id]
    );
    return res[0];
};
