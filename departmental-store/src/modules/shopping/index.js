import * as shoppingRepository from "./repositories/shopping.repositories.js";
import shoppingService from "./services/shopping.services.js";
import { registerShoppingHandler } from "./handlers/shopping.handlers.js";

export const registerShoppingModule = async (fastify) => {
    const serviceInstance = shoppingService({
        shoppingRepository: shoppingRepository
    });

    await registerShoppingHandler(fastify, serviceInstance);
};

export default registerShoppingModule;
