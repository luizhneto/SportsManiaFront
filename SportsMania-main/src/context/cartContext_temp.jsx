
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantidade: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Função para calcular o número total de itens
  const totalItems = state.items.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart: state, dispatch, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);