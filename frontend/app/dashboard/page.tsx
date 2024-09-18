"use client"
import { Appbar } from "@/components/appbar";
import { DarkButton } from "@/components/button/darkbutton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "@/components/button/linkbutton";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export default function zapsPage() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg	 w-full">
                <div className="flex justify-between pr-8 ">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>Create</DarkButton>
                </div>
            </div>
        </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    return <div className="p-8 max-w-screen-lg w-full">
        <div className="flex">
                <div className="flex-1">Name</div>
                <div className="flex-1">ID</div>
                <div className="flex-1">Created at</div>
                <div className="flex-1">Webhook URL</div>
                <div className="flex-1">Go</div>
        </div>
        {zaps.map(z => <div className="flex border-b border-t py-4">
            <div className="flex-1 flex"><img src={z.trigger.type.image} className="w-[30px] h-[30px]" /> {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)}</div>
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">Nov 13, 2023</div>
            <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
            <div className="flex-1"><LinkButton onClick={() => {
                    router.push("/zap/" + z.id)
                }}>Go</LinkButton></div>
        </div>)}
    </div>
}















// useZaps Hook:

// This hook is responsible for fetching the zaps data from the backend.
// It uses the useEffect hook to make an API call to ${BACKEND_URL}/api/v1/zap when the component mounts.
// The Authorization header includes a token retrieved from localStorage.
// Once the data is fetched, it updates the zaps state and sets loading to false.
// Default Export Function:

// This function is the main component of the page.
// It uses the useZaps hook to get the loading state and zaps data.
// The Appbar component is rendered at the top.
// A button (DarkButton) is provided to navigate to the /zap/create page for creating a new zap.
// The ZapTable component is conditionally rendered based on the loading state. If loading is true, it shows "Loading...". Otherwise, it renders the ZapTable with the fetched zaps.
// ZapTable Component:

// This component is responsible for displaying the zaps in a table-like format.
// It maps over the zaps array and displays each zap's details.
// It includes:
// The name of the zap (with images of the trigger and actions).
// The ID of the zap.
// The webhook URL, constructed using HOOKS_URL and the zap's ID.
// Here's a summary of how these components work together:

// useZaps: Fetches the zap data and provides it to the main component.
// Main Component: Displays the app bar, a button to create a new zap, and either a loading message or the ZapTable based on the loading state.
// ZapTable: Renders the list of zaps, including images and IDs, and constructs the webhook URL for each zap.