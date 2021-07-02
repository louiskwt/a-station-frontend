import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import styles from '@/styles/ExerciseCard.module.css';
import Link from 'next/link';
import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';

export default function ExerciseCard({ exercise }) {
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
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
					{exercise.premium && user.membership === 'Free' && (
						<Link href={`/${exercise.type}/${exercise.slug}`}>
							<a
								className='btn btn-primary disabled'
								onClick={() => setLoading(true)}
							>
								{loading ? (
									<Spinner
										as='span'
										animation='border'
										size='sm'
										role='status'
										aria-hidden='true'
										variant='light'
									/>
								) : (
									'只限VIP'
								)}
							</a>
						</Link>
					)}
					{user && user.membership === 'VIP' && (
						<Link href={`/${exercise.type}/${exercise.slug}`}>
							<a
								className='btn btn-primary'
								onClick={() => setLoading(true)}
							>
								{loading ? (
									<Spinner
										as='span'
										animation='border'
										size='sm'
										role='status'
										aria-hidden='true'
										variant='light'
									/>
								) : (
									'做練習'
								)}
							</a>
						</Link>
					)}
					{!exercise.premium && user.membership !== 'VIP' && (
						<Link href={`/${exercise.type}/${exercise.slug}`}>
							<a
								className='btn btn-primary'
								onClick={() => setLoading(true)}
							>
								{loading ? (
									<Spinner
										as='span'
										animation='border'
										size='sm'
										role='status'
										aria-hidden='true'
										variant='light'
									/>
								) : (
									'做練習'
								)}
							</a>
						</Link>
					)}
				</Card.Body>
			</Card>
		</>
	);
}
