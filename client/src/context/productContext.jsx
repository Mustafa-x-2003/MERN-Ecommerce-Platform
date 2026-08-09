import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getProducts,
  getCategory,
} from "@/features/products/services/product.serveces";

const ProductContext = createContext();
export default function ProductProvider({ children }) {
  const [search, setSearch] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const handelgetProductss = useCallback(async () => {
    try {
      const res = await getProducts(search);
      setProducts(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [search]);

  const handelgetCategory = useCallback(async () => {
    try {
      const res = await getCategory();
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    handelgetProductss(search);
    handelgetCategory();
  }, [handelgetProductss, search, handelgetCategory]);

  const value = useMemo(
    () => ({
      products,
      categories,
      search,
      setSearch,
      handelgetProductss,
      handelgetCategory,
    }),
    [
      products,

      categories,
      search,
      setSearch,
      handelgetProductss,

      handelgetCategory,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
