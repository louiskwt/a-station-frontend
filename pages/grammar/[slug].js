import { useState, useEffect, useContext } from 'react';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import SAPanel from '@/components/SAPanel';
import MCPanel from '@/components/MCPanel';
import AuthContext from '@/context/AuthContext';
import ScoreContext from '@/context/ScoreContext';

export async function getServerSideProps({ query: { slug } }) {
	try {
		const res = await fetch(`${API_URL}/writings?slug=${slug}`);
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

export default function WritingExPage({ ex, slug }) {
	// Context states
	const { startingTime, setStartingTime, setType } = useContext(ScoreContext);

	const { user, checkMembership } = useContext(AuthContext);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setStartingTime(Date.now());
			setType('writings');
		}
		return () => {
			mounted = false;
		};
	}, []);

	if (ex.premium === true && checkMembership(user)) {
		return (
			<Layout title={ex.title}>
				{ex.premium && user.membership !== 'VIP' ? (
					<></>
				) : (
					<>
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
						<br />
						<br />
						<div className='d-flex justify-content-between mt-5'>
							<Link href='/readings'>
								<Button variant='light'>Back</Button>
							</Link>

							<a
								href={`https://wa.me/85263520220/?text=練習${slug}裡面的答案或問題有錯誤的地方`}
								target='_blank'
							>
								<Button variant='warning'>
									題目/答案有問題
								</Button>
							</a>
						</div>
					</>
				)}
			</Layout>
		);
	} else if (ex.premium === false) {
		return (
			<Layout title={ex.title}>
				{ex.premium && user.membership !== 'VIP' ? (
					<></>
				) : (
					<>
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
						<br />
						<br />
						<div className='d-flex justify-content-between mt-5'>
							<Link href='/readings'>
								<Button variant='light'>Back</Button>
							</Link>

							<a
								href={`https://wa.me/85263520220/?text=練習${slug}裡面的答案或問題有錯誤的地方`}
								target='_blank'
							>
								<Button variant='warning'>
									題目/答案有問題
								</Button>
							</a>
						</div>
					</>
				)}
			</Layout>
		);
	} else {
		return (
			<Layout>
				<Container className='mt-3 text-center'>
					<h2>只限VIP！</h2>
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