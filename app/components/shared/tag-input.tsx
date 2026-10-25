'use client';

import { useState, KeyboardEvent } from 'react';

export default function TagsInput({tags,setTags,placeholder,maxTags}:{
    tags:string[],
    setTags:((tags:string[])=>void),
    placeholder:string,
    maxTags: 10
}){
    const [value, setValue]=useState<string>('')
    const [warnMessage, setWarnMessage]=useState<string>();

    const addTag=()=>{
        const trimmedValue=value.trim();

        if(!trimmedValue) return;

        if(tags.includes(trimmedValue)){
            setValue('');
            return;
        }

        if(tags.length>=maxTags){
            setWarnMessage('The count of heroes should be lower than 10');
            return;
        }

        setTags([...tags,trimmedValue]);
        setValue('')
    }

    const removeTag=(tagToRemove:string)=>{
        setTags(tags.filter(el=>el!==tagToRemove))
    }

    const handleKeyDown=(e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
        if (e.key === 'Backspace' && !value && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    }

    return(
        <div className="w-full max-w-lg">
            <span className="text-md font-medium pb-1 text-black dark:text-white">Heroes of story</span>
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border-2 border-black dark:border-white transition-colors bg-transparent min-h-[52px]">
                {
                    tags.map((tag)=>(
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-300 text-black rounded-full text-sm font-medium"
                        >
                            {tag}
                            <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            >
                            ✕
                            </button>
                        </span>
                    ))
                }
                <input
                    type="text"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[120px] outline-none bg-transparent text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-200"
                />
            </div>
            {
                warnMessage??(
                    <p className="text-red-400 text-xs">{warnMessage}</p>
                )
            }
        </div>
    )
}