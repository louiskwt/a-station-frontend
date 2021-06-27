import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/AuthContext';
import { useState, useContext } from 'react';

export default function SignUpPage() {
	// ContextAPI functions and state
	const { register, message } = useContext(AuthContext);
	// Signup State
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			username === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			toast.error('所有欄目都而要填寫哦', {
				position: 'top-center'
			});
			return;
		}
		if (password !== confirmPassword) {
			toast.error('噢～兩次輸入的密碼都不一樣呢', {
				position: 'top-center'
			});
			return;
		}
		register({ username, email, password });
	};
	return (
		<Layout>
			<ToastContainer />
			<Container>
				<h2 className='text-center mt-5'>註冊新帳户</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Username</Form.Label>

						<Form.Control
							type='text'
							placeholder='Username'
							name='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mt-4'>
						<Form.Label>Email</Form.Label>

						<Form.Control
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Form.Text className='text-muted'>
							放心，我們跟你一樣很著重個人私隱，所以我們承諾不會把你的email分享給其他人
						</Form.Text>
					</Form.Group>

					<Form.Group className='mt-4'>
						<Form.Label>Password</Form.Label>

						<Form.Control
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Form.Text className='text-muted'>
							密碼要是6個字以上，需要包括數字和英文字母
						</Form.Text>
					</Form.Group>

					<Form.Group className='mt-4'>
						<Form.Label>確認Password</Form.Label>

						<Form.Control
							type='password'
							placeholder='Password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					<Button
						variant='success'
						className='mt-5'
						type='submit'
						block
					>
						註冊
					</Button>
				</Form>
				<p className='mt-5 text-center'>
					已經有帳號？ <Link href='/login'>按此登入</Link>
				</p>
			</Container>
		</Layout>
	);
}
