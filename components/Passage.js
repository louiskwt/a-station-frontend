import Card from 'react-bootstrap/Card';
import styles from '@/styles/Passage.module.css';

export default function Passage({ text, title }) {
	return (
		<div className='col-10 offset-1 mt-3'>
			<Card>
				<Card.Body className={styles.passage}>
					<h5 className='mb-2'>{title}</h5>
					<br />
					{text}
				</Card.Body>
			</Card>
		</div>
	);
}
