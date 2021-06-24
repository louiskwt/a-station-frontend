import Table from 'react-bootstrap/Table';

export default function Score({ scoringData }) {
	console.log(scoringData);
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
						<tr>
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
