import { ReactNode } from "react"


export const  DarkButton=({children,onClick,size="small"}:{
    children: ReactNode,
    onClick:()=>void
    size?: "big"|"small"
})=>{
return <div onClick={onClick} className={`bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-1 hover:scale-105`}>
   {children}
    </div>
}