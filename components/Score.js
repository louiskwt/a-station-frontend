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
		return score;
	};
	return (
		<div>
			{/* Score */}
			<div className='text-center'>
				<h4>
					Score : {calculatingScore(scoringData)} / {total}
				</h4>
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
