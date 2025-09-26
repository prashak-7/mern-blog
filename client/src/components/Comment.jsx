import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Button } from "@/components/ui/button";
import { FaRegComments } from "react-icons/fa";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import { useState } from "react";
import CommentList from "./CommentList";

const Comment = ({ blogid }) => {
  const user = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState();

  const formSchema = z.object({
    comment: z.string().min(1, "Oops! You forgot to enter your comment"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        blogid: blogid,
        user: user.user._id,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/add`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      setNewComment(data.comment);
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <h3 className="flex items-center gap-2 text-2xl mb-2 font-bold">
        <FaRegComments /> Comment
      </h3>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Type your comment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Add Comment</Button>
          </form>
        </Form>
      ) : (
        <Button>
          <Link to={RouteSignIn}>Sign in to comment</Link>
        </Button>
      )}

      <div className="mt-5">
        <CommentList blogid={blogid} newComment={newComment} />
      </div>
    </div>
  );
};

export default Comment;
