import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from '@/styles/ExerciseCard.module.css';

export default function ExerciseCard({ exercise }) {
	return (
		<>
			<Card className='mt-4'>
				<Card.Header as='h5' className='bg-light'>
					Ex {exercise.id}
				</Card.Header>
				<Card.Body className={styles.tag}>
					<Card.Title>{exercise.title} </Card.Title>
					<span className=' badge-pill badge-dark'>
						{exercise.tag}
					</span>
					<Card.Text className='mt-3'>
						{exercise.description}
					</Card.Text>
					<Button variant='primary'>做練習</Button>
				</Card.Body>
			</Card>
		</>
	);
}
