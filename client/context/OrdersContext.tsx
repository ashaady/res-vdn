import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

export type OrderStatus = "pending" | "in_preparation" | "ready" | "completed";

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: "delivery" | "pickup";
  fullName: string;
  phone: string;
  address?: string;
  notes?: string;
  paymentMethod: "wave" | "maxit";
  status: OrderStatus;
}

interface OrdersContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = (order: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "in_preparation",
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    );
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
