import cookie from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		// Destory cookie
		res.setHeader('Set-Cookie', cookie.serialize('token', ''), {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: new Date(0), // 1 month
			sameSite: 'strict',
			path: '/'
		});
		// Response
		res.status(200).json({ message: '登出成功，下次再見～' });
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
