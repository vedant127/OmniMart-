import { query } from "../../../db/dboperation.js";

// -- Carts --
export const createCart = async ({userId, productId, variantId, quantity}) => {
    const res = await query(
        "INSERT INTO carts (user_id, product_id, variant_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, productId, variantId, quantity]
    );
    return res[0];
};

export const getCartByUserId = async (userId) => {
    return await query("SELECT * FROM carts WHERE user_id = $1", [userId]);
};

export const updateCart = async (id, {quantity}) => {
    const res = await query(
        "UPDATE carts SET quantity = $1 WHERE id = $2 RETURNING *",
        [quantity, id]
    );
    return res[0];
};

// -- Orders --
export const createOrder = async ({userId, totalAmount, status}) => {
    const res = await query(
        "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *",
        [userId, totalAmount, status]
    );
    return res[0];
};

export const getOrdersByUserId = async (userId) => {
    return await query("SELECT * FROM orders WHERE user_id = $1", [userId]);
};

export const getOrderById = async (id) => {
    const res = await query("SELECT * FROM orders WHERE id = $1", [id]);
    return res[0];
};

export const updateOrderStatus = async (id, {status}) => {
    const res = await query(
        "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
    );
    return res[0];
};

// -- Payments --
export const createPayment = async ({orderId, method, amount, status}) => {
    const res = await query(
        "INSERT INTO payments (order_id, method, amount, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [orderId, method, amount, status]
    );
    return res[0];
};

export const getPaymentsByUserId = async (userId) => {
    return await query(
        "SELECT p.* FROM payments p JOIN orders o ON p.order_id = o.id WHERE o.user_id = $1", 
        [userId]
    );
};

export const verifyPayment = async (id, {status}) => {
    const res = await query(
        "UPDATE payments SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
    );
    return res[0];
};

// -- Shipping --
export const createShipping = async ({orderId, addressId, trackingNumber, status}) => {
    const res = await query(
        "INSERT INTO shipping (order_id, address_id, tracking_number, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [orderId, addressId, trackingNumber, status]
    );
    return res[0];
};

export const getShippingByOrderId = async (orderId) => {
    const res = await query("SELECT * FROM shipping WHERE order_id = $1", [orderId]);
    return res[0];
};
