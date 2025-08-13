"use client"
import "@/app/globals.css"
import ListJob from "@/app/pagelist/ListJob";
import {store} from "@/app/redux/store";
import {Provider} from "react-redux";
import {signIn, useSession} from "next-auth/react";
import {useState} from "react";
import Link from "next/link";

export default function Pagelist(){


    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })
    const [searchParam,setSearchParam]  = useState<string>("")
    const submitHandler = (e) =>{
        e.preventDefault()
        const formdata = new FormData(e.target)
        setSearchParam(formdata.get("search"))
    }

    const [isbookmark,setIsbookmark] = useState<boolean>(false);

    if (status == "authenticated")
        return(
            <Provider store={store}>
                <div className="m-16 font-montserrat">
                    <div className="flex justify-between mt-8">
                        <div>
                            <h1 className={`inline font-bold mx-4 text-violet-${!isbookmark?800:400} text-2xl`}
                                onClick={()=>{setIsbookmark(false)}}>
                                    Opportunies</h1>
                            <h1 className={`inline font-bold mx-4 text-violet-${isbookmark?800:400} text-2xl`}
                                onClick={()=>{setIsbookmark(true)}}>
                                    bookmarks</h1>
                        </div>
                        <div className="text-gray-600 flex font-bold">
                            <div className="mx-8">
                                <form onSubmit = {submitHandler}>
                                <input name="search" placeholder="search by title"
                                       className="border border-gray-300 rounded-full w-150 h-8 pl-4 mx-8"/>
                                </form>
                            </div>
                            <span>
                                <label htmlFor="sort">Sort by:</label>
                                <select id="sort" >
                                    <option className="bg-gray-200" value="relevant">Most Relevant</option>
                                </select>
                            </span>
                        </div>

                    </div>
                    <hr className="border-gray-300 mt-8"/>
                    <ListJob searchParam = {searchParam} isbookmarked = {isbookmark} />
                </div>
            </Provider>
        )
    else{
        <div>loading</div>
    }

}