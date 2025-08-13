"use client"
import JobCard from "@/app/pagelist/JobCard";
import {useGetJobsQuery} from "@/app/api/jobList/apiConfigration";
import {useState} from "react";

export default function ListJob ({searchParam="",isbookmarked}:{searchParam: string,isbookmarked: boolean}) {
    const [search, setSearch] = useState<string>(searchParam);
    const {data,isLoading, error} = useGetJobsQuery();
    if (error){
        return (
            <div className="m-32 text-red-500 text-4xl ">
                Sorry we are having Server Problem
            </div>
        );
    }

    if(isLoading){
        return <div className="m-32 text-red-500 text-4xl ">Loading ....</div>
    }

    const job_posting = data.data

    return(
        <div className="">
            <p>{search}</p>
            {
                job_posting.filter((job) => job.title.toLowerCase()
                        .includes(searchParam.toLowerCase())).map(
                            (job, index) =>
                                (<JobCard key={index} data={{
                                    title: job.title,
                                    location: job.location,
                                    description: job.description
                                }} id={job.id} isbookedOnly={isbookmarked}/>)
                )
            }
        </div>);
}