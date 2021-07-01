import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import ExerciseCard from '@/components/ExerciseCard';
import PaginationList from '@/components/PaginationList';
import { API_URL } from '@/config/index';
const PER_PAGE = 3;

export async function getServerSideProps({ query: { page = 1 } }) {
	// Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * 3;

	const totalRes = await fetch(`${API_URL}/writings/count`);

	const total = await totalRes.json();
	// Fetch Exercises
	const exerciseRes = await fetch(
		`${API_URL}/writings?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
	);

	const writings = await exerciseRes.json();

	return {
		props: { writings, page: +page, total }
	};
}

export default function writing({ writings, page, total }) {
	const tags = ['gerund/to-infinitive', 'present tense', 'past tense'];
	const type = 'writings';

	return (
		<Layout title='Writing Exercises | a-station'>
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
			<br />
			{total > PER_PAGE && (
				<PaginationList
					total={total}
					PER_PAGE={PER_PAGE}
					page={page}
					type={type}
				/>
			)}
		</Layout>
	);
}
