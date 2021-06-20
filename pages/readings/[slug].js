import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

export async function getServerSideProps({ query: { slug } }) {
	const res = await fetch(`${API_URL}/readings?slug=${slug}`);
	const ex = await res.json();
	return {
		props: {
			ex: ex[0]
		}
	};
}

export default function ReadingExPage({ ex }) {
	const router = useRouter();
	console.log(ex);
	return (
		<Layout title='Ex'>
			<h1>Reading Ex Page</h1>
			<Link href='/readings'>
				<Button variant='light'>Back</Button>
			</Link>
		</Layout>
	);
}
