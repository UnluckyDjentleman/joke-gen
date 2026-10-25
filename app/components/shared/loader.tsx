import Image from "next/image"

export default function Loader(){
    return(
        <div className="flex justify-center items-center flex-col gap-1">
            <Image src={"https://www.kolobok.us/smiles/icq/biggrin.gif"} alt={"smile face"} width={50} height={50}></Image>
            <span className="text-black dark:text-white text-md">Generating...</span>
        </div>
    )
}