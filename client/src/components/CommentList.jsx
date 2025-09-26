import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { Avatar, AvatarImage } from "./ui/avatar";

import userIcon from "../assets/images/user.png";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentList = ({ blogid, newComment }) => {
  const user = useSelector((state) => state.user);
  const { data, isLoading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get/${blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h4 className="text-2xl font-bold">
        {newComment ? (
          <>{data && data.comments.length + 1}</>
        ) : (
          <>{data && data.comments.length}</>
        )}{" "}
        comments
      </h4>
      <div className="mt-5">
        {newComment && (
          <div className="flex gap-3 my-3 ">
            <Avatar>
              <AvatarImage src={user?.user.avatar || userIcon} />
            </Avatar>

            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="font-bold">{user?.user.name}</p>
                <p>{moment(newComment?.createdAt).format("DD-MM-YYYY ")}</p>
              </div>
              <p className="block">{newComment?.comment}</p>
            </div>
          </div>
        )}

        {data &&
          data.comments.length > 0 &&
          data.comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 my-3 ">
              <Avatar>
                <AvatarImage src={comment?.user?.avatar || userIcon} />
              </Avatar>

              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="font-bold">{comment?.user?.name}</p>
                  <p>{moment(comment?.createdAt).format("DD-MM-YYYY ")}</p>
                </div>
                <p className="block">{comment?.comment}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
