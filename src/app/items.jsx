"use client";

import { createContext, useContext, useRef, use, useState } from "react";

import { logger } from "../utils/logger";

const INITIAL_CONTEXT = { items: null };

const ItemsContext = createContext(INITIAL_CONTEXT);
ItemsContext.displayName = "ItemsContext";

export function useItems() {
  const { items } = useContext(ItemsContext);
  return items;
}

export function useItem(id) {
  const items = useItems();
  return items?.find((item) => item.id === id);
}

export function useItemMutation() {
  const { addItem, updateItem, deleteItem } = useContext(ItemsContext);

  return { addItem, updateItem, deleteItem };
}

export function ItemsContextProvider({ initialItemsPromise, children }) {
  logger.info("[items]", "rendering ItemsContextProvider client component");
  const initialItemsPromiseRef = useRef(null);
  const [items, setItems] = useState(INITIAL_CONTEXT.items);

  if (initialItemsPromise !== initialItemsPromiseRef.current) {
    logger.info(
      "[items]",
      "need to update ItemsContextProvider initial items",
      "use(initialItemsPromise)"
    );
    const initialItems = use(initialItemsPromise);
    initialItemsPromiseRef.current = initialItemsPromise;
    setItems(initialItems);
  }

  function addItem(item) {
    setItems((prevItems) => [item, ...prevItems]);
  }

  function updateItem(item) {
    setItems((prevItems) => {
      const prevItemIdx = prevItems.findIndex(({ id }) => id === item.id);
      if (prevItemIdx === -1) return prevItems;
      const newItems = prevItems.slice();
      newItems[prevItemIdx] = item;
      return newItems;
    });
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      const prevItemIdx = prevItems.findIndex((item) => item.id === id);
      if (prevItemIdx === -1) return prevItems;
      const newItems = prevItems.slice();
      newItems.splice(prevItemIdx, 1);
      return newItems;
    });
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  );
}
