import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

import { Avatar, AvatarImage } from "./ui/avatar";
import { FaRegCalendarAlt } from "react-icons/fa";

import userAvatar from "../assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ blog }) => {
  return (
    <Link to={RouteBlogDetails(blog.category.slug, blog.slug)}>
      <Card className="pt-5">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <Avatar>
                <AvatarImage src={blog.author.avatar || userAvatar} />
              </Avatar>
              <span>{blog.author.name}</span>
            </div>
            {blog.author.role === "admin" && (
              <Badge variant="outline" className="bg-violet-500">
                Admin
              </Badge>
            )}
          </div>

          <div className="my-2">
            <img src={blog.featuredImage} className="rounded" />
          </div>

          <div>
            <p className="flex items-center gap-2 mb-2">
              <FaRegCalendarAlt />
              <span>{moment(blog.createdAt).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="text-2xl fond-bold line-clamp-2">{blog.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
