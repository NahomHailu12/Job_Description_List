"use client"
import '@/app/globals.css'
import {store} from "@/app/redux/store";
import {Provider} from "react-redux"
import Pagelist from "@/app/pagelist/page";

export default function Home() {
  return (

    <Provider store={store} >

        <Pagelist />
    </Provider>
  );
}
