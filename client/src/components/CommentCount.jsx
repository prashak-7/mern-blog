import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaRegComment } from "react-icons/fa";

const CommentCount = ({ blogid }) => {
  const { data, isLoading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <div>
      <button type="button" className="flex justify-between items-center gap-1">
        <FaRegComment />
        {data && data.commentCount}
      </button>
    </div>
  );
};

export default CommentCount;
