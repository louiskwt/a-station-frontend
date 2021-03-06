import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		const { identifier, password } = req.body;
		const strapiRes = await fetch(`${API_URL}/auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier,
				password
			})
		});
		const data = await strapiRes.json();

		if (strapiRes.ok) {
			// Set cookie
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 60 * 60 * 24 * 1, // 1 day
					sameSite: 'strict',
					path: '/' // asscessible everywhere
				})
			);

			// console.log(data.jwt);

			res.status(200).json({ user: data.user });
		} else {
			if (data.statusCode === 400) {
				res.status(data.statusCode).json({
					message: '電郵或密碼不正確'
				});
			}
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
