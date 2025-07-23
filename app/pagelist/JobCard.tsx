import Link from "next/link";

interface prop{
    title: string,
    location: string,
    description: string
}

export default function JobCard({data,id}: {data: prop,id:number}) {

    return(
        <Link href={`/dashboard/description/${id}`} >
        <div className="bg-orange-100 border-2 border-gray-200 shadow-md rounded-2xl p-12 md:w-250 w-150 m-12 h-80">
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

            <hr className="border-gray-300" />
            <div className="flex pt-4 justify-evenly ml-16 font-bold">
                <div className="border rounded-full px-4 py-2 text-sm text-red-800 border-red-500">In-Person</div>
                <div className="border rounded-full px-4 py-2 text-sm text-red-800 border-red-500">Education</div>
                <div className="border rounded-full px-4 py-2 text-sm min-w-24 text-red-800 border-red-500">IT</div>
            </div>
        </div>
        </Link>
    )

}