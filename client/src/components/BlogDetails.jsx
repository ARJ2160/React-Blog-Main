import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdminStatus } from "../redux/adminSlice";
import useFetch from "../useFetch";
import moment from "moment";
import parse from "html-react-parser";

import profile_image from "../images/picture.jpg";

const BlogDetails = () => {
    
    const isAdmin = useSelector(getAdminStatus)
    let blogDate = moment().format('D MMM YYYY');
    const { id } = useParams();
    const history = useHistory()
    const { data: blog, isPending, errorMsg } = useFetch((process.env.PORT || "http://localhost:5000/postsdata/") + id);

    const handleDelete = () => {
        fetch((process.env.PORT || "http://localhost:5000/") + "postsdata/" + blog._id, { method: 'DELETE' })
        .then(() => history.push('/'))
        .catch(err => console.log(err))
    }

    const handleParsing = () => {
        const parsedBody = parse(blog.postBody);
        return parsedBody
    }

    return (
        <div className="blog-details">
        <div className="top-profile">
            <div className="top-profile-picture">
            <img src={profile_image} alt="profile-pic-top" />
            </div>
            <div className="top-profile-name">
            <p>Vishwajeet Deshmukh</p>
            </div>
        </div>
        {isPending && <div>Loading...</div>}
        {errorMsg && <div>{errorMsg}</div>}
        {blog && (
            <article className="blog-main-content" >
            <div className="main-content-header">
                <div className="content-title-date">
                <h2 className="blogdetails-title">{blog.title}</h2>
                <p className="blogdetails-date">{blogDate}</p>
                </div>
                <div className="content-image">
                    <img className="blog-image" src={blog.imagesrc} alt="blog-pic" />
                </div>
            </div>
            <div className="blogdetails-body">{handleParsing()}</div>
            <Link to={`/postsdata/update/${blog._id}`}>
                <button
                    className={isAdmin === "admin" ? "blogdetails-edit visible mr-10" : "invisible blogdetails-edit"}>
                Edit Post
                </button>
            </Link>
            <button
                    className={isAdmin === "admin" ? "blogdetails-delete visible" : "invisible blogdetails-delete"}
                    onClick={handleDelete}>Delete Me</button>
            </article>
        )}
        </div>
    );
};

export default BlogDetails;