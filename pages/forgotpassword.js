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

export default function ForgotPasswordPage() {
	// ContextAPI state and function
	const { login, loading, setLoading } = useContext(AuthContext);
	// Login State
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (e.target.email.value === '') {
			toast.error('請先輸入電郵', {
				position: 'top-center'
			});
			setLoading(false);
			return;
		}
	};

	return (
		<Layout>
			<Container>
				<h2 className='text-center mt-5'>忘記密碼</h2>
				<p className='text-center mt-3'>
					請輸入你註冊時使用的電郵去重設密碼～
				</p>
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
							'重設密碼'
						)}
					</Button>
				</Form>
			</Container>
		</Layout>
	);
}
