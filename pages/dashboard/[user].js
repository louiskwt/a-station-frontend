import { useState } from 'react';
import Layout from '@/components/Layout';
import RecordTable from '@/components/RecordTable';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { API_URL } from '@/config/index';

export async function getServerSideProps({ query: { user } }) {
	try {
		const res = await fetch(`${API_URL}/records?user.username=${user}`);
		const record = await res.json();
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
	const { user } = useContext(AuthContext);
	const [show, setShow] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleReset = () => {
		setSubmitted(true);
		if (confirmPassword !== password) {
			alert('兩次輸入的密碼不一樣');
			return;
		}
		console.log('reset');
	};

	return (
		<Layout>
			<Container>
				{user.type !== 'guest' && (
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
				<hr />
				{record && (
					<>
						<h2 className='mt-5'>站內成績</h2>
						<RecordTable record={record} />
					</>
				)}
				<br />
				<Button variant='danger' size='lg' onClick={handleShow}>
					重設密碼
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>重設密碼</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className='mt-4'>
								<Form.Label>Password</Form.Label>

								<Form.Control
									type='password'
									placeholder='Password'
									name='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									isValid={password.length >= 6}
									isInvalid={
										password.length < 6 &&
										password.length !== 0
									}
								/>
								<Form.Text className='text-muted'>
									密碼要求是6個字以上
								</Form.Text>
							</Form.Group>

							<Form.Group className='mt-4'>
								<Form.Label>確認Password</Form.Label>

								<Form.Control
									type='password'
									placeholder='Password'
									name='confirmPassword'
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									isValid={
										confirmPassword === password &&
										password.length > 0
									}
									isInvalid={
										confirmPassword !== password &&
										submitted
									}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={handleReset}>
							重設密碼
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</Layout>
	);
}
