"use client"
import "@/app/globals.css"
import ListJob from "@/app/pagelist/ListJob";
import {store} from "@/app/redux/store";
import {Provider} from "react-redux";
import {signIn, useSession} from "next-auth/react";

export default function Pagelist(){


    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })
    

    if (status == "authenticated")
        return(
            <Provider store={store}>
                <div className="m-16 font-montserrat">
                    <div className="flex justify-between mt-8">
                        <div>
                            <h1 className="font-bold text-2xl">Opportunies</h1>
                        </div>
                        <div className="text-gray-600 font-bold">
                            <label htmlFor="sort">Sort by:</label>
                            <select id="sort" >
                                <option className="bg-gray-200" value="relevant">Most Relevant</option>
                            </select>
                        </div>

                    </div>
                    <hr className="border-gray-300 mt-8"/>
                    <ListJob>

                    </ListJob>
                </div>
            </Provider>
        )
    else{
        <div>loading</div>
    }

}