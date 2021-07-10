import Table from 'react-bootstrap/Table';

export default function RecordTable({ record }) {
	return (
		<Table bordered hover className='mt-5'>
			<thead>
				<td>練習</td>
				<td>成績</td>
				<td>時間</td>
				<td>日期</td>
			</thead>
			<tbody>
				{record.map((data) => (
					<tr>
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
