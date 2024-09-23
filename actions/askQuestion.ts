"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebaseAdmin";
import { Message } from "@/components/Chat";
import { generateLangchainComletion } from "@/lib/langchain";
// import { generateLangchainComletion } from "@/lib/langchain";

const FREE_LIMIT = 4;
const PRO_LIMIT = 20;

export async function askQuestion(id: string, question: string) {
    auth().protect();
    const { userId } = await auth();

    const chatRef = adminDb
        .collection("users")
        .doc(userId!)
        .collection("files")
        .doc(id)
        .collection("chat");

    // check how many user massages are in the chat
    const chatSnapshot = await chatRef.get();
    const userMessages = chatSnapshot.docs.filter(
        (doc) => doc.data().role === "human"
    );

    // Check membership limits for messages in a document
    const userRef = await adminDb.collection("users").doc(userId!).get();

    // limit the pro/free users

    // check if the user is on a free plan and has a asked more than 5 questions
    if (!userRef.data()?.hasActiveMembership) {
        if (userMessages.length >= FREE_LIMIT) {
            return {
                success: false,
                message: `You'll need to upgrade to PRO to ask more than ${FREE_LIMIT} questions!`,
            };
        }
    }

    // check if the user is on PRO plan and has asked more than 100 questions

    if (userRef.data()?.hasActiveMembership) {
        if (userMessages.length >= PRO_LIMIT) {
            return {
                success: false,
                message: `You've reached the PRO limit of the ${PRO_LIMIT} question per document!`,
            };
        }
    }

    const userMessage: Message = {
        role: "human",
        message: question,
        createdAt: new Date(),
    };

    await chatRef.add(userMessage);

    // Generate AI Response
    const reply = await generateLangchainComletion(id, question);

    const aiMessage: Message = {
        role: "ai",
        message: reply,
        createdAt: new Date(),
    };

    await chatRef.add(aiMessage);

    return { success: true, message: null };
}
