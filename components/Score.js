import Table from 'react-bootstrap/Table';

export default function Score({ res, ans }) {
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
				<tbody>{/* dynamic data */}</tbody>
			</Table>
		</div>
	);
}
