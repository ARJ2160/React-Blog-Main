import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found h-screen flex justify-center items-center flex-col text-white">
            <h2 className="text-5xl">Sorry, not found</h2>
            <Link to='/' className="text-2xl text-blue-700">Back to Home</Link>
        </div>
     );
}
 
export default NotFound;