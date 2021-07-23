import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';

// export async function getServerSideProps({ query: { page = 1 } }) {
// 	// Calculate start page
// 	const start = +page === 1 ? 0 : (+page - 1) * 3;
// 	try {
// 		// Fetch total/count
// 		const totalRes = await fetch(`${API_URL}/readings/count`);

// 		const total = await totalRes.json();

// 		// Fetch exercises
// 		const exerciseRes = await fetch(
// 			`${API_URL}/readings?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
// 		);
// 		const readings = await exerciseRes.json();

// 		return {
// 			props: { readings, page: +page, total }
// 		};
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			notFound: true
// 		};
// 	}
// }

export default function ReadingPage() {
	// pagination

	return (
		<Layout title='Online Courses | a-station'>
			<Container></Container>
		</Layout>
	);
}
