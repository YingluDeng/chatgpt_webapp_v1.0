// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '@/lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from '@/firebaseAdmin';
import admin from "firebase-admin";
// import chat_logo from "../pic/ChatGPT_logo.png"

type Data = {
  respond: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, chatId, model, session } = req.body;

    if (!prompt) {
        res.status(400).json({ respond: "Please provide a prompt!" });
        return;
    }

    if (!chatId) {
        res.status(400).json({ respond: "Please provide a valid chat ID!" });
        return;
    }

    // chatgpt query
    const response = await query(prompt, chatId, model);

    const message: Message = {
        text: response || "ChatGPT was unable to answer that.",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz",
        },
    };

    await adminDb
        .collection('users')
        .doc(session?.user?.email)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message);

  res.status(200).json({ respond: message.text })
}