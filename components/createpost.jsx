import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePostForm from "./newpost";

export const Createpost = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <IoIosAddCircle className="w-12 h-12 bg-red-600 text-white" />
          <p className="">Create </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <CreatePostForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
