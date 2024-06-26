import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id },
		session: { user },
	} = req;

	const alreadyExists = await client.fav.findFirst({
		where: {
			productId: +id.toString(),
			userId: user?.id,
		},
	});
	if (alreadyExists) {
		// delete -> need unique thing such as an id
		await client.fav.delete({
			where: {
				id: alreadyExists.id,
			},
		});
	} else {
		await client.fav.create({
			data: {
				user: {
					connect: {
						id: user?.id,
					},
				},
				product: {
					connect: {
						id: +id.toString(),
					},
				},
			},
		});
	}

	res.json({
		ok: true,
	});
}

export default withApiSession(
	withHandler({
		methods: ["POST"],
		handler,
	})
);

/*
    1. create the model 
    2. make a space to be able to write the handler
        fav.ts / [id] directory
*/
