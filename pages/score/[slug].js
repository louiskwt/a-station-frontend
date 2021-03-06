import Layout from '@/components/Layout';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ScoreContext from '@/context/ScoreContext';
import AuthContext from '@/context/AuthContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect, useState, useContext } from 'react';
import { calculatingPoint, millisToMinAndSeconds } from '@/helper/scoring';
import { parseCookies } from '@/helper/cookie';
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify';
import Ranking from '@/components/Ranking';

export async function getServerSideProps({ req, query: { slug } }) {
	const { token } = parseCookies(req);

	if (token) {
		try {
			const res = await fetch(`${API_URL}/records?title=${slug}`);
			const rankingData = await res.json();
			return {
				props: {
					token,
					rankingData
				}
			};
		} catch (error) {
			console.error(error);
			return {
				notFound: true
			};
		}
	} else {
		return {
			props: {}
		};
	}
}

export default function ScorePage({ token, rankingData }) {
	const {
		scoringData,
		setScoringData,
		finishingTime,
		setFinishingTime,
		title,
		type,
		setType,
		setTitle,
		setStartingTime,
		record
	} = useContext(ScoreContext);

	const { user } = useContext(AuthContext);

	const total = scoringData.length;
	const [score, setSscore] = useState(0);

	const totalPoint = calculatingPoint(scoringData);

	useEffect(() => {
		let mounted = true;
		let timer;
		if (mounted) {
			timer = setInterval(() => {
				if (score === totalPoint) {
					mounted = false;
				} else {
					setSscore(score + 1);
				}
			}, 300);
		}

		return () => {
			mounted = false;
			clearInterval(timer);
		};
	});

	const handleClick = () => {
		setScoringData([]);
		setFinishingTime(0);
		setType('');
		setTitle('');
		setStartingTime(0);
	};

	const handleRecord = async () => {
		const res = await fetch(`${API_URL}/records`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(record)
		});

		if (!res.ok) {
			toast.warning('???????????????????????????????????????????????????', {
				position: 'top-center',
				autoClose: 3000
			});
			return;
		} else {
			console.log('succeess');
			toast.success('???? ???????????????', {
				position: 'top-center',
				autoClose: 3000
			});
		}
	};

	// Modal
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Layout title={'???????????? ???A-station'}>
			<ToastContainer />
			{scoringData.length === 0 ? (
				<>
					<h1 className='mt-3'>???????????????????????????...</h1>
					<br />
					<h2>???????????????????????????</h2>
					<Link href={`/`}>
						<Button variant='light' onClick={handleClick}>
							??????
						</Button>
					</Link>
				</>
			) : (
				<>
					<div className='text-center mt-5'>
						<h3>{title.replaceAll('-', ' ')}</h3>
						<h4>
							Score : {totalPoint} / {total}
						</h4>
						{/* Time Spent */}
						<h4 className='mt-3'>???????????? </h4>
						<h3 className='mt-3'>
							<Badge variant='secondary'>
								{millisToMinAndSeconds(finishingTime)}
							</Badge>
						</h3>
						<br />
						<br />
						<ProgressBar
							now={Math.round((score / total) * 100)}
							label={`${Math.round((score / total) * 100)} %`}
						/>
						<br />
						<br />
					</div>

					<div className='d-flex justify-content-between mb-5'>
						{rankingData ? (
							<>
								<Button variant='info' onClick={handleShow}>
									?????????
								</Button>
								<Ranking
									show={show}
									rankingData={rankingData}
									handleClose={handleClose}
								/>{' '}
							</>
						) : (
							''
						)}
						<a
							href={`https://wa.me/85263520220/?text=??????${title}??????????????????????????????????????????`}
							target='_blank'
						>
							<Button variant='warning'>??????/???????????????</Button>
						</a>
					</div>

					{/* Table */}
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Your answer</th>
								<th>Correct Answer</th>
							</tr>
						</thead>
						<tbody>
							{scoringData.map((data, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									{data.answer.includes(data.response) ? (
										<td className='text-success'>
											{data.response} <FaCheck />
										</td>
									) : (
										<td className='text-danger'>
											{data.response} <FaTimes />
										</td>
									)}

									<td>{data.answer}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<br />
					<div className='d-flex justify-content-between'>
						<Link href={`/${type}/${title}`}>
							<Button variant='light' onClick={handleClick}>
								????????????
							</Button>
						</Link>
						{user.type !== 'guest' && (
							<Button variant='success' onClick={handleRecord}>
								????????????
							</Button>
						)}
					</div>
				</>
			)}
		</Layout>
	);
}
