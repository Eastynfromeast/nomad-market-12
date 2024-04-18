import { NextApiRequest, NextApiResponse } from "next";
import Twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { MessageInstance } from "twilio/lib/rest/previewMessaging/v1/message";
import smtpTransport from "@libs/server/email";

const twilioClient = new (Twilio as any)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email } = req.body;
	const user = phone ? { phone } : email ? { email } : null;
	if (!user) return res.status(400).json({ ok: false });
	const payload = Math.floor(100000 + Math.random() * 900000) + "";
	const token = await client.token.create({
		data: {
			payload,
			user: {
				connectOrCreate: {
					where: {
						...user,
					},
					create: {
						name: "Anonymous",
						...user,
					},
				},
			},
		},
	});

	if (phone) {
		/* const message: MessageInstance = await twilioClient.messages.create({
			messagingServiceSid: process.env.TWILIO_MSID,
			from: process.env.TWILIO_PHONE,
			to: process.env.MY_PHONE!,
			body: `Hi, it's from Nomad Market! Your login token is ${payload}`,
		});
		console.log(message); */
	} else if (email) {
		/* const mailOptions = {
			from: process.env.MAIL_ID,
			to: email,
			subject: "Nomad Market Authentication Email",
			text: `Here is Nomad Market authentication Code : ${payload}`,
			html: `<h2>Hi! We are Nomad Market!</h2><p>Here is your authentication code :)<br/><strong>${payload}</strong> </p>`,
		};
		const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
			if (error) {
				console.log(error);
				return null;
			} else {
				console.log(responses);
				return null;
			}
		});
		smtpTransport.close();
		console.log(result); */
	}

	return res.json({
		ok: true,
	});
}

export default withHandler({ method: "POST", handler, isPrivate: false });
