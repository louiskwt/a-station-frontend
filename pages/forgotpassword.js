import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function ForgotPasswordPage() {
	return (
		<Layout>
			<Container>
				<h2 className='text-center mt-5'>忘記密碼?</h2>
				<h4 className='text-center mt-5'>
					請email: kawingt2@gmail.com
				</h4>
				<h4 className='text-center mt-3'>或</h4>
				<h4 className='text-center mt-3'>
					通過WhatsApp:{' '}
					<Link href='https://wa.me/85263520220?text=我想重設密碼%20thanks!'>
						<a>
							<FaWhatsapp size={36} style={{ color: 'green' }} />
						</a>
					</Link>{' '}
					去聯絡我
				</h4>
				<h4 className='text-center mt-5'>我會盡快幫你重設密碼</h4>
			</Container>
		</Layout>
	);
}
