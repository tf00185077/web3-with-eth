"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/Auth/LoginForm";
import { SignupForm } from "@/components/Auth/SignupForm";

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">登入 / 註冊</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>帳號</DialogTitle>
          <DialogDescription>
            登入或創建新帳號以繼續
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">登入</TabsTrigger>
            <TabsTrigger value="register">註冊</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm onSuccess={() => setOpen(false)} />
            <div className="mt-4 text-center text-sm">
              還沒有帳號？
              <Button
                variant="link"
                className="p-0 ml-1"
                onClick={() => setActiveTab("register")}
              >
                立即註冊
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register">
            <SignupForm onSuccess={() => setOpen(false)} />
            <div className="mt-4 text-center text-sm">
              已有帳號？
              <Button
                variant="link"
                className="p-0 ml-1"
                onClick={() => setActiveTab("login")}
              >
                立即登入
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
