import Card from 'react-bootstrap/Card';
import styles from '@/styles/ExerciseCard.module.css';
import Link from 'next/link';

export default function ExerciseCard({ exercise }) {
	return (
		<>
			<Card className='mt-4'>
				<Card.Header as='h5' className='bg-light'>
					{exercise.type === 'readings' ? 'R-' : 'W-'}
					{exercise.id}
				</Card.Header>
				<Card.Body className={styles.tag}>
					<Card.Title>{exercise.title} </Card.Title>
					<span className=' badge-pill badge-dark'>
						{exercise.tag}
					</span>{' '}
					<span className=' badge-pill badge-warning'>
						Difficulty Lv: {exercise.level}
					</span>
					<Card.Text className='mt-3'>
						{exercise.description}
					</Card.Text>
					<Link href={`/${exercise.type}/${exercise.slug}`}>
						<a className='btn btn-primary'>做練習</a>
					</Link>
				</Card.Body>
			</Card>
		</>
	);
}
