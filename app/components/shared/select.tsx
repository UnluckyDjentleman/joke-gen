"use client"
export default function Select({name, options, value, onChange}:{
    name: string
    options: string[],
    value: string,
    onChange: (text: string)=>void
}){
    return(
        <div className="w-full max-w-lg">
            <p className="text-md font-medium pb-1 text-black dark:text-white">{name}</p>
            <select onChange={(e)=>onChange(e.target.value)} className="p-3 w-full focus:border-yellow-300 rounded-xl bg-transparent text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-200 border-2 border-black dark:border-white [&>*]:dark:bg-black [&>*]:dark:text-white">
                {
                    options.map((el,i)=>(
                        <option
                        key={i}
                        value={el}
                        className="border-1 border-yellow-300">
                            {el}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}