import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserList from "../userList";

export function DialogUser({ setSelectedUser, selectedUser }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Select User</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <UserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </DialogContent>
    </Dialog>
  );
}
