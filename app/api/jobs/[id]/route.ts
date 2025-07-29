import { NextResponse } from "next/server";

export async function GET(_req: Request,{ params }: { params: { id: string } }) {
    const { id } =  params;

    try {
        const fetched = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`);
        const data = await fetched.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching data" },
            { status: 500 }
        );
    }
}
