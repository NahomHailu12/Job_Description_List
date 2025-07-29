"use client"
import Link from "next/link"
import { useForm } from 'react-hook-form';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

interface formdata{
    name: string,
    email: string,
    password: string,
    conformPassword: string
}

export default function SignUp() {

    const [Error,setError] = useState<string | null>(null)
    const route = useRouter()

    const form = useForm<formdata>({
        mode: "onSubmit"
    });
    const {register, handleSubmit,formState,watch} = form;
    const {isValid,errors} = formState

    const formSubmitHandler = async (data: formdata) => {
        
        const dataresponse = {
            ...data,
            role: "client"
        }
        try{
            const response = await fetch('/api/signUp/', {
                method: "POST",
                body: JSON.stringify(dataresponse)
            })

            if (!response.ok)
                setError("Email is already registered")
            else
                route.push(`/api/auth/otp/${data.email}`)

        }catch{
                setError("server error try again")
        }

    }

    return (
    <div className="mx-80 my-32 w-130 p-8 border border-gray-200 shadow-gray rounded-2xl">
        <h1 className="font-extrabold text-3xl mb-2 ml-8 text-violet-800">Sign In Today!</h1>
        <button className="w-8/9 text-xl p-2 text-center font-extrabold my-4 rounded-lg mx-8 border border-gray-200" onClick={async ()=>{try{const res = await signIn("google")}catch{}}}>Sign Up with Google</button>
        {Error && <h1 className="font-extrabold text-xl mb-2 ml-8 text-red-800">{Error}</h1>}
        <hr className="m-4 border border-gray-200"/>
        <form className="ml-8 my-12 w-full pr-16 font-bold" noValidate onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="my-4">
                <label htmlFor="username" className="font-extrabold">Full Name:</label>
                <input
                    className="block border shadow-gray-700 border-gray-400 my-2 p-2 h-8 rounded-lg w-full focus:border-violet-600 "
                    type="text"
                    id="username"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Invalid userName"
                        }
                    })}
                    placeholder="Enter your full name"

                />
                {errors?.name && <p className={"font-bold text-red-300"}>{errors?.name.message}</p>}
            </div>

            <div className="my-4">
                <label htmlFor="email" className="font-extrabold">Email address:</label>
                <input
                    className="block border shadow-gray-700 border-gray-400 my-2 p-2 h-8 rounded-lg w-full focus:border-violet-600 "
                    type="email" id="email"
                    placeholder="Enter email adress"
                    {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email format'
                        }
                    })}

                />
                {errors?.email && <p className={"font-bold text-red-300"}>{errors?.email.message}</p>}
            </div>
            <div className="my-4">
                <label htmlFor="password" className="font-extrabold">Password: </label>
                <input
                    className="block border shadow-3xl shadow-violet-700 border-gray-400 my-2 p-2 h-8 rounded-lg w-full "
                    type="password"
                    id="password"
                    {...register("password", {
                        minLength: {
                            value: 8,
                            message: "password must be atleast 8 characters"
                        }
                    })}
                    placeholder="Enter your password"/>
                {errors?.password && <p className={"font-bold text-red-300"}>{errors?.password.message}</p>}
            </div>
            <div className="my-4">
                <label htmlFor="passwordconform" className="font-extrabold">Conform Password: </label>
                <input
                    className="block border shadow-3xl shadow-violet-700 border-gray-400 my-2 p-2 h-8 rounded-lg w-full "
                    type="password"
                    id="passwordconform"
                    {...register("conformPassword", {
                        minLength: {
                            value: 8,
                            message: "password must be atleast 8 characters"
                        },
                        validate: (value: string) => {
                            return value === watch('password') || "Passwords do not match"
                        }
                    })}
                    placeholder="Enter your password"/>
                {errors?.conformPassword && <p className={"font-bold text-red-300"}>{errors?.conformPassword.message}</p>}
            </div>
            <input
                className="block border shadow-3xl shadow-violet-700 border-gray-400 my-6 py-2 h-auto rounded-full w-full bg-violet-900 text-white text-center"
                type="submit" value="SignIn" />
        </form>
        <p className="text-gray-600 font-extrabold">
            Already have account
            <Link href="/" className="font-bold mx-1 text-violet-600">Login</Link>
        </p>
        <p className = "text-gray-600 font-medium my-4">
            By clicking continue you acknowledge you have read and accept out
            <Link href="/" className="font-bold mx-1 text-violet-600">Terms of service</Link> and
            <Link href="/" className="font-bold mx-1 text-violet-600">Privacy Policy</Link>
        </p>
    </div>);

}