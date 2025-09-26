import BlogCard from "@/components/BlogCard";
import Spinner from "@/components/Spinner";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useParams } from "react-router-dom";

const BlogByCategory = () => {
  const { category } = useParams();
  const {
    data: blogData,
    isLoading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "get",
      credentials: "include",
    },
    [category]
  );

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex items-center gap-3 text-2xl font-bold border-b pb-3 mb-5">
        <BiCategory />
        <h4>{blogData && blogData.categoryData?.name}</h4>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {blogData && blogData.blog.length > 0 ? (
          <>
            {blogData.blog.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </>
        ) : (
          <div>Data Not Found</div>
        )}
      </div>
    </>
  );
};

export default BlogByCategory;
