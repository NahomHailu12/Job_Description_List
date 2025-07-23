import {job_postings} from "@/server/serverdata.ts";

export default async function description({params}:{params:Promise<{id: string}>}){

    const {id} = await params;
    const data = job_postings[parseInt(id)];
    const abouts: string[] = ["posted_on","deadline","location","start_date","end_date"]
    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2 flex flex-col align-top m-4 justify-evenly bg-orange-200">
                <div className="p-4">
                    <h2   className="font-bold text-red-900 text-2xl" >Description</h2>
                    <p className="mt-4 mx-4 font-bold">{data.description}</p>
                </div>
                <div className="p-4">
                    <h2   className="font-bold  text-red-900 text-2xl" >Responsibilties</h2>
                    <ul>
                        {data.responsibilities.map((item, key) => {
                            return (
                                <li className="my-4" key={key}>
                                    <img src={`/Icons/check.png`} className="w-6 h-6 mx-4 inline" alt="Icon" />
                                    <span className="text-sm font-bold">{item}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="p-4">
                    <h2   className="font-bold text-red-900 text-2xl">Ideal Candidate we want</h2>
                    <ul>
                        {data.ideal_candidate.traits.map((item, key) => {
                            return (
                                <li className="my-4" key={key+1}>
                                    <img src={`/Icons/check.png`} className="w-6 h-6 mx-4 inline" alt="Icon" />
                                    <span className="text-sm font-bold">{item}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2   className="font-bold  text-red-900 text-2xl">When and Where</h2>
                    <p className="font-bold text-sm">{data.when_where}</p>
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
                                                <span className="block font-bold">{data.about[topic]}</span>
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
                            data.about.categories.map((item, index) => (
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
                                data.about.required_skills.map((item, index) => (
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