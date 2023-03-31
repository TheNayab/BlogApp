import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Blog from "./Blog";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  return (
    <div>
      <Blog />
      {/* <Card/> */}
      <div className="Alll">
      {blogs &&
        blogs.map((blog, index) => (
          <Card
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
        </div>
    </div>
  );
};

export default AllBlogs;
