import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import styles from '@/styles/ExerciseCard.module.css';
import Link from 'next/link';

export default function CourseCard({ course }) {
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	return (
		<>
			<Card className='mt-4'>
				<Card.Header as='h5' className='bg-light'>
					{course.title}
				</Card.Header>
				<Card.Body className={styles.tag}>
					<Card.Text>
						課程重點：{' '}
						<ul className='pl-5 mt-3'>
							{course.highlights.details.map((detail, index) => (
								<li key={index}>{detail}</li>
							))}
						</ul>
					</Card.Text>
					{user.membership !== 'VIP Plus' && (
						<a
							className='btn btn-primary disabled'
							onClick={() => setLoading(true)}
						>
							只限VIP Plus學生
						</a>
					)}
					{user.membership === 'VIP Plus' && (
						<Link href={`/courses/${course.slug}`}>
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
									'開始學習'
								)}
							</a>
						</Link>
					)}
				</Card.Body>
			</Card>
		</>
	);
}
