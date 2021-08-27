import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    let client = await MongoClient.connect(
      "mongodb+srv://waqaskhan:gtsaw1212@cluster0.kg1wj.mongodb.net/meetupsdatabase?retryWrites=true&w=majority"
    );

    let db = client.db("meetupsdatabase");
    let meetupsCollection = db.collection("meetups");
    let result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meeting Inserted" });
  }
}

export default handler;
