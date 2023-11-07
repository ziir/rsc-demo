"use client";

import { createContext, useContext, useRef, useState } from "react";

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

export function ItemsContextProvider({
  initialItems = INITIAL_CONTEXT.items,
  children,
}) {
  console.log("ItemsContextProvider", initialItems);
  const initialItemsRef = useRef(initialItems);
  const [items, setItems] = useState(initialItems);

  if (initialItems !== initialItemsRef.current) {
    initialItemsRef.current = initialItems;
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
