import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Score({ scoringData, finishingTime }) {
	const total = scoringData.length;

	const calculatingPoint = (scoringData) => {
		let point = 0;
		scoringData.map((data) => {
			if (data.answer.includes('/')) {
				const alterAnswer = data.answer.split('/');
				for (let i = 0; i < alterAnswer.length; i++) {
					if (data.response === alterAnswer[i]) {
						point += 1;
					}
				}
			} else {
				if (data.response === data.answer) {
					point += 1;
				}
			}
		});
		return point;
	};

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

	// Timer function
	const millisToMinAndSeconds = (millis) => {
		const minutes = Math.floor(millis / 60000);
		const seconds = ((millis % 60000) / 1000).toFixed(0);

		return `${minutes < 10 ? '0' : ''}${minutes} m : ${
			seconds < 10 ? '0' : ''
		}${seconds} s`;
	};

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
