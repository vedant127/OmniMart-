import * as catalogRepository from "./repositories/catalog.repositories.js";
import catalogService from "./services/catalog.services.js";
import { registerCatalogHandler } from "./handlers/catalog.handlers.js";

export const registerCatalogModule = async (fastify) => {
    const serviceInstance = catalogService({
        catalogRepository: catalogRepository
    });

    await registerCatalogHandler(fastify, serviceInstance);
};

export default registerCatalogModule;
