import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import ExerciseCard from '@/components/ExerciseCard';

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
					<ExerciseCard />
				</Row>
			</Container>
		</Layout>
	);
}
