import {job_postings} from "@/server/serverdata.ts";
import JobCard from "@/app/pagelist/JobCard";

export default function ListJob (){
    return(
        <div className="">
            {
                job_postings.map(
                    (job,index) =>
                        (<JobCard key = {index} data = {{
                            title: job.title,
                            location: job.about.location,
                            description: job.description
                        }} id={index} />)
                )
            }
    </div>);
}