import { IoIosLogIn } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import logoWhite from "../assets/images/logo-white.png";
import userAvatar from "../assets/images/user.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { removeUser } from "@/redux/user/user.slice";
const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-15 bg-white gap-4 px-5 border-b">
      <div>
        <img src={logoWhite} />
      </div>
      <div className="w-[450px]">
        <SearchBox />
      </div>
      <div>
        {user.isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || userAvatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p>{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <FaRegUser />
                <Link>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaPlus />
                <Link>Create Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <IoLogOutOutline className="text-red-500" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="rounded-full">
            <IoIosLogIn />
            <Link to={RouteSignIn}>Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
