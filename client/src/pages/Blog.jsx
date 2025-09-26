import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import CommentList from "@/components/CommentList";
import RelatedBlog from "@/components/RelatedBlog";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LikeCount from "@/components/ui/LikeCount";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { decode } from "entities";
import moment from "moment";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { blog, category } = useParams();
  const { data, isLoading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },
    [blog, category]
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-between gap-20 ">
      {data && data.blog && (
        <>
          <div className="border rounded w-[70%] p-5">
            <h1 className="text-2xl font-bold mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>

                <div>
                  <p className="font-bold">{data.blog.author.name}</p>
                  <p>
                    Date: {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex justify-between items-center gap-5">
                <LikeCount blogid={data.blog._id} />
                <CommentCount blogid={data.blog._id} />
              </div>
            </div>

            <div className="my-5">
              <img className="rounded" src={data.blog.featuredImage} />
            </div>

            <p>{decode(data.blog.blogContent)}</p>

            <div className="border-t mt-5 pt-5">
              <Comment blogid={data.blog._id} />
            </div>
          </div>
        </>
      )}
      <div className="border rounded w-[30%]">
        <RelatedBlog category={category} currentBlog={blog} />
      </div>
    </div>
  );
};

export default Blog;
