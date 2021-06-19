import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import ExerciseCard from '@/components/ExerciseCard';
import { API_URL } from '@/config/index';

export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/readings?_sort=date:ASC`);
	const readings = await res.json();
	return {
		props: { readings }
	};
}

export default function ReadingPage({ readings }) {
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
					{readings.map((exercise) => (
						<ExerciseCard exercise={exercise} key={exercise.id} />
					))}
				</Row>
			</Container>
		</Layout>
	);
}