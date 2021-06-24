import Table from 'react-bootstrap/Table';

export default function Score({ scoringData }) {
	console.log(scoringData);
	const total = scoringData.length;
	console.log(total);
	const calculatingScore = (scoringData) => {
		let score = 0;
		scoringData.map((data) => {
			if (data.response === data.answer) {
				score += 1;
			}
		});
		console.log(score);
	};
	calculatingScore(scoringData);

	return (
		<div>
			{/* Score */}
			<div className='text-center'>
				<h4>Score</h4>
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
