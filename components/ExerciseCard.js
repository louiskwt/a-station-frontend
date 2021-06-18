import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from '@/styles/ExerciseCard.module.css';

export default function ExerciseCard() {
	return (
		<>
			<Card>
				<Card.Header as='h5' className='bg-light'>
					Ex 1
				</Card.Header>
				<Card.Body className={styles.tag}>
					<Card.Title>Special title treatment </Card.Title>
					<span className=' badge-pill badge-dark'>T / F / NG</span>

					<Card.Text className='mt-3'>
						With supporting text below as a natural lead-in to
						additional content.
					</Card.Text>
					<Button variant='primary'>做練習</Button>
				</Card.Body>
			</Card>

			<Card className='mt-4'>
				<Card.Header as='h5' className='bg-info'>
					Ex 2
				</Card.Header>
				<Card.Body className={styles.tag}>
					<Card.Title>Special title treatment</Card.Title>
					<span className='badge-pill badge-dark'>Summary Cloze</span>

					<Card.Text className='mt-3'>
						With supporting text below as a natural lead-in to
						additional content.
					</Card.Text>
					<Button variant='primary'>做練習</Button>
				</Card.Body>
			</Card>
		</>
	);
}
