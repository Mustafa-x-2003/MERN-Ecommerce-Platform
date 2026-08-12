import {
  createOrder,
  getOrders,
  getOrder,
} from "@/features/orders/services/ordersServicess";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCart } from "./cartContext";

const OrdersContext = createContext();

export default function OrdersProvider({ children }) {
  const {handleGetCart}= useCart()
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState({
    create: false,
    orders: false,
    order: false,
  });
  // Get all orders
  const handelGetOrders = useCallback(async () => {
    setLoading((pre) => ({ ...pre, orders: true }));
    try {
      const res = await getOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((pre) => ({ ...pre, orders: false }));
    }
  }, []);

  // Get a orders
  const handelGetOrder = useCallback(async (id) => {
    setLoading((pre) => ({ ...pre, order: true }));
    try {
      const res = await getOrder(id);
      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((pre) => ({ ...pre, order: false }));
    }
  }, []);

  // Create orders
  const handelCreateOrder = useCallback(
    async (payload) => {
      setLoading((pre) => ({ ...pre, create: true }));
      try {
        const res = await createOrder(payload);
        toast.success("Order placed successfully!");
        navigate(`/success/${res.data.order._id}`);
        await handelGetOrders();
        await handleGetCart();
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to place order. Please try again.",
        );
      } finally {
        setLoading((pre) => ({ ...pre, create: false }));
      }
    },
    [handelGetOrders, navigate],
  );
  useEffect(() => {
    handelGetOrders();
  }, [handelGetOrders]);
  const value = useMemo(
    () => ({ orders, order, loading, handelGetOrder, handelCreateOrder }),
    [orders, order, loading, handelGetOrder, handelCreateOrder],
  );
  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
