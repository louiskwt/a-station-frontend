import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import ExerciseCard from '@/components/ExerciseCard';
import PaginationList from '@/components/PaginationList';
import { API_URL, PER_PAGE } from '@/config/index';

export async function getServerSideProps({ query: { page = 1 } }) {
	// Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * 3;

	try {
		const totalRes = await fetch(`${API_URL}/writings/count`);

		const total = await totalRes.json();
		// Fetch Exercises
		const exerciseRes = await fetch(
			`${API_URL}/writings?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
		);

		const grammarEx = await exerciseRes.json();

		return {
			props: { grammarEx, page: +page, total }
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true
		};
	}
}

export default function Grammar({ grammarEx, page, total }) {
	const tags = [
		'gerund / to-infinitive',
		'present tense',
		'past tense',
		'preposition',
		'conditional',
		'passive voice'
	];
	const type = 'grammar';

	return (
		<Layout title='Grammar Exercises | a-station'>
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
				{grammarEx.map((exercise) => (
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
