import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAdminStatus, isLoggedIn, setLogStatus } from "../redux/adminSlice"

const Navbar = () => {
    
    const logIn = useSelector(isLoggedIn)
    const adminStatus = useSelector(getAdminStatus)
    const dispatch = useDispatch()

    return ( 
        <nav className="navbar">
            <Link to="/">
                <h1>React Blog App</h1>
            </Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link
                    className={adminStatus === "admin" ? `nav-link-visible` : `nav-link-invisible`} to="/create">
                    New Blog
                </Link>
                <Link
                    className={logIn ? `nav-link-invisible` : `nav-link-visible`} to="/signin">
                    Sign In
                </Link>
                <Link
                    className={logIn ? `nav-link-invisible` : `nav-link-visible`} to="/signup">
                    Sign Up
                </Link>
                <Link
                    className={logIn ? `nav-link-visible` : `nav-link-invisible`}
                    onClick={() => dispatch(setLogStatus())}
                    to="/">Sign Out
                </Link>
            </div>
        </nav>
     );
}
 
export default Navbar;