import { adminDb } from "@/firebaseAdmin";
import { queryChatGPT } from "@/utils/queriApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import openai from "@/utils/chatGpt";

type Option = { value: string; label: string };

type Data = { modelOptions: Option[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  const models = await openai.listModels().then((res) => res.data.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));
  res.status(200).json({
    modelOptions: modelOptions,
  });
}
