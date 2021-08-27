import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetUpDetails from "../components/meetups/MeetUpDetail";

function MeetingDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetUpData.title}</title>
        <meta name="description" content={props.meetUpData.description} />
      </Head>
      <MeetUpDetails
        image={props.meetUpData.image}
        title={props.meetUpData.title}
        address={props.meetUpData.address}
        description={props.meetUpData.description}
      />
    </>
  );
}

export default MeetingDetails;

export async function getStaticPaths() {
  let client = await MongoClient.connect(
    "mongodb+srv://waqaskhan:gtsaw1212@cluster0.kg1wj.mongodb.net/meetupsdatabase?retryWrites=true&w=majority"
  );

  let db = client.db("meetupsdatabase");
  let meetupsCollection = db.collection("meetups");

  let meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  // for dynamic pages we add get static paths
  return {
    //contains all the key value pairs that might lead to your page
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  let meetUpId = context.params.meetupId;
  let client = await MongoClient.connect(
    "mongodb+srv://waqaskhan:gtsaw1212@cluster0.kg1wj.mongodb.net/meetupsdatabase?retryWrites=true&w=majority"
  );

  let db = client.db("meetupsdatabase");
  let meetupsCollection = db.collection("meetups");

  let meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  let selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetUpId),
  });

  client.close();

  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
