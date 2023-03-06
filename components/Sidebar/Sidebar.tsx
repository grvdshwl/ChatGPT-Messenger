"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import NewChat from "../NewChat/NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "../ChatRow/ChatRow";
import ModelSelection from "../ModelSelection/ModelSelection";

const Sidebar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        {/* New Chat */}
        <NewChat />

        <div className="hidden sm:inline">
          <ModelSelection />
        </div>

        {loading && (
          <div className="animate-pulse text-center text-white">
            <p>Loading Chats...</p>
          </div>
        )}
        {/* Map through the chat rows */}
        {chats?.docs.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} />
        ))}
      </div>

      {session && (
        <img
          onClick={signOut}
          src={
            session.user?.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile picture"
          width={200}
          height={200}
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      )}
    </div>
  );
};

export default Sidebar;
