import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { phone, email } = req.body;
	const payload = phone ? { phone: +phone } : { email };
	const user = await client.user.upsert({
		where: {
			...payload,
		},
		create: {
			name: "Anonymous",
			...payload,
		},
		update: {},
	});
	console.log(user);
	/* if (email) {
		user = await client.user.findUnique({
			where: {
				email,
			},
		});
		if (user) {
			console.log("Found it");
		}
		if (!user) {
			console.log("Did not find. Will create.");
			user = await client.user.create({
				data: {
					name: "Anonymous",
					email,
				},
			});
		}
		console.log(user);
	}
	if (phone) {
		user = await client.user.findUnique({
			where: {
				phone: +phone,
			},
		});
		if (user) {
			console.log("Found it");
		}
		if (!user) {
			console.log("Did not find. Will create.");
			user = await client.user.create({
				data: {
					name: "Anonymous",
					phone: +phone,
				},
			});
		}
		console.log(user);
	} */
	return res.status(200).end();
}

export default withHandler("POST", handler);

/*
	phone # --> User
	--> Token--User #123213123
	--> #123213123 --> SMS --> phone # (Twilio)
	--> #123213123 --> Token?--User ---> Log the user In

	authentication 
		we need to know who the user is
	authorization 
		if the user is allowed to see what they want to see

*/
