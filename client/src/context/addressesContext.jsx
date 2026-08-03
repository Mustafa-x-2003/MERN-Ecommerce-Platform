import {
  getAddress,
  updateAddress,
  deleteAddress,
} from "@/features/profile/addresses.servece";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    setLoading(true);

    try {
      const res = await getAddress();
      setAddresses(res.data.addresses);
    } catch (error) {
      toast.error("error featch address");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAddress(id);
    } catch (error) {
      toast.error("error delete");
      throw error;
    }
  }

  async function handleUpdate(id, payload) {
    try {
      await updateAddress(id, payload);
    } catch (error) {
      toast.error("error update");
      throw error;
    }
  }

  const value = useMemo(
    () => ({
      addresses,
      fetchAddresses,
      setAddresses,
      handleDelete,
      handleUpdate,
      loading,
    }),
    [addresses, loading],
  );
  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}
export const useAddresses = () => useContext(AddressContext);
