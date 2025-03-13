import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
    return Response.json({ message: 'Hello World' })
}
export async function POST(request: Request) {
    const wallet = ethers.Wallet.createRandom();
    console.log({ wallet });
    return NextResponse.redirect(`http://localhost:3000/wallet/${wallet.address}`);
}

