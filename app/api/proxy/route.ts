import {NextResponse} from "next/server";

export async function GET(){

    try{
        const fetched = await fetch('https://akil-backend.onrender.com/opportunities/search/')
        const data = await fetched.json()
        return NextResponse.json(data)

    }catch(error){
        return NextResponse.json(
            {error: "error fetching data"},
            {status: 500}
        )

    }

}