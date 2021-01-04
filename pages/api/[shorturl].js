import { connect } from "../../utils/db";

export default async function (req, res) {
  const { db } = await connect();
  const {
    query: { shorturl },
  } = req;
  try {
    const url = await db.findOne({ shorturl });

    if (url) {
      res.redirect(url.fullurl);
    }
  } catch (error) {
    return res.status(404).sendFile(notFoundPath);
  }
}
