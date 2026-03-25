export const createProductEntity = ({id, name, description, price, categoryId}) => {
    if (!name || typeof name !== 'string') throw new Error("Product name is required and must be a string");
    if (!price || typeof price !== 'number') throw new Error("Product price is required and must be a number");
    if (!categoryId) throw new Error("Category ID is required");

    return {
        getId: () => id,
        getName: () => name,
        getDescription: () => description,
        getPrice: () => price,
        getCategoryId: () => categoryId
    };
};

export const createCategoryEntity = ({id, name, description}) => {
    if (!name || typeof name !== 'string') throw new Error("Category name is required and must be a string");
    
    return {
        getId: () => id,
        getName: () => name,
        getDescription: () => description
    };
};

export const createInventoryEntity = ({id, variantId, quantity}) => {
    if (!variantId) throw new Error("Variant ID is required");
    if (typeof quantity !== 'number' || quantity < 0) throw new Error("Quantity must be a non-negative number");

    return {
        getId: () => id,
        getVariantId: () => variantId,
        getQuantity: () => quantity
    };
};
