import Layout from '@/components/Layout';
import { API_URL } from '@/config//index';
import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';

// Fetching the filtered data
export async function getServerSideProps({ query: { tag } }) {
	const query = qs.stringify({
		_where: {
			_or: [{ tag_contains: tag }]
		}
	});
	// Passing the query term to access the result
	const res = await fetch(`${API_URL}/readings?${query}`);
	const ex = await res.json();

	return {
		props: { ex }
	};
}

export default function ReadingFilterPage({ ex }) {
	console.log(ex);
	const router = useRouter();
	return (
		<Layout>
			<Link href='/readings'>
				<a className='mt-5 btn btn-warning'>Clear Filter Result</a>
			</Link>
			<h3>Filter result for: {router.query.tag}</h3>
		</Layout>
	);
}
