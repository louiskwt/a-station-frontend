import Layout from '@/components/Layout';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ScoreContext from '@/context/ScoreContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect, useState, useContext } from 'react';
import { calculatingPoint, millisToMinAndSeconds } from '@/helper/scoring';
import { useRouter } from 'next/router';
import { parseCookies } from '@/helper/cookie';
import { API_URL } from '../config';

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	if (token) {
		return {
			props: {
				token
			}
		};
	} else {
		return {
			props: {}
		};
	}
}

export default function ScorePage({ token }) {
	const router = useRouter();
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
		record,
		recordScore
	} = useContext(ScoreContext);

	console.log(record);

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

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			console.log('fired');
			if (title !== '') {
				router.push(`/score?ex=${title}`, undefined, { shallow: true });
			}
		}
		return () => {
			console.log('unmounted');
			mounted = false;
		};
	}, []);

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
			console.log('Something went wrong');
			return;
		} else {
			console.log('succeess');
		}
	};

	return (
		<Layout title={'Your Score'}>
			{scoringData.length === 0 ? (
				''
			) : (
				<>
					<div className='text-center mt-5'>
						<h3>{title.replaceAll('-', ' ')}</h3>
						<h4>
							Score : {score} / {total}
						</h4>
						{/* Time Spent */}
						<h4 className='mt-3'>完成時間 </h4>
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

					<Button variant='Info' onClick={handleRecord}>
						儲存成績
					</Button>

					<br />
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
					<Link href={`/${type}/${title}`}>
						<Button variant='light' onClick={handleClick}>
							再試一次
						</Button>
					</Link>
				</>
			)}
		</Layout>
	);
}
