import Layout from '@/components/Layout';
import { API_URL } from '@/config//index';
import Link from 'next/link';

export default function WritingFilterPage() {
	return (
		<Layout>
			<Link href='/writings'>
				<a className='mt-5 btn btn-warning'>Clear Filter Result</a>
			</Link>
			<h1>Filter result for: </h1>
		</Layout>
	);
}
