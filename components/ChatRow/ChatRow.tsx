import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};
const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [active, setActive] = useState(false);

  const { data: session } = useSession();

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));

    router.replace("/");
  };

  return (
    <div className="max-w-xs my-2">
      <Link
        href={`/chat/${id}`}
        className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 hidden line-clamp-3 truncate md:inline-flex ">
          {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
        <TrashIcon
          className="h-5 w-5 text-gray-700 hover:text-red-700"
          onClick={removeChat}
        />
      </Link>
    </div>
  );
};

export default ChatRow;
