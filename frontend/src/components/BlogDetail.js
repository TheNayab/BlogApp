import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const BlogDetail = () => {
  const navigate=useNavigate()
  const [blog, setblog] = useState();
  const id = useParams().id;
  const [Inputs, setInputs] = useState();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchdetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  const SendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/blog/update/${id}`, {
        title: Inputs.title,
        description: Inputs.description,
      })
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    fetchdetails().then((data) => {
      setblog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    SendRequest().then((data) => console.log(data)).then(()=>navigate("/myblogs"));
  };

  return (
    <div>
      {Inputs && (
        <form className="post" onSubmit={handleSubmit}>
          <h1>Update your Blog</h1>
          <h4>Title</h4>
          <input
            name="title"
            onChange={handleChange}
            value={Inputs.title}
            className="postinput"
            type="title"
          />
          <h4>Description</h4>
          <input
            name="description"
            onChange={handleChange}
            value={Inputs.description}
            className="postinput"
            type="description"
          />

          <button className="pobtn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
