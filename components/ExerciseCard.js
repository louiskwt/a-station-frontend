import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ExerciseCard() {
	return (
		<>
			<Card>
				<Card.Header as='h5' className='bg-light'>
					Ex 1
				</Card.Header>
				<Card.Body>
					<Card.Title>
						Special title treatment{' '}
						<span className='ml-3 badge-pill badge-dark'>
							T / F / NG
						</span>
					</Card.Title>

					<Card.Text>
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
				<Card.Body>
					<Card.Title>
						Special title treatment{' '}
						<span className='ml-3 badge-pill badge-dark'>
							Summary Cloze
						</span>
					</Card.Title>

					<Card.Text>
						With supporting text below as a natural lead-in to
						additional content.
					</Card.Text>
					<Button variant='primary'>做練習</Button>
				</Card.Body>
			</Card>
		</>
	);
}
