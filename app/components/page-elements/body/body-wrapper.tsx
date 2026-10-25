"use client"

import { FormEvent, useState } from "react"
import TagsInput from "../../shared/tag-input";
import TextInput from "../../shared/text-input";
import Select from "../../shared/select";
import Button from "../../shared/button";
import { languages } from "@/app/constants/languages";
import { humour_styles } from "@/app/constants/humour-genres";
import axios, { AxiosError } from "axios";
import Loader from "../../shared/loader";
import { models } from "@/app/constants/models";

export default function Body(){
    const [heroes, setHeroes]=useState<string[]>([]);
    const [place, setPlace]=useState<string>('')
    const [language, setLanguage]=useState<string>(languages[0])
    const [humour, setHumour]=useState<string>(humour_styles[0])
    const [model, setModel]=useState<string>(models[0]);
    const [load, setLoad]=useState<boolean>(false)
    const [message, setMessage]=useState<string>()

    const resetForm=()=>{
        setHeroes([])
        setPlace('')
        setLanguage(languages[0])
        setHumour(humour_styles[0])
        setModel(models[0])
        setMessage('')
    }

    const submitForm=async (e: FormEvent)=>{
        e.preventDefault()

        try{
            setMessage('');
            setLoad(true)
            const resp=await axios.post('/api/generate',{
                heroes,
                place,
                language,
                humour,
                model
            });
            const data=resp.data
            console.log(data);

            setMessage(data.message)
        }
        catch(exc){
            console.error((exc as AxiosError).message)
            setMessage(`🚨🚨🚨 ${(exc as AxiosError).message}`)
        }
        finally{
            setLoad(false)
        }
    }

    return (
        <main className="flex justify-center mx-auto p-8 flex-col max-w-xl">
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 sm:gap-2">
                    <div className="flex flex-col gap-4">
                        <Select name={"Style of Humour"} options={humour_styles} value={humour} onChange={setHumour}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Select name={"Language"} options={languages} value={language} onChange={setLanguage}/>
                    </div>
                    <div className="min-sm:col-span-2">
                        <TagsInput tags={heroes} setTags={setHeroes} placeholder={"Add heroes (maximum 10)"} maxTags={10}/>
                    </div>
                    <div className="min-sm:col-span-2">
                        <TextInput name={"Place of Story"} value={place} onChange={setPlace}/>
                    </div>
                    <div className="min-sm:col-span-2">
                        <Select name={"Model"} options={models} value={model} onChange={setModel}/>
                    </div>
                </div>
                <div className="flex justify-center py-6">
                    <Button type="action" text={"Generate"} isLoading={load}></Button>
                </div>
            </form>
            {
                load&&(
                    <Loader/>
                )
            }
            {
                message&&(
                    <div className="flex justify-center flex-col py-4">
                        <Button type="link" text={"Reset"} onClick={resetForm}></Button>
                        <p className="text-md text-black dark:text-white py-3">{message}</p>
                    </div>
                )
            }
        </main>
    )
}