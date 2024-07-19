const Joi = require('joi');
const Boom = require('boom');

const searchAnimeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getAnimeByGenreStatusValidation = (data) => {
  const schema = Joi.object({
    genre: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required(),
    status: Joi.string().valid('FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const searchAnimeYear = (data) => {
  const schema = Joi.object({
    year: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  searchAnimeValidation,
  getAnimeByGenreStatusValidation,
  searchAnimeYear
};
