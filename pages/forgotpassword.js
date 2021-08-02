import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

export default function ForgotPasswordPage() {
	const { setMessage, loading, setLoading, forgotPassword } =
		useContext(AuthContext);
	const [email, setEmail] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (email === '') {
			setMessage('請先輸入email');
			setLoading(false);
			return;
		}

		forgotPassword(email);
	};
	return (
		<Layout title='忘記密碼 | A-station'>
			<Container>
				<h2 className='text-center mt-5'>忘記密碼?</h2>
				<h5 className='text-center mt-5'>請輸入你註冊時使用的email</h5>

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
							'確認'
						)}
					</Button>
				</Form>
			</Container>
		</Layout>
	);
}
