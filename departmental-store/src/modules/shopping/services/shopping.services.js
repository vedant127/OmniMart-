import { 
    createCartEntity, 
    createOrderEntity, 
    createPaymentEntity,
    createShippingEntity
} from "../domain/shopping.entity.js";

const shoppingService = ({ shoppingRepository }) => ({
    
    // -- Carts --
    createCart: async (cartData) => {
        const cartEntity = createCartEntity(cartData);
        return await shoppingRepository.createCart({
            userId: cartEntity.getUserId(),
            productId: cartEntity.getProductId(),
            variantId: cartEntity.getVariantId(),
            quantity: cartEntity.getQuantity()
        });
    },

    getCartByUserId: async (userId) => {
        return await shoppingRepository.getCartByUserId(userId);
    },

    updateCart: async (id, cartData) => {
        return await shoppingRepository.updateCart(id, cartData);
    },

    deleteCart: async (id) => {
        return await shoppingRepository.deleteCart(id);
    },

    // -- Orders --
    createOrder: async (orderData) => {
        const orderEntity = createOrderEntity(orderData);
        return await shoppingRepository.createOrder({
            userId: orderEntity.getUserId(),
            totalAmount: orderEntity.getTotalAmount(),
            status: orderEntity.getStatus()
        });
    },

    getOrdersByUserId: async (userId) => {
        return await shoppingRepository.getOrdersByUserId(userId);
    },

    getOrderById: async (id) => {
        const order = await shoppingRepository.getOrderById(id);
        if (!order) throw new Error("Order not found");
        return order;
    },

    updateOrderStatus: async (id, orderData) => {
        return await shoppingRepository.updateOrderStatus(id, orderData);
    },

    // -- Payments --
    createPayment: async (paymentData) => {
        const paymentEntity = createPaymentEntity(paymentData);
        return await shoppingRepository.createPayment({
            orderId: paymentEntity.getOrderId(),
            method: paymentEntity.getMethod(),
            amount: paymentEntity.getAmount(),
            status: paymentEntity.getStatus()
        });
    },

    getPaymentsByUserId: async (userId) => {
        return await shoppingRepository.getPaymentsByUserId(userId);
    },

    verifyPayment: async (paymentId, payload) => {
        return await shoppingRepository.verifyPayment(paymentId, payload);
    },

    // -- Shipping -- 
    createShipping: async (shippingData) => {
        const shippingEntity = createShippingEntity(shippingData);
        return await shoppingRepository.createShipping({
            orderId: shippingEntity.getOrderId(),
            addressId: shippingEntity.getAddressId(),
            trackingNumber: shippingEntity.getTrackingNumber(),
            status: shippingEntity.getStatus()
        });
    },

    getShippingByOrderId: async (orderId) => {
        const shipping = await shoppingRepository.getShippingByOrderId(orderId);
        if (!shipping) throw new Error("Shipping record not found");
        return shipping;
    }
});

export default shoppingService;
