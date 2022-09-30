import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
const MyBlogs = () => {
  const [blogs, setBlogs] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs.blogs));
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Card
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default MyBlogs;
