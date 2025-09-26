import { handleError } from "../helpers/handleError.js";
import BlogLike from "../models/BlogLike.model.js";

export const likeCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const { userid } = req.query;
    const likeCount = await BlogLike.countDocuments({ blogid });

    let hasUserLiked = false;
    if (userid) {
      const getUserLike = await BlogLike.countDocuments({ blogid, userid });
      if (getUserLike > 0) hasUserLiked = true;
    }

    res.status(200).json({
      likeCount,
      hasUserLiked,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const doLike = async (req, res, next) => {
  try {
    const { blogid, userid } = req.body;
    let like;
    like = await BlogLike.findOne({ userid, blogid });
    if (!like) {
      const saveLike = new BlogLike({
        userid,
        blogid,
      });
      like = await saveLike.save();
    } else {
      await BlogLike.findByIdAndDelete(like._id);
    }

    const likeCount = await BlogLike.countDocuments({ blogid });
    res.status(200).json({
      likeCount,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
