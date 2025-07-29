"use client"
import Link from "next/link";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {useEffect, useState} from "react";

interface formdata {
    code1: string,
    code2: string,
    code3: string,
    code4: string,
}


export default function OtpVerfiy({params}: {params: Promise<{ email: string }>}){

    const counts = [1,2,3,4]
    const form = useForm()
    const {register,handleSubmit}  = form
    const [Error, setError] = useState<string | null>(null)
    const [counter,setcounter] = useState(30)
    
    
    const submitform = async (data: formdata) =>{
        
        const otp: string = data.code1 + data.code2 + data.code3 + data.code4
        const {email} = await params
        const reqBody = {
            email: email,
            otp: otp
        }

        try{
            const response  = await fetch('/api/otp',{
                method: "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(reqBody)
            })

            if (!response.ok){
                setError("Incorrect otp")
            }
            else {
                window.confirm("successfully Registered")
                signIn()
            }
        }catch{
                setError("Server Error!!Try again")
        }

    }

    useEffect(()=>{
        if(counter > 0) {
            const timer = setTimeout(() => {
                setcounter((prev) => prev - 1)
            }, 1000)
        }
    },[counter])

    return (<div className="mx-80 my-32 w-120 p-8 border border-gray-200 shadow-gray rounded-2xl">
        <h1 className="font-extrabold text-3xl mb-2 ml-8 text-gray-800">Verify Email</h1>
            {Error && <h2 className="font-extrabold text-xl mb-2 ml-8 text-text-800">{Error}</h2>}
            <hr className="mx-4 border border-gray-200"/>
            <p className="my-6 font-medium text-gray-900">
        We have send Verification code to email address you have provided. To complete the verfication process. Please enter the code here.
        </p>
        <form className="ml-8 my-12 w-full pr-16 font-bold" onSubmit={handleSubmit(submitform)}>
            <div className="my-4 flex gap-3 justify-evenly">
                {counts.map(
                    (count)=> (
                        <input
                            className="border shadow-gray-700 border-gray-400 my-2 text-2xl text-center p-2 max-w-1/4 p-2 h-16 rounded-lg focus:border-violet-600 "
                            placeholder="0"
                            {...register(`code${count}`)}
                            maxLength={1}
                            minLength={1}
                            key = {count}
                        />
                    )
                )}
            </div>
            <p className="">
                 You can request to
                {
                    counter <= 0?
                        <Link href='' className="mx-2 text-violet-600 font-bold">Resent code</Link>:
                        <span className="mx-1 text-violet-400 font-bold">Resend code </span>
                }
                <span className="mx-2 text-violet-600 font-bold">in 00:{counter>9?counter:`0${counter}`}</span>
            </p>
            <input
                className="block border shadow-3xl shadow-violet-700 border-gray-400 my-6 py-2 h-auto rounded-full w-full bg-violet-900 text-white text-center"
                type="submit" value="Continue"/>
        </form>

    </div>
    );

}