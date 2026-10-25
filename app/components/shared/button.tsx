import { buttonClasses } from "@/app/constants/button-classes"

export default function Button({text, type, onClick, isLoading, icon}:{
    text:string,
    type: string
    onClick?:()=>void,
    isLoading?: boolean,
    icon?:React.ReactNode
}){
    const classButton=buttonClasses.filter(el=>el.type===type)[0].class
    return(
        <button onClick={onClick} className={`${classButton} ${isLoading??`disabled`}`}>
            {text}
        </button>
    )
}