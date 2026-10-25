import { AxiosError } from 'axios';
import { CohereClientV2 } from 'cohere-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request){

    const {heroes, language, place, humour, model}=await req.json();

    if(!model){
        return NextResponse.json({
            success: false,
            message: "Set a model"
        },{
            status: 400
        })
    }

    if(!heroes){
        return NextResponse.json({
            success: false,
            message: "Set at least one hero of the story"
        },{
            status: 400
        })
    }

    if(!place){
        return NextResponse.json({
            success: false,
            message:"Set a place of the story"
        },{
            status: 400
        })
    }

    if(!language){
        return NextResponse.json({
            success: false,
            message: "Set a language of the story"
        },{
            status:400
        })
    }

    if(!humour){
        return NextResponse.json({
            success: false,
            message: "I cannot generate a joke without its style"
        },{
            status: 400
        })
    }

    try{
        console.log(process.env.CO_API_KEY)
        const cohere=new CohereClientV2({
            token: process.env.CO_API_KEY
        });

        const response=await cohere.chat({
            model: model,
            messages:[
                {
                    role:"user",
                    content: `Tell me a 3-5 sentence ${humour} story about ${heroes.toString()}. The joke set in ${place}. The language of the story is ${language}. No descriptions, only dialogue or action. Punchline must be absurd or mocking. Style: like classic short Soviet jokes about Stierlitz or Lieutenant Rzhevsky.`
                }
            ]
        })

        return NextResponse.json({
            success: true,
            message: response.message.content?.filter(el=>el.type==='text').map(item=>item.text)
        },{
            status:200
        });
    }
    catch(e){
        console.error(e)
        const axiosError = e as AxiosError;
        const status = axiosError.status || 500;
        
        let message = 'Unknown error';
        if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
            const data = axiosError.response.data as Record<string, unknown>;
            if (data.message && typeof data.message === 'string') {
                message = data.message;
            }
        }
        
        return NextResponse.json({
            success: false,
            message
        }, {
            status
        });
    }
}