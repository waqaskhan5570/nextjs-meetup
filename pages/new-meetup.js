import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetUpForm from "../components/meetups/NewMeetUpForm";

function NewMeetUpPage() {
  let router = useRouter();
  async function addMeetUpHandler(meetUpData) {
    let response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetUpData),
      headers: {
        "content-Type": "application/json",
      },
    });
    let data = await response.json();
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>Add MeetUp</title>
        <meta name="description" content="Add your own meet ups." />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler} />;
    </div>
  );
}

export default NewMeetUpPage;
