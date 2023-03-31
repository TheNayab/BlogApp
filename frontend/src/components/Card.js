import React from "react";
import { useNavigate } from "react-router-dom";
//import img2 from "../images/img3.jpg";
import "../index.css";
import axios from "axios"

const Card = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handledit = (e) => {
    navigate(`/myblogs/${id}`);
  };
  const DeleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/blog/delete/${id}`)
      .catch((err) => console.log(err));
    const data =await res.data;
    return data;
  };
  const handledelete = () => {
    DeleteRequest().then(() => navigate("/")).then(()=>navigate("/blogs"));
  };

  return (
    <div>
      <div className="card">
        {isUser && (
          <div className="del">
            <iconbutton>
              <i onClick={handledit} class="fa fa-edit"></i>
              <i onClick={handledelete} class="fa fa-trash-o"></i>
            </iconbutton>
          </div>
        )}
        <h5 className="card-title">{title}</h5>

        <img src={imageURL} className="card-img-top" alt="..." />
        <hr />
        <br />
        <div className="card-body">
          <p className="card-text">
            <b> {userName}</b>
            {" : "}
            {description}
          </p>
          
      </div>
      </div>
    </div>
  );
};

export default Card;
