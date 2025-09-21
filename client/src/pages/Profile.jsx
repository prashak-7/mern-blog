import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { setUser } from "@/redux/user/user.slice";

import userAvatar from "../../src/assets/images/user.png";
import { useFetch } from "@/hooks/useFetch";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Dropzone from "react-dropzone";

const Profile = () => {
  const [avatarPreview, setAvatarPreview] = useState();
  const [file, setFile] = useState();

  const user = useSelector((state) => state.user);
  const {
    data: userData,
    isLoading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    bio: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .optional()
      .or(z.literal("")),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      showToast("success", data.message);
      dispatch(setUser(data.user));
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleAvatarUpload = (files) => {
    const file = files[0];
    setFile(file);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  };

  console.log(user.user.avatar);

  if (isLoading) return <Spinner />;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-1">
          <Dropzone
            onDrop={(acceptedFiles) => handleAvatarUpload(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative cursor-pointer">
                  <AvatarImage
                    src={
                      avatarPreview
                        ? avatarPreview
                        : user?.user.avatar || userAvatar
                    }
                  />
                  <div className="group hover:bg-black/10 absolute w-full h-full  flex justify-center items-center">
                    <FiUpload
                      className="opacity-0 group-hover:opacity-60"
                      size={30}
                    />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your bio" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full" type="submit">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Profile;
