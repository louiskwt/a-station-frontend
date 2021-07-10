import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { API_URL } from '@/config/index';

export async function getServerSideProps({ query: { user } }) {
	try {
		const res = await fetch(`${API_URL}/records?user.username=${user}`);
		const record = await res.json();
		console.log(record);
		return {
			props: {
				record
			}
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true
		};
	}
}

export default function DashboardPage({ record }) {
	console.log(record);
	const { user } = useContext(AuthContext);

	return (
		<Layout>
			<Container>
				{user && (
					<>
						{' '}
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
									<td>{user.membership}</td>
								</tr>
								<tr>
									<td>註冊日期 </td>
									<td>{user.created_at.slice(0, 10)}</td>
								</tr>
							</tbody>
						</Table>{' '}
					</>
				)}
			</Container>
		</Layout>
	);
}
