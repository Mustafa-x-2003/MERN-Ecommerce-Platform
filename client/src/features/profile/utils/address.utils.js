export const getFormData = (address) => {
  return {
    name: address?.name || "",
    phone: address?.phone || "",
    country: address?.country || "",
    city: address?.city || "",
    street: address?.street || "",
    building: address?.building || "",
    apartment: address?.apartment || "",
    postalCode: address?.postalCode || "",
  };
};
