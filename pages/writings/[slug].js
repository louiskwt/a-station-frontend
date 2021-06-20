import Layout from '../../components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

export async function getServerSideProps({ query: { slug } }) {
	const res = await fetch(`${API_URL}/writings?slug=${slug}`);
	const ex = await res.json();
	return {
		props: {
			ex: ex[0]
		}
	};
}

export default function WritingExPage({ ex }) {
	console.log(ex);
	return (
		<Layout title='Ex'>
			<h1>Writing Ex Page</h1>
			<Link href='/writings'>
				<Button variant='light'>Back</Button>
			</Link>
		</Layout>
	);
}
