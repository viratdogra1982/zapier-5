import { Appbar } from "@/components/appbar";
import { Hero } from "@/components/hero";
import { HeroVideo } from "@/components/herovideo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pb-6">
     <Appbar/>
     <Hero/>
     <div className="pt-8">
     <HeroVideo/>
     </div>
     <div className="flex justify-between border-t pt-8">
      <div className="text-2xl font-serif pl-4  py-4">Made By - Virat Dogra</div>
      <div className="text-2xl font-serif pr-4  py-4">All Right Reserved</div>
     </div>
    </main>
  );
}
