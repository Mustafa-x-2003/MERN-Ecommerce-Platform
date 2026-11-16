import ApiError from "../utils/errorClass.js";

const validator = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");

      return next(new ApiError(errorMessage, 400));
    }

    if ((property == "query")) {
      req.validateData = {};
      req.validateData = value;
    } else {
      req[property] = value;
    }

    next();
  };
};
export default validator;
