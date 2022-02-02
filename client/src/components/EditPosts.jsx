import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "quill/dist/quill.snow.css";
import ReactQuill from 'react-quill';

const EditPosts = () => {

    const modules = { 
        toolbar : [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'link','code'],        // toggled buttons
        ['image', 'blockquote', 'code-block'],
      
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      
        // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
      
        ['clean']                                         // remove formatting button
        ]
    }
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Vishwajeet");
    const [imagesrc, setImg] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    
    const getEditBlogData = async () => {
        await axios.get((process.env.PORT || "http://localhost:5000/postsdata/") + id)
            .then(res => {
                const {title, postBody, author, imagesrc } = res.data
                setTitle(title)
                setBody(postBody)
                setAuthor(author)
                setImg(imagesrc)
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getEditBlogData(),[])

    const handleEdit = e => {
        e.preventDefault()
        
        const blog = { title, author, postBody: body, imagesrc };
        fetch((process.env.PORT || "http://localhost:5000/postsdata/update/") + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        }).then(() => {
            setIsPending(false);
            history.push(`/postsdata/${id}`)
        }).catch(err => console.log(err))
    }
    
    return (
        <div className="create">
            <form onSubmit={handleEdit} id="form1">
        <div className="create-container">
          <div className="blog-body">
            <div id="editor-container">
            <ReactQuill value={body} onChange={setBody} modules={modules} theme="snow"/>
            </div>
          </div>

          <div className="create-right-sidebar">
            {!isPending && (
              <button type="submit" form="form1" className="submit-button">
                Publish
              </button>
            )}

            <div className="create-right-inputs">
              <div className="input-group">
                <label>Blog Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Thumbnail Image</label>
                <input
                  type="text"
                  required
                  value={imagesrc}
                  onChange={(e) => setImg(e.target.value)}
                ></input>
              </div>

              <div className="input-group">
                <label>Blog Author</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>

        {isPending && <button disabled>Loading</button>}
      </form>
        </div>
    );
};

export default EditPosts;