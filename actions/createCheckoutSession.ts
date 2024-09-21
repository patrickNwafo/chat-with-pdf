"use server";

import { UserDetails } from "@/app/dashboard/upgrade/page";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebaseAdmin";

export async function createCheckoutSession(userDetails: UserDetails) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User is not found");
    }

    // first check if user already has a stripeCustomerId
    let stripeCustomerId;

    const user = await adminDb.collection("users").doc(userId).get();
    stripeCustomerId = user.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
        // create a new stripe customer
    }
}
