import Joi from 'joi';

const orderSchema = Joi.object({
    data: Joi
        .number()
        .required(),
    address: Joi.object({
        zipcode: Joi
            .string()
            .length(8)
            .required(),
        city: Joi
            .string()
            .required(),
        street: Joi
            .string()
            .required(),
        number: Joi
            .string()
            .alphanum()
            .required(),
    })
    .required(),
});

export default orderSchema;