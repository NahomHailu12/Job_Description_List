"use client"
import Link from "next/link";
import { useForm } from 'react-hook-form';
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";

interface formdata{
    email: string;
    password: string;
}

export default function SignIn(){
    const form = useForm<formdata>({
        mode: "onBlur"
    });
    const {register, handleSubmit,formState} = form;
    const {isValid,errors} = formState
    const [Error,setError] = useState<String | null>(null)
    const route = useRouter()

    async function formSubmitHandler(data: formdata){
        console.log(data)
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (response?.error) {
                setError("Invalid Email or password");

            }else{
                route.push('/')
            }
        }
        catch(err) {
            console.log("eroor",err)
        }
    }

    return (
        <div className="mx-100 my-32 w-100 p-8 border border-gray-200 shadow-gray rounded-2xl">
            <h1 className="font-extrabold text-3xl mb-2 ml-8 text-violet-800">Welcome Back,</h1>
            <hr className="mx-4 border border-gray-200"/>
            <button className="w-8/9 text-xl p-2 text-center font-extrabold my-4 rounded-lg h-12 mx-8 border border-gray-200"
                    onClick={async () => {
                        try {
                            const res = await signIn("google")
                        } catch {}
                    }} > Sign in Google</button>
                <p className={"text-center font-extrabold text-violet-800 text-2xl"}>Or</p>
            <hr className="mx-4 border border-gray-200" />
                <form className="ml-8 my-12 w-full pr-16 font-bold" noValidate
                      onSubmit={handleSubmit(formSubmitHandler)}>
                    {
                        (Error &&
                            <h2 className="font-extrabold text-xl mb-2 ml-8 text-red-800">
                                {Error}
                            </h2>
                        ) ||
                        (errors?.email &&
                            <h2 className="font-extrabold text-xl mb-2 ml-8 text-red-800">
                                {errors?.email.message}
                            </h2>
                        ) ||
                        (
                            errors?.password &&
                            <h2 className="font-extrabold text-xl mb-2 ml-8 text-red-800">
                                {errors?.password.message}
                            </h2>

                        )

                    }
                    <div className="my-4">
                        <label htmlFor="email" className="font-extrabold">Email address:</label>
                        <input
                            className="block border shadow-gray-700 border-gray-400 my-2 p-2 h-8 rounded-lg w-full focus:border-violet-600 "
                            type="email" id="email"
                            placeholder="Enter email adress"
                            {...register("email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="password" className="font-extrabold">Password: </label>
                        <input
                            {...register("password", {
                                minLength: {
                                    value: 8,
                                    message: "Invalid password"
                                }
                            })}
                            className="block border shadow-3xl shadow-violet-700 border-gray-400 my-2 p-2 h-8 rounded-lg w-full "
                            type="password" id="password" name="password" placeholder="Enter your password"/>
                    </div>
                    <input
                        className="block border shadow-3xl shadow-violet-700 border-gray-400 my-6 py-2 h-auto rounded-full w-full bg-violet-900 text-white text-center"
                        type="submit" value="Login" disabled={!isValid}/>
                </form>

                <p className="font-extrabold">
                    Don't have an account?
                    <Link href="/api/auth/signup" className="text-violet-600">Sign Up</Link>
                </p>
        </div>
);

}