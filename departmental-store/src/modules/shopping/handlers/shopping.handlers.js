import { authGuard } from "../../shared/auth.middleware.js";

export const registerShoppingHandler = async (fastify, service) => {

    // --- CART ---
    fastify.post("/api/shopping/cart", { preHandler: authGuard }, async (request, reply) => {
        try {
            // we assume request.user.id maps to the userId
            const cartItemData = { ...request.body, userId: request.user.id };
            const cartItem = await service.createCart(cartItemData);
            reply.status(201).send(cartItem);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/shopping/cart", { preHandler: authGuard }, async (request, reply) => {
        try {
            const cartItems = await service.getCartByUserId(request.user.id);
            reply.status(200).send(cartItems);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.patch("/api/shopping/cart/:id", { preHandler: authGuard }, async (request, reply) => {
        try {
            const cartItem = await service.updateCart(request.params.id, request.body);
            reply.status(200).send(cartItem);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    // --- ORDERS ---
    fastify.post("/api/shopping/orders", { preHandler: authGuard }, async (request, reply) => {
        try {
            const orderData = { ...request.body, userId: request.user.id };
            const order = await service.createOrder(orderData);
            reply.status(201).send(order);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/shopping/orders", { preHandler: authGuard }, async (request, reply) => {
        try {
            const orders = await service.getOrdersByUserId(request.user.id);
            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/shopping/orders/:id", { preHandler: authGuard }, async (request, reply) => {
        try {
            const order = await service.getOrderById(request.params.id);
            reply.status(200).send(order);
        } catch (error) {
            reply.status(404).send({ error: error.message });
        }
    });

    fastify.patch("/api/shopping/orders/:id", { preHandler: authGuard }, async (request, reply) => {
        try {
            const order = await service.updateOrderStatus(request.params.id, request.body);
            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    // --- PAYMENTS ---
    fastify.post("/api/shopping/payments", { preHandler: authGuard }, async (request, reply) => {
        try {
            const payment = await service.createPayment(request.body);
            reply.status(201).send(payment);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/shopping/payments", { preHandler: authGuard }, async (request, reply) => {
        try {
            const payments = await service.getPaymentsByUserId(request.user.id);
            reply.status(200).send(payments);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.post("/api/shopping/payments/verify", { preHandler: authGuard }, async (request, reply) => {
        try {
            const payment = await service.verifyPayment(request.body.paymentId, request.body);
            reply.status(200).send(payment);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });


    // --- SHIPPING ---
    fastify.post("/api/shopping/shipping", { preHandler: authGuard }, async (request, reply) => {
        try {
            const shipping = await service.createShipping(request.body);
            reply.status(201).send(shipping);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/shopping/shipping/:orderId/track", { preHandler: authGuard }, async (request, reply) => {
        try {
            const tracking = await service.getShippingByOrderId(request.params.orderId);
            reply.status(200).send(tracking);
        } catch (error) {
            reply.status(404).send({ error: error.message });
        }
    });

};
