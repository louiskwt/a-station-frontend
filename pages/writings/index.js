import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import ExerciseCard from '@/components/ExerciseCard';
import { API_URL } from '@/config/index';

export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/writings?_sort=date:ASC`);
	const writings = await res.json();
	return {
		props: { writings }
	};
}

export default function writing({ writings }) {
	const tags = ['gerund/to-infinitive', 'present tense', 'past tense'];
	const type = 'writings';

	return (
		<Layout title='Writings'>
			<Container>
				<Row>
					<Col>
						<h2 className='mt-5'>寫作訓練</h2>
					</Col>
					<Col>
						<Filter tags={tags} type={type} />
					</Col>
				</Row>
				<hr></hr>
				{writings.map((exercise) => (
					<ExerciseCard exercise={exercise} key={exercise.id} />
				))}
			</Container>
		</Layout>
	);
}
