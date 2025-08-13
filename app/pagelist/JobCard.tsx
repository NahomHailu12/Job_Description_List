"use client"
import Link from "next/link";
import {useState,useEffect} from "react";
import {signIn, useSession} from "next-auth/react";

interface prop{
    title: string,
    location: string,
    description: string
}

export default function JobCard({data,id,isbookedOnly}: {data: prop,id:string,isbookedOnly: boolean}) {

    const session = useSession()
    const [isbookmarked,setIsbookmarked] = useState<boolean>(false)
    const [error,setError] = useState<string|null>(null)


    const handlebookmark  = async ()=>{
        const accessToken = session.data.user.data.accessToken
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
        try{
            const response = await fetch(" https://akil-backend.onrender.com/bookmarks",{
                headers:header
            })

            if (!response.ok) {
                setError("Server Error Please Refresh")
            }else {
                    const resData = (await response.json()).data
                    setIsbookmarked(resData.some(event => event.eventID === id))
            }
        }catch (e) {
            setError("Server Error Please Refresh")
        }}
    useEffect(()=>{
        handlebookmark();
        },[isbookedOnly])


    const onClickHandler = async () =>{

        const apiMethod = isbookmarked ? "DELETE" : 'POST'
        const accessToken = session.data.user.data.accessToken

        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
        try{
            const response = await fetch(`https://akil-backend.onrender.com/bookmarks/${id}`,{
                method: apiMethod, 
                headers:header,
                body: JSON.stringify(null)
            })

            if (!response.ok) {
                throw new Error(`Server Error Please Refresh, Do you like to reload?`)
            }else {
                setIsbookmarked(!isbookmarked)
                setError(null)
                    }
        }catch (e) {
            if(window.confirm(e.message)){
                window.location.reload()
            }else
                setError("please reload!!!")
        }
    }

    if(isbookedOnly && (!isbookmarked)){
        return (<></>)
    }

    return(

        <div className="bg-violet-400 border-2 border-gray-200 shadow-md rounded-2xl p-12 md:w-250 w-150 m-12 ">
            {error && <p className="m-2 text-red-500 text-2xl">{error}</p>}
            <Link href={`/dashboard/description/${id}`} >
                <div className="flex justify-start gap-1.5">
                    <img src="../favicon.ico" className="w-12"/>
                    <div className="ml-2">
                    <span className = "font-bold text-xl">{data.title}</span>
                    <p className="text-sm mt-2">Young Men Christian Association {data.location}</p>
                </div>
            </div>
            <div className="ml-16 mt-8 text-sm pb-4  h-28">
                <p className="font-bold">{data.description}</p>
            </div>
            </Link>
            <hr className="border-gray-300" />
            <div className="flex pt-4 justify-evenly ml-16 font-bold">
                <button className="border font-extrabold rounded-full px-4 py-2 text-sm text-violet-800 border-red-500"
                        onClick={onClickHandler}>{isbookmarked ? "unBookmark" : "Bookmark Now!"} </button>
                <div className="border rounded-full px-4 py-2 text-sm text-red-800 border-red-500">In-Person</div>
                <div className="border rounded-full px-4 py-2 text-sm text-red-800 border-red-500">Education</div>
                <div className="border rounded-full px-4 py-2 text-sm min-w-24 text-red-800 border-red-500">IT</div>
            </div>
        </div>

    )

}