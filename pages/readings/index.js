import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';
import ExerciseCard from '@/components/ExerciseCard';
import { API_URL } from '@/config/index';
import PaginationList from '@/components/PaginationList';
const PER_PAGE = 3;

export async function getServerSideProps({ query: { page = 1 } }) {
	// Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * 3;
	try {
		// Fetch total/count
		const totalRes = await fetch(`${API_URL}/readings/count`);

		const total = await totalRes.json();

		// Fetch exercises
		const exerciseRes = await fetch(
			`${API_URL}/readings?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
		);
		const readings = await exerciseRes.json();

		return {
			props: { readings, page: +page, total }
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}

export default function ReadingPage({ readings, page, total }) {
	// pagination

	const tags = ['opposite meaning', 'similar meaning', 'T/F/NG'];
	const type = 'readings';
	return (
		<Layout title='Reading Exercises | a-station'>
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
