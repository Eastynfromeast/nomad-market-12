import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
	const { data, error } = useSWR("/api/users/me");
	const router = useRouter();
	useEffect(() => {
		if (data && !data.ok) {
			router.replace("/enter");
		}
	}, [data, router]);
	return { user: data?.profile, isLoading: !data && !error };
}

/*
    with NextJS, you will do a lot of creating a sort of hooks that going to give data to your page
        when you are working with NextJS is better to think about your app as individual pages

    push vs replce of useRouter
        replace doesn't create a browser history, so it mekes the user cannot go back to the previous page

    SWR
        stale-while-revalidate
        useSWR("/api/users/me", fetcher);
            url also is an id of the request
        super_cache = {
            "/api/users/me": {
                "ok": true,
                "profile": {
                    "id": 4,
                    "name": "Anonymous",
                    "phone": "1231234",
                    "email": null,
                    "avatar": null,
                    "createdAt": "2024-04-16T00:55:42.974Z",
                    "updatedAt": "2024-04-16T00:55:42.974Z"
                }
            }
        }
*/
