import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useUser() {
	const [user, setUser] = useState();
	const router = useRouter();
	useEffect(() => {
		fetch("/api/users/me")
			.then(response => response.json())
			.then(data => {
				if (!data.ok) {
					return router.replace("/enter");
				}
				setUser(data.profile);
			});
	}, [router]);
	return user;
}

/*
    with NextJS, you will do a lot of creating a sort of hooks that going to give data to your page
        when you are working with NextJS is better to think about your app as individual pages

    push vs replce of useRouter
        replace doesn't create a browser history, so it mekes the user cannot go back to the previous page
*/
