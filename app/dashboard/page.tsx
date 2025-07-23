import '@/app/globals.css'
import {redirect} from "next/navigation";

export default function Dashboard() {
    redirect("/pagelist/")
    return (
        <></>
    );
}
