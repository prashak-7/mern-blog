import React from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Spinner from "./Spinner";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const {
    data: blogData,
    isLoading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/search?query=${query}`,
    {
      method: "get",
      credentials: "include",
    },
    [query]
  );

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center gap-3 text-2xl font-bold border-b pb-3 mb-5">
        <h4>Search Result For: {query}</h4>
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

export default SearchResult;
