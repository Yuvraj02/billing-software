import { useEffect, useRef, type SetStateAction } from "react"

interface DropProp{
    children : React.ReactNode
    buttonText : string
    setTrigger : React.Dispatch<SetStateAction<boolean>>
    trigger : boolean
}

function DropDownMenu(prop:DropProp){

    const dropDownRef = useRef<HTMLDivElement>(null)
    // const [buttonTitle, setTitle] = useState<string>(prop.buttonText)

    // const handleOnItemClick = (itemTitle)=>{
    //     setTitle(itemTitle)
    // }

    useEffect(()=>{

        const handleClickOutside = (event:MouseEvent) =>{

            //Condition 1: if the element is rendered in DOM dropDownRef.current does that checking go to second condition
            //Condition 2: if the clicked even is not the current ref, then go to logic inside if statement
            //event.target is the DOM that was clicked so basically we are checking if the part clicked is not inside our referenced DOM
            //---> (event.target as Node) means the (type) of target on which we are checking is of type Node
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                prop.setTrigger(false)
            }
        }

        document.addEventListener('mousedown',handleClickOutside)

        //Now remove the listener when component unmounts
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }

    }
        ,[prop.setTrigger])

return (<div className="absolute" ref={dropDownRef}>
        <div onClick={()=>prop.setTrigger(!prop.trigger)} className="p-2 bg-neutral-900 hover:bg-neutral-800 border rounded">{prop.buttonText}</div>
        <div className={`bg-neutral-900 max-h-50 overflow-y-auto ${prop.trigger ? "visible" : "invisible h-0"}`}>{prop.children}</div>
 </div>
    )   
}

export default DropDownMenu