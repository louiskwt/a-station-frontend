import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/AuthContext';
import { useState, useContext } from 'react';

export default function LoginPage() {
	const { login, error } = useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (e.target.email.value === '' || e.target.password.value === '') {
			toast.error('請先輸入電郵和密碼', {
				position: 'top-center'
			});
			return;
		}
		login({ email: 'louis', password: '1234' });
	};

	return (
		<Layout>
			<ToastContainer />
			<Container>
				<h2 className='text-center mt-5'>登入 A-Station</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>

						<Form.Control
							type='email'
							placeholder='Email'
							name='email'
						/>
					</Form.Group>

					<Form.Group className='mt-4'>
						<Form.Label>Password</Form.Label>

						<Form.Control
							type='password'
							placeholder='Password'
							name='password'
						/>
					</Form.Group>
					<Button
						variant='success'
						className='mt-5'
						type='submit'
						block
					>
						登入
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
