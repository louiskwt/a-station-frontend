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
	const tags = ['opposite meaning', 'similar meaning', 'T/F/NG'];
	const type = 'readings';
	return (
		<Layout title='Readings'>
			<Container>
				<Row>
					<Col>
						<h2 className='mt-5'>閱讀訓練</h2>
					</Col>
					<Col>
						<Filter tags={tags} type={type} />
					</Col>
				</Row>
				<hr></hr>

				{readings.map((exercise) => (
					<ExerciseCard
						exercise={exercise}
						key={exercise.id}
						className='w-100'
					/>
				))}
			</Container>
		</Layout>
	);
}
