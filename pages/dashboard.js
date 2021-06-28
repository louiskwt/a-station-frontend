import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

export default function DashboardPage() {
	const { user } = useContext(AuthContext);

	return (
		<Layout>
			<Container>
				<h1 className='text-center mt-5'>{user.username}</h1>
				<h2>用户資料</h2>
				<Table className='mt-5'>
					<tbody>
						<tr>
							<td>Email: </td>
							<td>{user.email}</td>
						</tr>
						<tr>
							<td>Membership: </td>
							<td>Free</td>
						</tr>
						<tr>
							<td>註冊日期 </td>
							<td>{user.created_at.slice(0, 10)}</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		</Layout>
	);
}
