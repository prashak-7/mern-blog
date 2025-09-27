import React from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteBlog,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import CategoryDetails from "./pages/category/CategoryDetails";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import BlogDetails from "./pages/blog/BlogDetails";
import Blog from "./pages/Blog";
import BlogByCategory from "./pages/blog/BlogByCategory";
import SearchResult from "./components/SearchResult";
import Comments from "./pages/Comments";
import Users from "./pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />

          {/* Category */}
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* Blog */}
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteAddBlog} element={<AddBlog />} />
          <Route path={RouteEditBlog()} element={<EditBlog />} />
          <Route path={RouteBlogDetails()} element={<Blog />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />

          {/* Search */}
          <Route path={RouteSearch()} element={<SearchResult />} />

          {/* Comment */}
          <Route path={RouteCommentDetails} element={<Comments />} />

          {/* User */}
          <Route path={RouteUser} element={<Users />} />
        </Route>

        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
