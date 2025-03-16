"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { User } from "next-auth";
export function UserData({ userData }: { userData?: User; }) {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userData &&
        <div>
          <p>Your name: {userData?.name}</p>
          <p>Your email: {userData?.email}</p>
        </div>
      }
    </div>
  );
}
