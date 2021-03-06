import Button from 'react-bootstrap/Button';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

export async function getServerSideProps({ query: { slug } }) {
	try {
		const res = await fetch(`${API_URL}/courses?slug=${slug}`);
		const course = await res.json();

		return {
			props: {
				course: course[0]
			}
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true
		};
	}
}

export default function CoursePage({ course }) {
	const { user, checkVIP, setText } = useContext(AuthContext);

	if (checkVIP(user)) {
		return (
			<Layout>
				<Container className='mt-3'>
					<h2>{course.title}</h2>
					<br></br>
					<div>
						<h3>課程內容</h3>
						<br />
						<h5>
							教學影片： <a href={course.video}>接此觀看</a>
						</h5>
						<br />
						<h5>
							筆記及練習： <a href={course.files}>點擊查看</a>
						</h5>
					</div>
				</Container>
			</Layout>
		);
	} else {
		return (
			<Layout>
				<Container className='mt-3 text-center'>
					<h2>只限VIP Plus會員！</h2>
					<Link href={'/'}>
						<Button className='mt-5' variant='secondary'>
							返回主頁
						</Button>
					</Link>
				</Container>
			</Layout>
		);
	}
}
