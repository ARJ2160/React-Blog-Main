import BlogList from "./BlogList";
import useFetch from "../useFetch";
import profile_image from "../images/picture.jpg";

const Home = () => {

  const { data: blogs, isPending, errorMsg } = useFetch((process.env.PORT === "" ? process.env.PORT : "http://localhost:5000") + "/postsdata")
console.log(process.env.PORT);
  return (
    <div className="homepage">
      <div className="home-profile-section">
        <div className="profile--content">
          <div className="profile-picture">
            <img src={profile_image} alt="profile-pic" />
          </div>
          <div className="profile-details">
              <div className="details-name"><h3>Vishwajeet Deshmukh</h3></div>
              <div className="details-bio"><p>I am not teaching, I am learning aloud.</p></div>
          </div>
        </div>
      </div>
      {errorMsg && <div>{errorMsg}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
