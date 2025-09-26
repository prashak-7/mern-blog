import { getEnv } from "@/helpers/getEnv";
import { RouteBlogDetails } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link } from "react-router-dom";

const RelatedBlog = ({ category, currentBlog }) => {
  const { data, isLoading, error } = useFetch(
    `${getEnv(
      "VITE_API_BASE_URL"
    )}/blog/related-blogs/${category}/${currentBlog}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Related Blogs</h2>
      <div className="flex flex-col gap-4">
        {data && data.relatedBlog.length > 0 ? (
          data.relatedBlog.map((blog) => (
            <Link key={blog._id} to={RouteBlogDetails(category, blog.slug)}>
              <div className="flex items-center gap-2">
                <img
                  className="w-18 rounded h-18 object-cover"
                  src={blog.featuredImage}
                />
                <h4 className="line-clamp-2 font-semibold">{blog.title}</h4>
              </div>
            </Link>
          ))
        ) : (
          <div>No related blog found.</div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlog;
