import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { calculatingPoint, millisToMinAndSeconds } from '@/helper/scoring';

export default function Score({ scoringData, finishingTime }) {
	const total = scoringData.length;
	const [score, setSscore] = useState(0);

	useEffect(() => {
		const totalPoint = calculatingPoint(scoringData);

		const timer = setInterval(() => {
			if (score === totalPoint) {
				return;
			} else {
				setSscore(score + 1);
			}
		}, 300);
		return () => {
			clearInterval(timer);
		};
	});

	return (
		<div>
			{/* Score */}
			<div className='text-center'>
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
		</div>
	);
}
