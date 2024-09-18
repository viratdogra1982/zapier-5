"use client"
import { PrimaryButton } from "@/components/button/primarybutton"
import { CheckFeature } from "@/components/checkfeature"
import { Appbar } from "@/components/appbar"
import { Input } from "@/components/input"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"

export default function (){
    const router=useRouter();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    return <div>
    <Appbar/>
    <div className="flex justify-center">
    <div className="flex pt-8 max-w-4xl">
    <div className="flex-1 pt-20 px-4">
    <div className="font-semibold text-3xl pb-4">
    Joins million worldwide who automate their work using zapier
    </div>
    <div className="pb-6 pt-4">
        <CheckFeature label={"Easy setup,no coding required"}></CheckFeature>
        </div>
        <div className="pb-6 pt-4">
        <CheckFeature label={"Free forever,for core features"}></CheckFeature>
       </div>
       <div className="pb-6 pt-4">
        <CheckFeature label={"14 day-trial of premium features & apps"}></CheckFeature>
        </div>
    </div>
</div>
<div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
    <Input label={"NAME"} onchange={e=>{
     setName(e.target.value);
    }} type="text" placeholder="Name"></Input>
    <Input label={"EMAIL"} onchange={e=>{
     setEmail(e.target.value);
    }} type="text" placeholder="Email"></Input>
    <Input label={"PASSWORD"} onchange={e=>{
     setPassword(e.target.value);
    }}type="password" placeholder="password"></Input>
    <div className="pt-4">
        <PrimaryButton onClick={async()=>{
         const res= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
          email,
          password,
          name
         },{
            headers:{
                 'Content-Type': 'application/json'
            }
         })
         
         router.push("/login")
        }}size="big">GET STARTED FREE</PrimaryButton>
    </div>
    </div>
    </div>
    </div>
    
}