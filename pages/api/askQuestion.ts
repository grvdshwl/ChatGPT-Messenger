import { adminDb } from "@/firebaseAdmin";
import { queryChatGPT } from "@/utils/queriApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

type Data = { answer: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt" });
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a chatId" });
  }

  const response = await queryChatGPT(prompt, chatId, model);

  const message: Message = {
    text: response || "Chat GPT is unable to find an answer for that.",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);
  res.status(200).json({ answer: message.text });
}
