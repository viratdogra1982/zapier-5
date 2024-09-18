
export const ZapCell = ({
    name,
    index,
    onClick
}: {
    name?: string; 
    index: number;
    onClick: () => void;
}) => {
    return <div onClick={onClick} className="border border-black py-8 px-8 flex w-[300px] justify-center cursor-pointer">
        <div className="flex text-xl">
            <div className="font-bold">
                {index}. 
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
}



// In the ZapCell component:

// name represents the name of the trigger.
// index is the numerical index or identifier for the item.
// Here's a breakdown of your component:

// name: This is an optional prop that will display the name of the trigger.
// index: This is a required prop representing the numerical index of the trigger.
// onClick: This is a callback function that will be executed when the ZapCell is clicked.
// The ZapCell is styled to have a border, padding, and a flex layout that centers its content. It also uses a cursor-pointer class to indicate that it's clickable.