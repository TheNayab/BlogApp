import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { authActions } from "../store/index";
const Navi = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <div className="header">
        <Navbar className="header" fixed="top" expand="lg" variant="dark">
          <Container fluid>
            <Navbar.Brand to="/blogs">BlogApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="naci" navbarScroll>
                {isLoggedIn && (
                  <div className="box">
                    <Link className="nav-link" to="/blogs">
                      Blogs
                    </Link>
                    <Link className="nav-link" to="/myblogs">
                      My Blogs
                    </Link>
                    <Link className="nav-link" to="/blogs/add">
                      Add Blogs
                    </Link>
                  </div>
                )}
                <div className="btn">
                  {!isLoggedIn && (
                    <>
                      <button type="button" className="btni">
                        <Link className="nav-link" to="/auth">
                          Login
                        </Link>
                      </button>
                      <button type="button" className="btni">
                        <Link className="nav-link" to="/signup">
                          Signup
                        </Link>{" "}
                      </button>
                    </>
                  )}
                  {isLoggedIn && (
                    <button
                      onClick={() => dispatch(authActions.logout())}
                      type="button"
                      className="btni"
                    >
                      <Link className="nav-link" to="/auth">
                        Logout
                      </Link>{" "}
                    </button>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Navi;

// import React, { useState } from "react";
// import "../index.css";
// import { Link } from "react-router-dom";

// const Nav = () => {
//   const [IsOpen, setIsOpen] = useState(false);

//   // var btnContainer = document.getElementById("Navbar");
//   // var btns = btnContainer.getElementsByClassName("btc");
//   // for (var i = 0; i < btns.length; i++) {
//   //   btns[i].addEventListener("click", function () {
//   //     var current = document.getElementsByClassName("active");
//   //     current[0].className = current[0].className.replace("active");
//   //     this.className += "active";
//   //   });
//   // }

//   return (
//     <>
//       <div className="nav" id="Navbar">
//         <div
//           className={`hamburger ${IsOpen && "open"}`}
//           onClick={() => setIsOpen(true)}
//         >
//           <div className="line "></div>
//           <div className="line "></div>
//           <div className="line "></div>
//         </div>
//         <Link className="heading" to="/blogs">
//           BlogsApp
//         </Link>
//         <ul className={`${IsOpen && "open"}`}>
//           <li>
//             <Link className="btc" to="/blogs">
//               AllBlogs
//             </Link>
//           </li>
//           <li>
//             <Link className="btc" to="/myblogs">
//               MyBlogs
//             </Link>
//           </li>
//           <li>
//             {/* <Link className="btc" to="/">
//               ContactUs
//             </Link> */}
//           </li>
//         </ul>
//         <button className="btn in"><Link to="/auth">Login</Link></button>
//         <button className="btn sign"><Link to="/auth">Signup</Link></button>
//         <button className="btn "><Link to="/auth">Logout</Link></button>
//       </div>
//     </>
//   );
// };

// export default Nav;
