import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<Layout>
			<Container>
				<h2 className='text-center'>登入 A-Station</h2>
				<Form>
					<Form.Group>
						<Form.Label>Email</Form.Label>

						<Form.Control type='email' placeholder='Email' />
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>

						<Form.Control type='password' placeholder='Password' />
					</Form.Group>
					<Button variant='success' block>
						Log in
					</Button>
				</Form>
				<p className='mt-5 text-center'>
					沒有帳號？ <Link href='/singup'>按此註冊</Link>
				</p>
				<p className='mt-3 text-center'>
					忘記密碼？ <Link href='/singup'>按此重設</Link>
				</p>
			</Container>
		</Layout>
	);
}
