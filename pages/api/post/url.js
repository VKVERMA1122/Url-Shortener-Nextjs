import { connect } from "../../../utils/db";
import Joi from "joi";
import Cors from "cors";


const cors = Cors({
  methods: ["GET", "HEAD","POST"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function (req, res) {
  await runMiddleware(req, res, cors)

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
