import { authGuard } from "../../shared/auth.middleware.js";

export const registerCatalogHandler = async (fastify, service) => {

    // --- PRODUCTS ---
    fastify.post("/api/v1/catalog/products", async (request, reply) => {
        try {
            const product = await service.createProduct(request.body);
            reply.status(201).send(product);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/v1/catalog/products", async (request, reply) => {
        try {
            const products = await service.getAllProducts();
            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/v1/catalog/products/:id", async (request, reply) => {
        try {
            const product = await service.getProductById(request.params.id);
            reply.status(200).send(product);
        } catch (error) {
            reply.status(404).send({ error: error.message });
        }
    });

    fastify.patch("/api/v1/catalog/products/:id", { preHandler: authGuard }, async (request, reply) => {
        try {
            const product = await service.updateProduct(request.params.id, request.body);
            reply.status(200).send(product);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    // --- PRODUCT VARIANTS ---
    fastify.post("/api/v1/catalog/products/:id/variants", { preHandler: authGuard }, async (request, reply) => {
        try {
            const variant = await service.createProductVariant(request.params.id, request.body);
            reply.status(201).send(variant);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/v1/catalog/products/:id/variants", async (request, reply) => {
        try {
            const variants = await service.getVariantsByProductId(request.params.id);
            reply.status(200).send(variants);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });


    // --- CATEGORIES ---
    fastify.post("/api/v1/catalog/categories", { preHandler: authGuard }, async (request, reply) => {
        try {
            const category = await service.createCategory(request.body);
            reply.status(201).send(category);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/v1/catalog/categories", async (request, reply) => {
        try {
            const categories = await service.getAllCategories();
            reply.status(200).send(categories);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.get("/api/v1/catalog/categories/:id", async (request, reply) => {
        try {
            const category = await service.getCategoryById(request.params.id);
            reply.status(200).send(category);
        } catch (error) {
            reply.status(404).send({ error: error.message });
        }
    });

    fastify.patch("/api/v1/catalog/categories/:id", { preHandler: authGuard }, async (request, reply) => {
        try {
            const category = await service.updateCategory(request.params.id, request.body);
            reply.status(200).send(category);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });


    // --- INVENTORIES ---
    fastify.get("/api/v1/catalog/inventories", { preHandler: authGuard }, async (request, reply) => {
        try {
            const inventories = await service.getAllInventories();
            reply.status(200).send(inventories);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.post("/api/v1/catalog/inventories", { preHandler: authGuard }, async (request, reply) => {
        try {
            const inventory = await service.createInventory(request.body);
            reply.status(201).send(inventory);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

    fastify.patch("/api/v1/catalog/inventories/:id", { preHandler: authGuard }, async (request, reply) => {
        try {
            const inventory = await service.updateInventory(request.params.id, request.body);
            reply.status(200).send(inventory);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    });

};
