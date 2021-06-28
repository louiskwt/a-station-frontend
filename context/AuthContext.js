import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// State
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [status, setStatus] = useState(null);

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
			setMessage('註冊成功～');
			setTimeout(() => {
				router.push('/');
				setStatus(null);
				setMessage(null);
			}, 2000);
		} else {
			setStatus('failed');
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
			setTimeout(() => {
				router.push('/');
				setStatus(null);
				setMessage(null);
			}, 2000);
		} else {
			setStatus('failed');
			setMessage(data.message);
			setMessage(null);
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
			setUser(null);
			setStatus('success');
			setMessage('登出成功');
			setTimeout(() => {
				router.push('/');
				setStatus(null);
				setMessage(null);
			}, 2000);
		}
	};

	// Check if user is logged in (presisting user)
	const checkUserLoggedIn = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/user`);
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, message, register, login, logout, status }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
