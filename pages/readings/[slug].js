import Layout from '../../components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import Passage from '@/components/Passage';
import MCPanel from '@/components/MCPanel';
import SAPanel from '@/components/SAPanel';
import { useEffect, useState } from 'react';

export async function getServerSideProps({ query: { slug } }) {
	try {
		const res = await fetch(`${API_URL}/readings?slug=${slug}`);
		const ex = await res.json();

		return {
			props: {
				ex: ex[0]
			}
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true
		};
	}
}

export default function ReadingExPage({ ex }) {
	// State for Timer
	const [startingTime, setStartingTime] = useState();

	useEffect(() => setStartingTime(Date.now()), []);

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
				<br />
				<Passage text={ex.passage} title={ex.title} />

				<br />
				{ex.mc ? (
					<MCPanel
						questions={ex.questions}
						answers={ex.answers}
						startingTime={startingTime}
					/>
				) : (
					<SAPanel
						questions={ex.questions}
						answers={ex.answers}
						startingTime={startingTime}
					/>
				)}
			</Container>
			<br></br>
			<Link href='/readings'>
				<Button variant='light'>Back</Button>
			</Link>
		</Layout>
	);
}
