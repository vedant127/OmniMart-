import { 
    createProductEntity, 
    createCategoryEntity, 
    createInventoryEntity 
} from "../domain/catalog.entity.js";

const catalogService = ({ catalogRepository }) => ({
    
    // -- Products --
    createProduct: async (productData) => {
        const productEntity = createProductEntity(productData);
        
        const newProduct = await catalogRepository.createProduct({
            name: productEntity.getName(),
            description: productEntity.getDescription(),
            price: productEntity.getPrice(),
            categoryId: productEntity.getCategoryId(),
        });
        return newProduct;
    },

    getAllProducts: async () => {
        return await catalogRepository.getAllProducts();
    },

    getProductById: async (id) => {
        const product = await catalogRepository.getProductById(id);
        if (!product) throw new Error("Product not found");
        return product;
    },

    updateProduct: async (id, productData) => {
        const updatedProduct = await catalogRepository.updateProduct(id, productData);
        return updatedProduct;
    },

    // -- Variants --
    createProductVariant: async (productId, variantData) => {
        return await catalogRepository.createProductVariant(productId, variantData);
    },

    getVariantsByProductId: async (productId) => {
        return await catalogRepository.getVariantsByProductId(productId);
    },

    // -- Categories -- 
    createCategory: async (categoryData) => {
        const categoryEntity = createCategoryEntity(categoryData);
        
        const newCategory = await catalogRepository.createCategory({
            name: categoryEntity.getName(),
            description: categoryEntity.getDescription()
        });
        return newCategory;
    },

    getAllCategories: async () => {
        return await catalogRepository.getAllCategories();
    },

    getCategoryById: async (id) => {
        const category = await catalogRepository.getCategoryById(id);
        if (!category) throw new Error("Category not found");
        return category;
    },

    updateCategory: async (id, categoryData) => {
        return await catalogRepository.updateCategory(id, categoryData);
    },

    // -- Inventories --
    createInventory: async (inventoryData) => {
        const inventoryEntity = createInventoryEntity(inventoryData);
        return await catalogRepository.createInventory({
            variantId: inventoryEntity.getVariantId(),
            quantity: inventoryEntity.getQuantity()
        });
    },

    getAllInventories: async () => {
        return await catalogRepository.getAllInventories();
    },

    updateInventory: async (id, inventoryData) => {
        return await catalogRepository.updateInventory(id, inventoryData);
    }
});

export default catalogService;
