export const createCartEntity = ({id, userId, productId, variantId, quantity}) => {
    if (!userId) throw new Error("User ID is required");
    if (!quantity || quantity <= 0) throw new Error("Quantity must be greater than 0");

    return {
        getId: () => id,
        getUserId: () => userId,
        getProductId: () => productId,
        getVariantId: () => variantId,
        getQuantity: () => quantity
    };
};

export const createOrderEntity = ({id, userId, totalAmount, status = 'PENDING'}) => {
    if (!userId) throw new Error("User ID is required");

    return {
        getId: () => id,
        getUserId: () => userId,
        getTotalAmount: () => totalAmount,
        getStatus: () => status
    };
};

export const createPaymentEntity = ({id, orderId, method, amount, status = 'PENDING'}) => {
    if (!orderId) throw new Error("Order ID is required");

    return {
        getId: () => id,
        getOrderId: () => orderId,
        getMethod: () => method,
        getAmount: () => amount,
        getStatus: () => status
    };
};

export const createShippingEntity = ({id, orderId, addressId, trackingNumber, status = 'PENDING'}) => {
    if (!orderId) throw new Error("Order ID is required");

    return {
        getId: () => id,
        getOrderId: () => orderId,
        getAddressId: () => addressId,
        getTrackingNumber: () => trackingNumber,
        getStatus: () => status
    };
};
