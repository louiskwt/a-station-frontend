import Layout from '@/components/Layout';
import { API_URL } from '@/config//index';
import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';
import Container from 'react-bootstrap/Container';
import ExerciseCard from '@/components/ExerciseCard';

// Fetching the filtered data
export async function getServerSideProps({ query: { tag } }) {
	const query = qs.stringify({
		_where: {
			_or: [{ tag_contains: tag }]
		}
	});
	// Passing the query term to access the result
	const res = await fetch(`${API_URL}/writings?${query}`);
	const ex = await res.json();

	return {
		props: { ex }
	};
}

export default function WritingFilterPage({ ex }) {
	const router = useRouter();
	return (
		<Layout>
			<Container>
				<h3 className='mt-5'>Filter result for: {router.query.tag}</h3>
				{ex.map((exercise) => (
					<ExerciseCard
						exercise={exercise}
						key={exercise.id}
						className='w-100'
					/>
				))}
				<br />

				<Link href='/grammar'>
					<a className='mt-5 btn btn-warning'>Clear Filter Result</a>
				</Link>
			</Container>
		</Layout>
	);
}
