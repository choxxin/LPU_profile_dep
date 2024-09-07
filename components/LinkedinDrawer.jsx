import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../components/ui/drawer";

import { FaAddressBook } from "react-icons/fa";
import SocialLinksForm from "./SocialLink";
export default function LinkedinDrawer({
  senderId,
  linkedin,
  instagram,
  github,
}) {
  return (
    <>
      <Drawer className="w-80 min-h-96">
        <DrawerTrigger>
          <button className="btn bg-slate-700 rounded-3xl text-white text-3xl hover:text-slate-800">
            <FaAddressBook />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <SocialLinksForm
              senderId={senderId}
              ininstagram={instagram}
              inlinkedin={linkedin}
              ingithub={github}
            />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
