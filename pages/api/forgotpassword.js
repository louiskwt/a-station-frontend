import { API_URL } from '@/config/index';

export default async (req, res) => {
	if (req.method === 'POST') {
		const { email } = req.body;
		const strapiRes = await fetch(`${API_URL}/auth/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email
			})
		});
		const data = await strapiRes.json();

		if (strapiRes.ok) {
			// Set cookie
			res.status(200).json({
				message: '重設密碼的連結已發送到你的郵箱，請查看'
			});
		} else {
			if (data.statusCode === 400) {
				res.status(data.statusCode).json({
					message: '抱歉～找不到你的電郵'
				});
			}
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
