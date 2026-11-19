import Joi from "joi";

// Shared fields
const addressFields = {
  name: Joi.string().trim().min(3).max(50),

  phone: Joi.string().trim().min(10).max(15),

  country: Joi.string().trim().min(2).max(50),

  city: Joi.string().trim().min(2).max(50),

  street: Joi.string().trim().min(3).max(100),

  building: Joi.string().trim().max(30),

  apartment: Joi.string().trim().max(30).allow(""),

  postalCode: Joi.string().trim().max(20).allow(""),

  isDefault: Joi.boolean(),
};

// Add Address
export const addAddressSchema = Joi.object({
  name: addressFields.name.required(),
  phone: addressFields.phone.required(),
  country: addressFields.country.required(),
  city: addressFields.city.required(),
  street: addressFields.street.required(),
  building: addressFields.building.required(),
  apartment: addressFields.apartment.optional(),
  postalCode: addressFields.postalCode.optional(),
  isDefault: addressFields.isDefault.optional(),
}).unknown(false);

// Edit Address
export const editAddressSchema = Joi.object({
  ...addressFields,
})
  .min(1)
  .unknown(false);

// Address ID
export const addressIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
