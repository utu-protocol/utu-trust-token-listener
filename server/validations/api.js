import Joi from "joi";
import Validator from "./_validator";

const ADDRESS_REGEX = new RegExp("^0x[a-fA-F0-9]{40}$");

const endorsementsValidation = new Validator(
  Joi.object()
    .keys({
      target_address: Joi.string().allow("").pattern(ADDRESS_REGEX).optional(),
      source_address: Joi.string().allow("").pattern(ADDRESS_REGEX).optional(),
    })
    .or("target_address", "source_address")
);

const connectionsValidation = new Validator(
  Joi.object().keys({
    target_address: Joi.string().required(),
  })
);

export { endorsementsValidation, connectionsValidation };
