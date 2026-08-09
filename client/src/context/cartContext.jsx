import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addToCart,
  getCart,
  deleteFromCart,
  updateCartQuantity,
} from "@/features/cart/services/cartServices";
import { toast } from "react-toastify";
const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState({
    getCart: false,
    addToCart: false,
    deleteFromCart: false,
    quantity: false,
  });
  // Get cart
  const handleGetCart = useCallback(async () => {
    setLoading((pre) => ({ ...pre, getCart: true }));
    try {
      const res = await getCart();
      setCart(res.data.cartItems);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading((pre) => ({ ...pre, getCart: false }));
    }
  }, []);
  // Updatae quantity
  const handleUpdateCartQuantity = useCallback(
    async (payload) => {
      setLoading((pre) => ({ ...pre, quantity: true }));
      try {
        await updateCartQuantity(payload);
        await handleGetCart(payload);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading((pre) => ({ ...pre, quantity: false }));
      }
    },
    [handleGetCart],
  );
  // Add to cart
  const handleAddCart = useCallback(
    async (id) => {
      setLoading((pre) => ({ ...pre, addToCart: true }));
      try {
        await addToCart(id);
        toast.success("Product added to cart");
        await handleGetCart();
      } catch (error) {
        console.log(error.message);
        toast.error("Could not add product to cart");
      } finally {
        setLoading((pre) => ({ ...pre, addToCart: false }));
      }
    },
    [handleGetCart],
  );
  // Delete from cart
  const handleDeleteFromCart = useCallback(
    async (id) => {
      setLoading((pre) => ({ ...pre, deleteFromCart: true }));
      try {
        await deleteFromCart(id);
        toast.success("Product removed from cart");
        await handleGetCart();
      } catch (error) {
        console.log(error.message);
        toast.error("Could not remove product from cart");
      } finally {
        setLoading((pre) => ({ ...pre, deleteFromCart: false }));
      }
    },
    [handleGetCart],
  );

  useEffect(() => {
    handleGetCart();
  }, [handleGetCart]);

  const value = useMemo(
    () => ({
      loading,
      cart,
      handleAddCart,
      handleGetCart,
      handleDeleteFromCart,
      handleUpdateCartQuantity,
    }),
    [
      loading,
      cart,
      handleAddCart,
      handleGetCart,
      handleDeleteFromCart,
      handleUpdateCartQuantity,
    ],
  );
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
