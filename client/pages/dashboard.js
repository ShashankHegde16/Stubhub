import preClient from "../apis/pre-client";

const Dashboard = ({ currentUser }) => {
  return <h1>{currentUser ? "You are signed in" : "You are not signed in"}</h1>;
};

Dashboard.getInitialProps = async (context) => {
  try {
    const { data } = await preClient(context).get("/api/users/currentuser");
    return data;
  } catch (e) {
    return { currentUser: null };
  }
};
export default Dashboard;
