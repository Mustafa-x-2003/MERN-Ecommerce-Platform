import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addAddress,
  getAddress,
  getDefaultAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress as setDefaultAddressApi,
} from "@/features/profile/addresses.servece";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchAddresses = useCallback(async () => {
    if (!user) return;
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
  }, [user, setLoading]);

  useEffect(() => {
    fetchAddresses();
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

  const handleGetDefaultAddress = useCallback(async () => {
    try {
      const res = await getDefaultAddress();
      setDefaultAddress(res.data.defaultAddress);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }, []);

  const handlesetDefaultAddress = useCallback(
    async (id) => {
      try {
        await setDefaultAddressApi(id);
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
      defaultAddress,
      setAddresses,
      loading,
      fetchAddresses,
      handleGetDefaultAddress,
      handleAdd,
      handleDelete,
      handleUpdate,
      handlesetDefaultAddress,
    }),
    [
      addresses,
      defaultAddress,
      fetchAddresses,
      handleGetDefaultAddress,
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
