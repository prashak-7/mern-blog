import BlogCard from "@/components/BlogCard";
import Spinner from "@/components/Spinner";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

const Index = () => {
  const {
    data: blogData,
    isLoading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/blogs`, {
    method: "get",
    credentials: "include",
  });

  if (isLoading) return <Spinner />;
  return (
    <div className="grid grid-cols-3 gap-10">
      {blogData && blogData.blogs.length > 0 ? (
        <>
          {blogData.blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </>
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
};

export default Index;
