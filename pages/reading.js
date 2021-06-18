import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function ReadingPage() {
	return (
		<Layout>
			<Container>
				<Row>
					<Col>
						<h2 className='mt-5'>閱讀訓練</h2>
					</Col>
					<Col>
						<Filter />
					</Col>
				</Row>
				<hr></hr>
				<Row>
					<Card>
						<Card.Header as='h5' className='bg-light'>
							Ex 1
						</Card.Header>
						<Card.Body>
							<Card.Title>
								Special title treatment{' '}
								<span className='ml-5 badge-pill badge-dark'>
									T / F / NG
								</span>
							</Card.Title>
							<Card.Text>
								With supporting text below as a natural lead-in
								to additional content.
							</Card.Text>
							<Button variant='primary'>Go somewhere</Button>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</Layout>
	);
}
