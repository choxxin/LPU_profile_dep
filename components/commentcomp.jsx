import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import CommentInput from "./chatting/CommentInput";
import Comments from "./chatting/Comments";
import MessageContainer from "./chatting/Message_con";
import { AiFillMessage } from "react-icons/ai";
export default function Commentcomp({ postId }) {
  return (
    <>
      <Drawer className="text-white">
        <DrawerTrigger>
          <button className="btn bg-slate-700 rounded-3xl text-white text-3xl hover:text-slate-800">
            <AiFillMessage />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <Comments postId={postId} />
            <CommentInput postId={postId} />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
