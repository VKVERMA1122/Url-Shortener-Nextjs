import monk from "monk"

const client = new monk(process.env.MONGODB_URI)

async function connect() {
  const db = client.get("urls")
  db.createIndex({ shorturl: 1 }, { unique: true })
  return { db, client }
  
}

export { connect };