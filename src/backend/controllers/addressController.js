import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Wishlist are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's wishlist.
 * send GET Request at /api/user/wishlist
 * */

export const getAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userAddress = schema.users.findBy({ _id: userId }).address;
  return new Response(200, {}, { address: userAddress });
};

/**
 * This handler handles adding items to user's wishlist.
 * send POST Request at /api/user/wishlist
 * body contains {product}
 * */

export const addItemToAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddress = schema.users.findBy({ _id: userId }).address;
    const { product } = JSON.parse(request.requestBody);
    userAddress.push({
      ...product,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update({ _id: userId }, { address: userAddress });
    return new Response(201, {}, { address: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing items to user's wishlist.
 * send DELETE Request at /api/user/wishlist
 * body contains {product}
 * */

export const removeItemFromAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userAddress = schema.users.findBy({ _id: userId }).address;
    const productId = request.params.productId;
    userAddress = userAddress.filter((item) => item._id !== productId);
    this.db.users.update({ _id: userId }, { address: userAddress });
    return new Response(200, {}, { address: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
