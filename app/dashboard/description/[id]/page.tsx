import {headers} from "next/headers";

export default async function description({params}:{params:Promise<{id: string}>}){

    const {id} = await params;
    const header = await headers()
    const host = header.get('host')

    const fetched = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`)

    if(!fetched.ok){
        return (<div className={"text-3xl m-32 font-bold text-red-300"}>Server Error Soory for Inconvience</div>)

    }
    const message = await fetched.json();
    const data= message.data

    const abouts: string[] = ["datePosted","deadline","startDate","endDate"]
    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2 flex flex-col align-top m-4 justify-evenly bg-orange-200">
                <div className="p-4">
                    <h2   className="font-bold text-red-900 text-2xl" >Description</h2>
                    <p className="mt-4 mx-4 font-bold">{data.description}</p>
                </div>
                <div className="p-4">
                    <h2 className="font-bold  text-red-900 text-2xl">Responsibilties</h2>
                    <p className="mt-4 mx-4 font-bold">{data.responsibilities}</p>
                </div>
                <div className="p-4">
                <h2 className="font-bold text-red-900 text-2xl">Ideal Candidate we want</h2>
                    <p className="mt-4 mx-4 font-bold">{data.idealCandidate}</p>
                </div>
                <div>
                    <h2 className="font-bold  text-red-900 text-2xl">When and Where</h2>
                    <p className="font-bold text-sm">{data.whenAndWhere}</p>
                </div>
            </div>
            <div className="col-span-1 flex flex-col my-8 uppercase">
                <div>
                    <h2   className="font-bold">About</h2>
                    {
                        abouts.map(
                            (topic,index)=>{
                                if (index<5){
                                    return (
                                        <div className="flex my-6 space-x-2 ">
                                            <img src={`/Icons/img${index+1}.png`} alt="Icon"
                                                 className="w-10 h-10 rounded-full object-cover"/>
                                            <div>
                                                <span className="text-xs font-bold text-red-700">{topic}</span>
                                                <span className="block font-bold">{data[topic].substring(0, 10)}</span>
                                            </div>
                                        </div>

                                    )
                                }
                            }
                        )
                    }
                </div>
                <div>
                    <h2   className="font-bold ">Categories</h2>
                    <div className="flex flex-wrap my-6">
                        {
                            data.categories.map((item, index) => (
                                <span key={index}
                                      className="border font-bold rounded-full px-4 py-2 mx-2 text-sm text-red-800 border-gray-200">
                                    {item}
                                </span>))
                        }
                    </div>
                    <div>
                        <h2   className="font-bold">Required Skills</h2>
                        <div className="flex flex-wrap my-6">
                            {
                                data.requiredSkills.map((item, index) => (
                                    <span key={index}
                                          className="border font-bold rounded-full px-4 py-2 m-2 text-sm text-red-800 border-gray-200">
                                    {item}
                                </span>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}