"use client"
export default function TextInput({name, value, onChange}:{
    name: string
    value: string,
    onChange:(text:string)=>void
}){
    return(
        <div className="w-full max-w-lg">
            <p className="text-md font-medium pb-1 text-black dark:text-white">{name}</p>
            <input
                type={"text"}
                value={value}
                onChange={e=>onChange(e.target.value)}
                placeholder={"Place"}
                className="p-3 rounded-xl w-full bg-transparent text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-200 border-2 border-black dark:border-white focus:border-yellow-300"
            />
        </div>
    )
}