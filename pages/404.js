import Layout from '@/components/Layout';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';

export default function NotFoundPage() {
	const router = useRouter();

	const { text, setText } = useContext(AuthContext);

	const [second, setSecond] = useState(3);
	useEffect(() => {
		const timer = setInterval(() => {
			if (second === 0) {
				router.push('/');
				return;
			} else {
				setSecond(second - 1);
			}
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	});
	return (
		<Layout title='Not Found | A-station'>
			<div className='container text-center'>
				{text && (
					<h1 className='mt-5'>
						{' '}
						<FaExclamationTriangle></FaExclamationTriangle> 抱兼～
						{text}
					</h1>
				)}
				{!text && (
					<h1 className='mt-5'>
						{' '}
						<FaExclamationTriangle></FaExclamationTriangle> 抱兼～
						暫時無法訪問該頁面
					</h1>
				)}
				<h4>{second} 秒之後會將跳轉回主頁</h4>
				<Button className='mt-5' variant='secondary'>
					立即返回主頁
				</Button>
			</div>
		</Layout>
	);
}
