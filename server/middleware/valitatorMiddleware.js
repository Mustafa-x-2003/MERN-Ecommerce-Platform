import asyncHandler from "express-async-handler";

const validator = (schema, property = "body") => {
  return asyncHandler(async (req, res, next) => {
    const value = await schema.validateAsync(req[property], {
      abortEarly: false,
    });

    if (property === "query") {
      req.validateData = value;
    } else {
      req[property] = value;
    }

    next();
  });
};

export default validator;
