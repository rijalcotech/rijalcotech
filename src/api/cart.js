import { endpoints } from "./endpoints";

import { fetcher, poster } from "@/lib/axios-client";

export const getCartData = async () => {
  try {
    const response = await fetcher(endpoints.cart.getProducts);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const addProductToCart = async (product, token) => {
//   try {
//     if (token) {
//       const response = await poster(
//         [
//           endpoints.cart.addProduct,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         ],
//         product
//       );

//       return response.data;
//     } else {
//       const response = await poster(endpoints.cart.addProduct, product);

//       return response.data;
//     }
//   } catch (error) {
//     throw error;
//   }
// };
export const addProductToCart = async (product, token = null) => {
  // Log what we're sending to debug the validation issue
  console.log("[CART API] Adding to cart with data:", product);

  // Ensure product is an array and add product_type if missing
  let productArray = Array.isArray(product) ? product : [product];

  // Add product_type to each item if not present
  productArray = productArray.map((item) => ({
    product_type: item.product_type || "Product",
    product_id: item.product_id,
    quantity: item.quantity || 1,
    ...(item.variant_id && { variant_id: item.variant_id }),
  }));

  // If only one item, send as single object; otherwise send as array
  // Some APIs expect single item for add-to-cart
  const payload = productArray.length === 1 ? productArray[0] : productArray;

  console.log("[CART API] Formatted payload:", payload);

  // If token is provided, pass it in the Authorization header
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const res = await poster(
    token ? [endpoints.cart.addProduct, config] : endpoints.cart.addProduct,
    payload,
  );

  console.log("[CART API] Response:", res);

  // Return the data in a consistent format
  // API might return { success: true, data: [...] } or just the data
  return res?.data || res;
};

export const updateProductInCart = async ({ cartId, quantity }) => {
  try {
    const response = await poster(endpoints.cart.updateProduct(cartId), {
      quantity,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const removeProductFromCart = async (cartId) => {
  try {
    const response = await poster(endpoints.cart.removeProduct(cartId));
    return response;
  } catch (error) {
    throw error;
  }
};

export const clearCartData = async () => {
  try {
    const response = await poster(endpoints.cart.clearProducts);

    return response;
  } catch (error) {
    throw error;
  }
};

export const checkDiscount = async (data) => {
  try {
    const response = await poster(endpoints.cart.checkDiscount, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const calculateCart = async (data = {}) => {
  try {
    const response = await poster(endpoints.cart.calculate, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const syncCartToServer = async (items, token = null) => {
  // Sync multiple cart items - API expects array with product_type
  // Format all items correctly for the API
  const cartItems = items.map((item) => {
    const cartData = {
      product_type: item.product_type || "Product",
      product_id: item.product_id,
      quantity: item.quantity || 1,
    };

    // Add variant_id only if it exists
    if (item.variant_id) {
      cartData.variant_id = item.variant_id;
    }

    return cartData;
  });

  console.log("[CART SYNC] Syncing items:", cartItems);

  try {
    // Send items as array (API expects array format)
    const res = await addProductToCart(cartItems, token);
    console.log("[CART SYNC] Sync successful:", res);
    return res;
  } catch (error) {
    console.error("[CART SYNC] Failed to sync items");
    console.error("[CART SYNC] Error details:", {
      status: error.status,
      message: error.message,
      errors: error.errors,
      data: error.data,
      fullError: error,
    });
    throw error;
  }
};
