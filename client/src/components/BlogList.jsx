import { Link } from "react-router-dom";
import moment from "moment";

const BlogList = ({ blogs }) => {

    let blogDate = moment().format('D MMM YYYY');

    const handleExcerpt = (blogBody) => {
        const wordarray = blogBody.split(" ").slice(0, 18).join(" ");
        const stringing = wordarray.replace(/<\/?[^>]+(>|$)/g, " ");
        return stringing;
    }

    return (
        <div className="blog-list">
            {blogs.map((blog) => {
                const { _id, author, postBody, title, imagesrc } = blog
                    return(
                        <div className = "blog-preview" key = { _id } >
                            <Link to={`/postsdata/${_id}`}>
                                <div className="blog-thumbnail" style={{ backgroundImage: `url(${imagesrc})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}  ></div>
                                <div className="blog-preview-bg">
                                    <h2>{title}</h2>
                                    <p className="blog-excerpt w-auto overflow-x-hidden">{handleExcerpt(postBody) + " ..."}</p>
                                    <p className="blog-author">{author}</p>
                                    <p className="blog-date">{blogDate}</p>
                                </div>
                            </Link>
                        </div>
                    )
                }
            )}
    </div>
    );
};

export default BlogList;
