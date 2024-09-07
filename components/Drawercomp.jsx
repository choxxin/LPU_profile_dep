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
import MessageContainer from "./chatting/Message_con";
import { AiFillMessage } from "react-icons/ai";
export default function Drawercomp() {
  return (
    <>
      <Drawer classname="w-80 min-h-96">
        <DrawerTrigger>
          <button className="btn bg-slate-700 rounded-3xl text-white text-3xl hover:text-slate-800">
            <AiFillMessage />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <MessageContainer />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      ;
    </>
  );
}
