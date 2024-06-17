// 'use strict';

// /**
//  * sessioncard controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::sessioncard.sessioncard');

"use strict";

/**
 * sessioncard controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::sessioncard.sessioncard",
  ({ strapi }) => ({
    async findBySlug(ctx) {
      const { slug } = ctx.params;

      const entity = await strapi.db
        .query("api::sessioncard.sessioncard")
        .findOne({
          where: { slug },
          populate: true,
        });

      if (!entity) {
        return ctx.notFound();
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
