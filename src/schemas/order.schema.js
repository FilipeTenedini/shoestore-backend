import Joi from 'joi';

const orderSchema = Joi.object({
    data: Joi
        .number()
        .required(),
    payment: Joi
        .string()
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
            .required(),
    })
    .required(),
});

export default orderSchema;