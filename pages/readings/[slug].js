import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import Passage from '@/components/Passage';
import MCPanel from '@/components/MCPanel';
import SAPanel from '@/components/SAPanel';
import { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import ScoreContext from '@/context/ScoreContext';

export async function getServerSideProps({ query: { slug } }) {
	try {
		const res = await fetch(`${API_URL}/readings?slug=${slug}`);
		const ex = await res.json();

		return {
			props: {
				ex: ex[0],
				slug
			}
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true
		};
	}
}

export default function ReadingExPage({ ex, slug }) {
	// Context states
	const { startingTime, setStartingTime, setType } = useContext(ScoreContext);

	const { user, checkMembership } = useContext(AuthContext);

	if (ex.premium === true) {
		checkMembership(user);
	}

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setStartingTime(Date.now());
			setType('readings');
		}
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<Layout title={ex.title}>
			{ex.premium && user.membership !== 'VIP' ? (
				<></>
			) : (
				<>
					{' '}
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
								slug={slug}
							/>
						) : (
							<SAPanel
								questions={ex.questions}
								answers={ex.answers}
								startingTime={startingTime}
								slug={slug}
							/>
						)}
					</Container>
					<br></br>
					<Link href='/readings'>
						<Button variant='light'>Back</Button>
					</Link>
				</>
			)}
		</Layout>
	);
}
