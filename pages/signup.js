import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (e.target.email.value === '' || e.target.password.value === '') {
			toast.error('請先輸入電郵和密碼', {
				position: 'top-center'
			});
			return;
		}
		if (e.target.password.value !== e.target.confirmPassword.value) {
			toast.error('兩次輸入的密碼不一樣', {
				position: 'top-center'
			});
			return;
		}
	};
	return (
		<Layout>
			<ToastContainer />
			<Container>
				<h2 className='text-center mt-5'>註冊新帳户</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>

						<Form.Control
							type='email'
							placeholder='Email'
							name='email'
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