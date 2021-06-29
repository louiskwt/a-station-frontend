import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';

export default function LoginPage() {
	// ContextAPI state and function
	const { login, loading, setLoading } = useContext(AuthContext);
	// Login State
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (e.target.email.value === '' || e.target.password.value === '') {
			toast.error('請先輸入電郵和密碼', {
				position: 'top-center'
			});
			setLoading(false);
			return;
		}
		login({ email, password });
	};

	return (
		<Layout>
			<Container>
				<h2 className='text-center mt-5'>登入 A-Station</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>

						<Form.Control
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
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
					</Form.Group>
					<Button
						variant='success'
						className='mt-5'
						type='submit'
						block
					>
						{loading ? (
							<Spinner
								as='span'
								animation='border'
								size='sm'
								role='status'
								aria-hidden='true'
								variant='light'
							/>
						) : (
							'登入'
						)}
					</Button>
				</Form>
				<p className='mt-5 text-center'>
					沒有帳號？ <Link href='/signup'>按此註冊</Link>
				</p>
				<p className='mt-3 text-center'>
					忘記密碼？ <Link href='/signup'>按此重設</Link>
				</p>
			</Container>
		</Layout>
	);
}
