"use client";

import { PrimaryButton } from "@/components/button/primarybutton";
import { CheckFeature } from "@/components/checkfeature";
import { Appbar } from "@/components/appbar";
import { Input } from "@/components/input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="flex pt-8 max-w-4xl">
                    <div className="flex-1 pt-20 px-4">
                        <div className="font-semibold text-3xl pb-4">
                            Join millions worldwide who automate their work using zapier
                        </div>
                        <div className="pb-6 pt-4">
                            <CheckFeature label={"Easy setup, no coding required"} />
                        </div>
                        <div className="pb-6 pt-4">
                            <CheckFeature label={"Free forever, for core features"} />
                        </div>
                        <div className="pb-6 pt-4">
                        <CheckFeature label={"14-day trial of premium features & apps"} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                    <Input
                        label={"EMAIL"}
                        onchange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
                    <Input
                        label={"PASSWORD"}
                        onchange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <div className="pt-4">
                        <PrimaryButton onClick={handleLogin} size="big">
                            LOG IN
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}