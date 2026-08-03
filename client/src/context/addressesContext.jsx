import {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} from "@/features/profile/addresses.servece";
import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getAddress();
      setAddresses(res.data.addresses);
    } catch (error) {
      toast.error("error fetch address");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAdd = useCallback(async (payload) => {
    try {
      await addAddress(payload);
    } catch (error) {
      toast.error("error add");
      throw error;
    }
  }, []);
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteAddress(id);
    } catch (error) {
      toast.error("error delete");
      throw error;
    }
  }, []);

  const handleUpdate = useCallback(async (id, payload) => {
    try {
      await updateAddress(id, payload);
    } catch (error) {
      toast.error("error update");
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      addresses,
      setAddresses,
      loading,
      fetchAddresses,
      handleAdd,
      handleDelete,
      handleUpdate,
    }),
    [addresses, fetchAddresses, handleAdd, handleDelete, handleUpdate, loading],
  );
  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}
export const useAddresses = () => useContext(AddressContext);
