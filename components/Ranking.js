import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

export default function Ranking({ show, rankingData, handleClose }) {
	// Sort the record to rank
	rankingData.sort((a, b) => b.score - a.score);
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>排行榜</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Username</th>
							<th>Time</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{rankingData.map((data, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{data.user.username}</td>
								<td>{data.time}</td>
								<td>
									{data.score} / {data.total}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	);
}
