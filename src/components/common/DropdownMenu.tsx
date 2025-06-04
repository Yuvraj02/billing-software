import { useEffect, useRef, type SetStateAction } from "react"

interface DropProp{
    children : React.ReactNode
    buttonText : string
    setTrigger : React.Dispatch<SetStateAction<boolean>>
    trigger : boolean
    className?:string
}

function DropDownMenu({className, children, buttonText, setTrigger, trigger }:DropProp){

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
                setTrigger(false)
            }
        }

        document.addEventListener('mousedown',handleClickOutside)

        //Now remove the listener when component unmounts
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }

    }
        ,[setTrigger])

return (<div className="absolute w-full" ref={dropDownRef}>
        <div onClick={()=>setTrigger(!trigger)} className={className}>{buttonText}</div>
        <div className={` bg-neutral-900 max-h-50 overflow-y-auto ${trigger ? "visible" : "invisible h-0"}`}>{children}</div>
 </div>
    )   
}

export default DropDownMenu