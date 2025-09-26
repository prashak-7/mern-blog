import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const LikeCount = ({ blogid }) => {
  const user = useSelector((state) => state.user);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const {
    data: blogLikeCount,
    isLoading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${blogid}?userid=${
      user && user.isLoggedIn ? user.user._id : ""
    }`,
    {
      method: "get",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likeCount);
      setHasLiked(blogLikeCount.hasUserLiked);
    }
  }, [blogLikeCount]);

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn)
        return showToast("error", "Please login to like the post");

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ userid: user.user._id, blogid }),
        }
      );

      if (!response.ok) return showToast("error", response.statusText);
      const responseData = await response.json();
      setLikeCount(responseData.likeCount);
      setHasLiked(!hasLiked);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex justify-between items-center cursor-pointer gap-1"
    >
      {!hasLiked ? <FaRegHeart /> : <FaHeart fill="red" />}
      {likeCount}
    </button>
  );
};

export default LikeCount;
