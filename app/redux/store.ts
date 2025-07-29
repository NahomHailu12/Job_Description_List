import {configureStore} from "@reduxjs/toolkit";
import {jobApi} from "@/app/api/jobList/apiConfigration";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
        reducer: {
            [jobApi.reducerPath]: jobApi.reducer

        },
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware().concat(jobApi.middleware)

    });

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;