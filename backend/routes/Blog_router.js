var express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
var Blog = require("../Models/Blog");
var User = require("../Models/User");
router.get("/", async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({
      message: "NO BLogs found",
    });
  }
  return res.status(200).json({ blogs });
});
router.post("/add", async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({
      message: "Unable to find User By This ID",
    });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    var session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session);
    existingUser.blogs.push(blog);
    await existingUser.save(session);
    await session.commitTransaction();
  } catch (err) {
    return res.status(500).json(err);
  }
  return res.status(200).json({ blog });
});

/*router.post("/add", (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({
      message: "Unable to find User By This ID",
    });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = mongoose.startSession();
    session.startTransaction();
    blog.save({ session });
    existingUser.blogs.push(blog);
    existingUser.save({ session });
    session.commitTransaction();
  } catch (err) {
    res.status(400).json(err);
  }
  blog
    .then((result) => {
      res.status(200).json({
        message: "Created Blog successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
*/
router.put("/update/:blogid", (req, res, next) => {
  const { title, description } = req.body;
  const id = req.params.blogid;
  Blog.findByIdAndUpdate(id, {
    title,
    description,
  })
    .then((blog) => {
      if (!blog) {
        res.status(400).json({
          message: "Unable To Update",
        });
      } else {
        res.status(200).json(blog);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:blogid", async (req, res, next) => {
  let blog;
  const Id = req.params.blogid;
try{
  blog = await Blog.findById(Id)
} catch (err) {
  return console.log(err);
}
if (!blog) {
  return res.status(404).json({
    message: "NO BLogs found",
  });
}
return res.status(200).json({ blog });
});

router.delete("/delete/:blogid", async (req, res, next) => {
  const id = req.params.blogid;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(400).json({
      message: "Unable To Delete",
    });
  }
  return res.status(200).json({
    message: "Blog Deleted",
    result: blog,
  });
});

// router.delete("/delete/:blogid", async (req, res, next) => {
//   const id = req.params.blogid;
//   let blog;
//   blog = await Blog.findByIdAndRemove(id)
//     .populate("user")
//     .exec()
//     .then((blog) => {
//       if (!blog) {
//         res.status(400).json({
//           message: "Unable To Delete",
//         });
//       } else {
//         res.status(200).json({
//           message: "Blog Deleted",
//           result: blog,
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error,
//       });
//     });
//   blog.user.blog.pull(blog);
// });

router.get("/user/:id", async (req, res, next) => {
  const id = req.params.id;
  let blogs;
  try {
    blogs = await User.findById(id).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({
      message: "NO BLogs found",
    });
  }
  return res.status(200).json({ blogs });
});

module.exports = router;
