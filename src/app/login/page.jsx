"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const firebaseConfig = {
  apiKey: "AIzaSyDgATghWKJjhHVmb2PgC5Fiw8idwBr5Vio",
  authDomain: "my-notes-629ef.firebaseapp.com",
  projectId: "my-notes-629ef",
  storageBucket: "my-notes-629ef.firebasestorage.app",
  messagingSenderId: "577213785104",
  appId: "1:577213785104:web:96eb5a67ecbdb419f95695",
  measurementId: "G-C50DT52CGN"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDataToFireStore(email, password) {
  try {
    console.log("Adding document to Firestore:", { email, password });
    const docRef = await addDoc(collection(db, "users"), {
      email: email.trim(),
      password: password.trim(),
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e.code, e.message);
    return false;
  }
}

 export default function  LoginFormComponent({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with email:", email, "password:", password);
    const result = await addDataToFireStore(email, password);
    if (result) {
      setEmail("");
      setPassword("");
      alert("Login successful!");
      router.push("/Pages/dashboard"); 
    } else {
      alert("Error adding data. Check console for details.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 items-center h-screen", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>

              <Button type="submit" className="w-full bg-gray-800 text-white  border" variant="default">
                Login 
              </Button>
              </div>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

