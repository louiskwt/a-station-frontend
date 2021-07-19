import Table from 'react-bootstrap/Table';

export default function RecordTable({ record }) {
	return (
		<Table bordered hover className='mt-5'>
			<thead>
				<tr>
					<td>練習</td>
					<td>成績</td>
					<td>時間</td>
					<td>日期</td>
				</tr>
			</thead>
			<tbody>
				{record.map((data, index) => (
					<tr key={index}>
						<td>{data.title}</td>
						<td>
							{data.score} / {data.total}
						</td>
						<td>{data.time}</td>
						<td>{data.created_at.slice(0, 10)}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
