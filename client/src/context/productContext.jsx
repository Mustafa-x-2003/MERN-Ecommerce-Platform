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
  getProduct,
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
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState({
    getProducts: false,
    getProduct: false,
    getCategory: false,
  });

  const [categories, setCategories] = useState([]);

  const handelgetProducts = useCallback(async () => {
    setLoading((pre) => ({ ...pre, getProducts: true }));
    try {
      const res = await getProducts(search);
      setProducts(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading((pre) => ({ ...pre, getProducts: false }));
    }
  }, [search]);
  const handelgetProduct = useCallback(async (id) => {
    setLoading((pre) => ({ ...pre, getProduct: true }));
    try {
      const res = await getProduct(id);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading((pre) => ({ ...pre, getProduct: false }));
    }
  }, []);

  const handelgetCategory = useCallback(async () => {
    setLoading((pre) => ({ ...pre, getCategory: true }));
    try {
      const res = await getCategory();
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading((pre) => ({ ...pre, getCategory: false }));
    }
  }, []);

  useEffect(() => {
    handelgetProducts(search);
    handelgetCategory();
  }, [handelgetProducts, search, handelgetCategory]);

  const value = useMemo(
    () => ({
      products,
      product,
      categories,
      search,
      setSearch,
      handelgetProducts,
      handelgetProduct,
      handelgetCategory,
      loading,
    }),
    [
      products,
      product,
      categories,
      search,
      setSearch,
      handelgetProducts,
      handelgetProduct,
      handelgetCategory,
      loading,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
