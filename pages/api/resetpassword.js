import { API_URL } from '@/config/index';

export default async (req, res) => {
	if (req.method === 'POST') {
		const { code, password } = req.body;
		const strapiRes = await fetch(`${API_URL}/auth/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				password,
				passwordConfirmation: password
			})
		});
		const data = await strapiRes.json();

		if (strapiRes.ok) {
			// Set cookie
			res.status(200).json({
				message: '密碼重設成功，請使用新密碼登入'
			});
		} else {
			if (data.statusCode === 400) {
				res.status(data.statusCode).json({
					message: '抱歉～暫時無法重設，請重試'
				});
			}
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
