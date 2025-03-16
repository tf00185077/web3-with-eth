"use server";
import { auth } from "@/lib/utils";
import { Wallet } from "@prisma/client";
const createWallet = async () => {
  const session = await auth.auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/create-wallet`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create wallet");
    }
    const data = await response.json();
    return {
      success: true,
      message: "Wallet created successfully",
      data
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create wallet");
  }
};
const getWalletList = async (userId: string): Promise<Wallet[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/get-wallet-list/${userId}`);
    const data = await response.json();
    return data.wallets;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get wallet list");
  }
};
export { createWallet, getWalletList };
