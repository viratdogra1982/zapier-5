"use client"

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./button/primarybutton";
import { SecondaryButton } from "./button/secondary button";
import { Feature } from "./feature";

export const Hero = () => {
  const router=useRouter();
  return (
    <div>
      <div className="flex justify-center">
        <div className="text-3xl font-semibold text-center pt-8 max-w-xl">
          Automate as fast as you can type
        </div>
      </div>
   
      <div className="flex justify-center">
        <div className="text-lg font-medium text-center pt-4 max-w-xl">
          AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
        </div>
      </div>
      <div className="flex justify-center">
      <div className="flex justify-center pt-6">
        <PrimaryButton onClick={() => {
          router.push("/signup")
        }} size="big">Get started free</PrimaryButton>
        <div className="pl-4">
        <SecondaryButton onClick={() => {}} size="big">Contact Sales</SecondaryButton>
        </div>
      </div>
    </div>
    <div className="flex justify-center pt-4">
      <Feature title={"Free forever"} subtitle={"for core features"}></Feature>
      <Feature title={"More apps"} subtitle={"then any other platforms"}></Feature>
      <Feature title={"Cutting edge"} subtitle={"AI features"}></Feature>
    </div>
    </div>
  );
}
