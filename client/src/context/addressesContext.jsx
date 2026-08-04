import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/features/profile/addresses.servece";
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
      toast.error("Failed to fetch addresses");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const call = async () => {
      await fetchAddresses();
    };
    call();
  }, [fetchAddresses]);

  const handleAdd = useCallback(
    async (payload) => {
      try {
        await addAddress(payload);
        await fetchAddresses();
        toast.success("Address added");
      } catch (error) {
        toast.error("Add failed");
        throw error;
      }
    },
    [fetchAddresses],
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteAddress(id);
        await fetchAddresses();
        toast.success("Address deleted");
      } catch (error) {
        toast.error("Delete failed");
        throw error;
      }
    },
    [fetchAddresses],
  );

  const handleUpdate = useCallback(
    async (id, payload) => {
      try {
        await updateAddress(id, payload);
        await fetchAddresses();
        toast.success("Address updated");
      } catch (error) {
        toast.error("Update failed");
        throw error;
      }
    },
    [fetchAddresses],
  );

  const handlesetDefaultAddress = useCallback(
    async (id) => {
      try {
        await setDefaultAddress(id);
        await fetchAddresses();
        toast.success("Default address updated");
      } catch (error) {
        toast.error("Update failed");
        throw error;
      }
    },
    [fetchAddresses],
  );

  const value = useMemo(
    () => ({
      addresses,
      setAddresses,
      loading,
      fetchAddresses,
      handleAdd,
      handleDelete,
      handleUpdate,
      handlesetDefaultAddress,
    }),
    [
      addresses,
      fetchAddresses,
      handleAdd,
      handleDelete,
      handleUpdate,
      handlesetDefaultAddress,
      loading,
    ],
  );
  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}
export const useAddresses = () => useContext(AddressContext);
