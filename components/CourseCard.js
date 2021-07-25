import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import styles from '@/styles/ExerciseCard.module.css';
import Link from 'next/link';

export default function CourseCard() {
	return (
		<>
			<Card className='mt-4'>
				<Card.Header as='h5' className='bg-light'>
					Course Title
				</Card.Header>
				<Card.Body className={styles.tag}>
					<Card.Title>Price: 80 HKD </Card.Title>

					<Card.Text className='mt-3'>課程重點！</Card.Text>
					{/* {exercise.premium && user.membership === 'Free' && (
						<Link href={`/${exercise.type}/${exercise.slug}`}>
							<a
								className='btn btn-primary disabled'
								onClick={() => setLoading(true)}
							>
								只限 VIP
							</a>
						</Link>
					)}
					{exercise.premium && user && user.membership === 'VIP' && (
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
					{!exercise.premium && (
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
					)} */}
				</Card.Body>
			</Card>
		</>
	);
}
