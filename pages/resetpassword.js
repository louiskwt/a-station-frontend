import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

export async function getServerSideProps({ query: { code }, req }) {
	console.log(code);
	try {
		if (!code) {
			throw 'Not Found';
		}
		return {
			props: {
				code
			}
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true
		};
	}
}

export default function ResetPasswordPage() {
	const { setMessage, loading, setLoading } = useContext(AuthContext);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (email === '') {
			setMessage('請先輸入新密碼和確認新密碼');
			setLoading(false);
			return;
		}

		console.log('confirmed');
	};
	return (
		<Layout>
			<Container>
				<h2 className='text-center mt-5'>重設密碼</h2>

				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-4'>
						<Form.Label>新密碼</Form.Label>

						<Form.Control
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							isValid={password.length >= 6}
							isInvalid={
								password.length < 6 && password.length !== 0
							}
						/>
						<Form.Text className='text-muted'>
							密碼要求是6個字以上
						</Form.Text>
					</Form.Group>

					<Form.Group className='mt-4'>
						<Form.Label>確認新密碼</Form.Label>

						<Form.Control
							type='password'
							placeholder='Password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							isValid={
								confirmPassword === password &&
								password.length > 0
							}
							isInvalid={
								confirmPassword !== password && submitted
							}
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
