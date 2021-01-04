import { connect } from "../../../utils/db";
import Joi from "joi";

export default async function (req, res) {
  if (req.method === "POST") {
    try {
      const { db } = await connect();

      let { fullurl, shorturl } = req.body;
      const urlschema = Joi.object().keys({
        fullurl: Joi.string().required(),
        shorturl: Joi.string().required(),
      });

      const value = await urlschema.validateAsync({ fullurl, shorturl });
      console.log(value);
      const existing = await db.findOne({ shorturl });
      if (existing) {
        throw new Error("Short URL in Use");
      } else {
        const result = await db.insert(value);
        res.status(201);
        res.json(result);
      }
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  }
}
