import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteEditBlog,
  RouteEditCategory,
} from "@/helpers/RouteName";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Spinner from "@/components/Spinner";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import { useState } from "react";
import moment from "moment";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const {
    data: blogData,
    isLoading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/all-blogs`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted");
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <div>
      <Card>
        <CardContent>
          <Button>
            <Link to={RouteAddBlog}>Add Blog</Link>
          </Button>
        </CardContent>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blogs.length > 0 ? (
                blogData.blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.author.name}</TableCell>
                    <TableCell>{blog.category.name}</TableCell>
                    <TableCell className="max-w-22 truncate">
                      {blog.title}
                    </TableCell>
                    <TableCell className="max-w-22 truncate">
                      {blog.slug}
                    </TableCell>
                    <TableCell>
                      {moment(blog.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-black/80 hover:text-white"
                      >
                        <Link to={RouteEditBlog(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">
                    There are currently no blogs
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
