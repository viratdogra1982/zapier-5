"use client";

import { BACKEND_URL } from "@/app/config";
import { Appbar } from "@/components/appbar";
import { Input } from "@/components/input";
import { ZapCell } from "@/components/zapcell";
import { PrimaryButton } from "@/components/button/primarybutton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//This custom hook fetches available triggers and actions from the backend. 
//It uses axios to make HTTP GET requests to specific endpoints (/api/v1/trigger/available and /api/v1/action/available), 
//then stores the results in the state variables availableActions and availableTriggers using React's useState and useEffect.
function useAvailableActionsAndTriggers() {
    const [availableAction, setAvailableAction] = useState([]);
    const [availableTrigger, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTrigger))

        axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(x => setAvailableAction(x.data.availableAction))
    }, [])

    return {
        availableAction,
        availableTrigger
    }
}

export default function() {
    const router = useRouter();
    const { availableAction, availableTrigger } = useAvailableActionsAndTriggers(); //useAvailableActionsAndTriggers(): This hook (which you defined earlier) 
                                                                                      //is called to fetch and return the available actions and triggers from the backend. 
                                                                                      //The availableActions and availableTriggers variables now contain the lists of actions and triggers 


    const [selectedTrigger, setSelectedTrigger] = useState<{ //selectedTrigger: This state variable holds the currently selected trigger.
                                                             //It's an object with two properties: id (the unique identifier of the trigger) and name (the name of the trigger). 
                                                             //Initially, this is undefined because no trigger is selected yet. 
        id: string;
        name: string;
    }>();
                                                             //setSelectedTrigger: This function is used to update the selectedTrigger state. 
                                                             //When a user selects a trigger, this function will be called to store the selected trigger's details

    const [selectedActions, setSelectedActions] = useState<{ //selectedActions: This state variable is an array of objects, where each object represents a selected action.
                                                             //setSelectedActions: This function is used to update the selectedActions state. When a user adds or modifies an action, this function updates the corresponding entry in the array.
        index: number; //index: The position of the action in the list.
        availableActionId: string; //availableActionId: The unique identifier of the selected action.
        availableActionName: string; //availableActionName: The name of the selected action.
        metadata: any; //metadata: Any additional data or configuration needed for the action.
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null); //selectedModalIndex: This state variable, as explained earlier, 
                                                                                       //is used to keep track of which modal (if any) is currently open. 
                                                                                       //It can either be null (meaning no modal is open) or a number representing the index of the modal that is open.

    return <div>
        <Appbar />
        <div className="flex justify-end bg-slate-200 p-4">
            <PrimaryButton onClick={async () => {//PrimaryButton: This is a button component that, when clicked, triggers the onClick function to publish the zap.

                if (!selectedTrigger?.id) {//Before attempting to publish the zap, the function checks whether a trigger has been selected. 
                                           //If no trigger is selected (selectedTrigger?.id is undefined or null), the function exits early, 
                                           //preventing the rest of the code from executing.
                    return;
                }

                const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, { //axios.post: This makes a POST request to the backend at the endpoint ${BACKEND_URL}/api/v1/zap. 
                                                                                 //The request is designed to create a new zap based on the selected trigger and actions.

                    "availableTriggerId": selectedTrigger.id,//availableTriggerId: This is the ID of the selected trigger.
                    "triggerMetadata": {}, //Currently, this is an empty object ({}), but it could be used to send additional information about the trigger.

                    "actions": selectedActions.map(a => ({//actions: This is an array of action objects. Each action object includes
                        availableActionId: a.availableActionId,//availableActionId: The ID of the selected action.
                        actionMetadata: a.metadata//Any metadata associated with that action (currently stored in the metadata field of the selectedActions state).
                    }))
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token") // The Authorization header includes a token retrieved from localStorage. 
                                                                     // This token likely represents the user's session or authentication credentials.
                    }
                })
                
                router.push("/dashboard"); //After successfully creating the zap (assuming no errors occur), the user is redirected to the /dashboard page.

            }}>Publish</PrimaryButton>
        </div>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center"> 
            <div className="flex justify-center w-full">
                <ZapCell onClick={() => { //Trigger ZapCell: A ZapCell component is rendered here, which represents the selected trigger. 
                                          //If a trigger has been selected, its name is displayed; otherwise, it shows "Trigger".

                    setSelectedModalIndex(1);//setSelectedModalIndex(1): Opens the modal for selecting a trigger by setting selectedModalIndex to 1
                }} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} />
            </div>


            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div className="pt-2 flex justify-center"> <ZapCell onClick={() => { //Action ZapCells: Each selected action is displayed as a ZapCell. 
                                                                                                                             //If an action has been selected, its name is shown; otherwise, "Action" is displayed.

                    setSelectedModalIndex(action.index); //setSelectedModalIndex(action.index): Opens the modal for editing the selected action by setting selectedModalIndex to the action's index
                }} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <PrimaryButton onClick={() => { //Add Button PrimaryButton: A button is provided to add a new action to the workflow
                                                    //On Click: When clicked, it adds a new action to the selectedActions state with a new index and empty properties.
                        setSelectedActions(a => [...a, {
                            index: a.length + 2,
                            availableActionId: "",
                            availableActionName: "",
                            metadata: {}
                        }])
                    }}><div className="text-2xl">
                        +
                    </div></PrimaryButton>
                </div>
            </div>
        </div>
       
        {selectedModalIndex && <Modal availableItems={selectedModalIndex === 1 ? availableTrigger : availableAction} onSelect={(props: null | { name: string; id: string; metadata: any; }) => {
         //The modal is rendered only if selectedModalIndex is set (i.e., not null).
         //The modal is populated with either triggers or actions based on the value of selectedModalIndex.
            if (props === null) {
                setSelectedModalIndex(null);
                return; //If null is selected: Closes the modal without making any changes.
            }
            if (selectedModalIndex === 1) {
                setSelectedTrigger({
                    id: props.id,
                    name: props.name
                }) //f a trigger is selected: Updates the selectedTrigger state.
            } else {
                setSelectedActions(a => {
                    let newActions = [...a];
                    newActions[selectedModalIndex - 2] = {
                        index: selectedModalIndex,
                        availableActionId: props.id,
                        availableActionName: props.name,
                        metadata: props.metadata
                    }
                    return newActions//If an action is selected: Updates the corresponding action in the selectedActions array.
                })
            }
            setSelectedModalIndex(null);
        }} index={selectedModalIndex} />}
    </div>
}

//Purpose of the Modal Component:
//It helps the user choose a trigger or an action for their automation workflow.
//If the action selected requires additional configuration (like sending an email or transferring cryptocurrency), the modal will display a form for the user to fill out additional details.
function Modal({ index, onSelect, availableItems=[] }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: {id: string, name: string, image: string;}[] }) {

    const [step, setStep] = useState(0); //When step is 0, the modal shows the list of available triggers or actions for the user to choose from.
    const [selectedAction, setSelectedAction] = useState<{ //If the user selects an action that requires further configuration, the modal moves to step 1, where it shows a configuration form.
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

    return <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <div className="text-xl">
                        Select {index === 1 ? "Trigger" : "Action"}
                    </div>
                    <button onClick={() => {

                        onSelect(null);//The onSelect function is a callback that the modal uses to send data back to the parent component.
                                       //When the user selects a trigger or action, onSelect is called with the selected item's details (like its id, name, and any metadata).
                                       //If the action requires configuration, the modal waits until the user completes the configuration and then calls onSelect with the final data.

                    }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    {step === 1 && selectedAction?.id === "email" && <EmailSelector setMetadata={(metadata) => {
                        onSelect({
                            ...selectedAction,
                            metadata
                        })
                    }} />}

                    {(step === 1 && selectedAction?.id === "solana") && <SolanaSelector setMetadata={(metadata) => {
                        onSelect({
                            ...selectedAction,
                            metadata
                        })
                    }} />}

                    {step === 0 && <div>{availableItems.map(({id, name, image}) => {
                            return <div onClick={() => {
                                if (isTrigger) {
                                    onSelect({
                                        id,
                                        name,
                                        metadata: {}
                                    })
                                } else {
                                    setStep(s => s + 1);
                                    setSelectedAction({
                                        id,
                                        name
                                    })
                                }
                            }} className="flex border p-4 cursor-pointer hover:bg-slate-100">
                                <img src={image} width={30} className="rounded-full" /> <div className="flex flex-col justify-center"> {name} </div>
                            </div>
                        })}</div>}                    
                </div>
            </div>
        </div>
    </div>

}

function EmailSelector({setMetadata}: { //This component is shown when the user selects an action related to sending an email.
    setMetadata: (params: any) => void;
}) {
    //Email: The recipient's email address.
    //Body: The content of the email.
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return <div>
        <Input label={"To"} type={"text"} placeholder="To" onchange={(e) => setEmail(e.target.value)}></Input>
        <Input label={"Body"} type={"text"} placeholder="Body" onchange={(e) => setBody(e.target.value)}></Input>
        <div className="pt-2">
            <PrimaryButton onClick={() => {
                setMetadata({
                    email,
                    body
                })
            }}>Submit</PrimaryButton>
        </div>
    </div>
}
//Once the user fills in these details and clicks "Submit,"
//the setMetadata function is called with the email and body data, which is then passed back to the Modal component.

function SolanaSelector({setMetadata}: { //This component is shown when the user selects an action related to transferring cryptocurrency on the Solana blockchain.

    setMetadata: (params: any) => void;
}) {
    //Address: The recipient's wallet address.
    //Amount: The amount of cryptocurrency to send.
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");    

    return <div>
        <Input label={"To"} type={"text"} placeholder="To" onchange={(e) => setAddress(e.target.value)} />
        <Input label={"Amount"} type={"text"} placeholder="Amount" onchange={(e) => setAmount(e.target.value)} />

        <div className="pt-4">
        <PrimaryButton onClick={() => {
            setMetadata({
                amount,
                address
            })
        }}>Submit</PrimaryButton>
        
        </div>
    </div>
    //Once the user fills in these details and clicks "Submit," 
    //the setMetadata function is called with the amount and address data, which is then passed back to the Modal component.
}


//Step 0:

// The user opens the modal and sees a list of available triggers or actions.
// The user selects one.
// Step 1 (if necessary):

// If the selected action requires configuration, the modal advances to step 1.
// The relevant form (either EmailSelector or SolanaSelector) is shown.
// The user fills in the details and submits.
// Completion:

// After submission, the Modal component passes all the collected data back to the parent component through onSelect, and the modal closes.