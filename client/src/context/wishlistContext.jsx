import {
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
} from "@/features/wishlist/services/wishlist.services";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Get Wishlist Item
  const handleGetWishlist = useCallback(async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // Add Wishlist Item
  const handleAddToWishlist = useCallback(
    async (id) => {
      try {
        await addToWishlist(id);
        toast.success("Product added to wishlist");
        await handleGetWishlist();
      } catch (error) {
        console.log(error);
      }
    },
    [handleGetWishlist],
  );
  // Delete Wishlist Item
  const handleDeleteFromWishlist = useCallback(
    async (id) => {
      try {
        await deleteFromWishlist(id);
        toast.success("Product deleted from wishlist");
        await handleGetWishlist();
      } catch (error) {
        console.log(error);
      }
    },
    [handleGetWishlist],
  );

  useEffect(() => {
    (async () => {
      await handleGetWishlist();
    })();
  }, [handleGetWishlist]);
  const value = useMemo(
    () => ({ handleAddToWishlist, wishlist, handleDeleteFromWishlist }),
    [handleAddToWishlist, wishlist, handleDeleteFromWishlist],
  );
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
