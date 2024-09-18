"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./button/linkbutton";
import { PrimaryButton } from "./button/primarybutton";

export const Appbar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex flex-col justify-center text-3xl font-extrabold">
        <span>
          <span className="text-orange-600">_</span>
          <span className="text-black">zapier</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        <LinkButton onClick={() => router.push("/login")}>Login</LinkButton>
        <PrimaryButton onClick={() => router.push("/signup")}>
          Signup
        </PrimaryButton>
      </div>
    </div>
  );
};
