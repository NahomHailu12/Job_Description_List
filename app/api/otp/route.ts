import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

export default async function POST(req: Request) {

    const data = await req.json()

    const fetcheddata = await fetch('https://akil-backend.onrender.com/verify-email', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    if (!fetcheddata.ok) {
        return NextResponse.json({error: 'An error occurred'},{status: 401})
    }

    const response = await fetcheddata.json();

    return NextResponse.json(response.data);
}