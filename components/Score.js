import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useState } from 'react';

export default function Score({ scoringData }) {
	const total = scoringData.length;

	const calculatingPoint = (scoringData) => {
		let point = 0;
		scoringData.map((data) => {
			if (data.response === data.answer) {
				point += 1;
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

	return (
		<div>
			{/* Score */}
			<div className='text-center'>
				<h4>
					Score : {score} / {total}
				</h4>
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
							<td>{data.response}</td>
							<td>{data.answer}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
