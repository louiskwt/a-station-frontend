import Layout from '../../components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import Passage from '@/components/Passage';

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
				<div className='text-center'>
					<Image
						src={ex.cover.formats.small.url}
						alt='cover'
						width={ex.cover.formats.small.width}
						height={ex.cover.formats.small.height}
					/>
				</div>
				<div>
					<Passage text={ex.passage} title={ex.title} />
				</div>
			</Container>
			<br></br>
			<Link href='/readings'>
				<Button variant='light'>Back</Button>
			</Link>
		</Layout>
	);
}
