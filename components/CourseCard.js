import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import styles from '@/styles/ExerciseCard.module.css';
import Link from 'next/link';

export default function CourseCard() {
	return (
		<>
			<Col md={3}>
				<Card style={{ width: '18rem' }}>
					<Card.Img variant='top' src='' />
					<Card.Body>
						<Card.Title>Card Title</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title
							and make up the bulk of the card's content.
						</Card.Text>
						<Button variant='primary'>Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
			<Col md={3}>
				<Card style={{ width: '18rem' }}>
					<Card.Img variant='top' src='' />
					<Card.Body>
						<Card.Title>Card Title</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title
							and make up the bulk of the card's content.
						</Card.Text>
						<Button variant='primary'>Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
			<Col md={3}>
				<Card style={{ width: '18rem' }}>
					<Card.Img variant='top' src='' />
					<Card.Body>
						<Card.Title>Card Title</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title
							and make up the bulk of the card's content.
						</Card.Text>
						<Button variant='primary'>Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}
