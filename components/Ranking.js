import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { API_URL } from '@/config/index';

export default function Ranking({ show, title, handleClose }) {
	const [ranking, setRanking] = useState('');

	useEffect(() => {
		const record = async () => {
			const fetchRecord = await fetch(
				`${API_URL}/records?title=${title}`
			);
			const data = await fetchRecord.json();
			setRanking(data);
		};
		record();

		console.log(ranking);
	}, []);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Woohoo, you're reading this text in a modal!
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='primary' onClick={handleClose}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
