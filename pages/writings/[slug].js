import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import SAPanel from '@/components/SAPanel';
import MCPanel from '@/components/MCPanel';

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
	// State for Timer
	const [startingTime, setStartingTime] = useState();

	useEffect(() => setStartingTime(Date.now()), []);
	// state
	const [loading, setLoading] = useState(false);
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
				{ex.mc ? (
					<MCPanel
						questions={ex.questions}
						answers={ex.answers}
						startingTime={startingTime}
					/>
				) : (
					<SAPanel answers={ex.answers} startingTime={startingTime} />
				)}
			</Container>
			<br />
			<br />
			<Link href='/writings'>
				<Button variant='light'>Back</Button>
			</Link>
		</Layout>
	);
}
