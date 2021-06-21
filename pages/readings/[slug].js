import Layout from '../../components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';

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
	console.log(ex);
	return (
		<Layout title={ex.title}>
			<Container>
				<h2 className='mt-3'>{ex.title}</h2>
				<br />
				<br />
				<Image
					src={ex.cover.formats.medium.url}
					alt='cover'
					width={750}
					height={422}
				/>
				<Link href='/readings'>
					<Button variant='light'>Back</Button>
				</Link>
			</Container>
		</Layout>
	);
}
