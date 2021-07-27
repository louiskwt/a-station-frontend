import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// State
	const [user, setUser] = useState({ type: 'guest', membership: 'Free' });
	const [message, setMessage] = useState(null);
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');

	// Presisting user with ussEffect
	useEffect(() => checkUserLoggedIn(), []);

	// Router
	const router = useRouter();

	// Register user
	const register = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			setStatus('success');
			setMessage('註冊成功！歡迎來到A-station～');
			setTimeout(() => {
				router.push('/');
				setStatus(null);
				setMessage(null);
				setLoading(false);
			}, 2000);
		} else {
			setStatus('fail');
			setLoading(false);
			setMessage(data.message);
			setMessage(null);
			setStatus(null);
		}
	};

	// Login user
	const login = async ({ email: identifier, password }) => {
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier,
				password
			})
		});
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			setStatus('success');
			setMessage('歡迎回來～');
			setMessage(null);
			setTimeout(() => {
				router.push('/');
				setStatus(null);
				setLoading(false);
			}, 1000);
		} else {
			setStatus('failed');
			setMessage(data.message);
			setMessage(null);
			setLoading(false);
			setStatus(null);
		}
	};

	// Logout user
	const logout = async () => {
		const res = await fetch(`${NEXT_URL}/api/logout`, {
			method: 'POST'
		});

		// const data = await res.json();

		if (res.ok) {
			setStatus('success');
			setMessage('登出成功');
			setMessage(null);
			setTimeout(() => {
				router.push('/');
				setUser({ type: 'guest', membership: 'Free' });
				setStatus(null);
			}, 200);
		}
	};

	// Check if user is logged in (presisting user)
	const checkUserLoggedIn = async () => {
		const res = await fetch(`${NEXT_URL}/api/user`);
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setUser({ type: 'guest', membership: 'Free' });
		}
		if (text) {
			setText('');
		}
	};

	// Authenticate membership type
	const checkMembership = async (user) => {
		if (user.membership !== 'VIP' || user.membership !== 'VIP Plus') {
			setText('只限VIP會員');
			router.push('/404');
		}
	};

	// Forgot password
	const forgotPassword = async (email) => {
		const res = await fetch(`${NEXT_URL}/api/forgotpassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});
		const data = await res.json();

		if (res.ok) {
			setStatus('success');
			setMessage(data.message);
			setMessage(null);
			setLoading(false);
			setStatus(null);
		} else {
			setStatus('failed');
			setMessage(data.message);
			setMessage(null);
			setLoading(false);
			setStatus(null);
		}
	};

	// Reset password
	const resetPassword = async (code, password) => {
		const res = await fetch(`${NEXT_URL}/api/resetpassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code, password })
		});

		const data = await res.json();

		if (res.ok) {
			setStatus('success');
			setMessage(data.message);
			setMessage(null);
			setLoading(false);
			setTimeout(() => {
				router.push('/login');
				setStatus(null);
			}, 500);
		} else {
			setStatus('failed');
			setMessage(data.message);
			setMessage(null);
			setLoading(false);
			setStatus(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				message,
				register,
				login,
				logout,
				status,
				loading,
				setLoading,
				checkMembership,
				text,
				setText,
				forgotPassword,
				resetPassword
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
