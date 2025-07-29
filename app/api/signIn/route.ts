import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function POST(req: Request) {

    const data = await req.json()
    const fetcheddata = await fetch('https://akil-backend.onrender.com/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (fetcheddata.status !== 200) {
        return NextResponse.json({error: 'An error occurred'},{status: 401})
    }

    const response = await fetcheddata.json();

    const user = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role
    }
    return NextResponse.json(user);
}