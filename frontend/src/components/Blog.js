import React from "react";
import "../index.css";
import img from "../images/clock.jpeg";
const Blog = () => {
  return (
    <div>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="land">
            <div className="para">
              <div>
                <h1>Content is just something to talk about </h1>
             
                  You can buy attention (advertising). You can beg for attention
                  from the media (PR). You can bug people one at a time to get
                  attention (sales). Or you can earn attention by creating
                  something interesting and valuable and then publishing it
                  online
                
              </div>
            </div>
            <img src={img} width={300} height={220} alt="..." />
          </div>
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Blog;
