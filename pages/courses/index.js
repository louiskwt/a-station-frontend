import CourseCard from '@/components/CourseCard';
import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import { API_URL } from '@/config/index';

export async function getServerSideProps() {
	try {
		// Fetch total/count
		// const totalRes = await fetch(`${API_URL}/readings/count`);

		// const total = await totalRes.json();

		// Fetch exercises
		const courseRes = await fetch(`${API_URL}/courses`);
		const courses = await courseRes.json();

		return {
			props: { courses }
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}

export default function CourseIndexPage({ courses }) {
	// pagination
	return (
		<Layout title='線上課程 | a-station'>
			<Container className='mt-5 tex-center'>
				<h5>
					如想成為VIP Plus學生，可以
					<a
						href='https://wa.me/85263520220/?text=我想成為VIP%20Plus學生'
						target='_blank'
					>
						按此
					</a>
					聯絡我或者點擊
					<a
						href='https://forms.gle/G1HSjCxamVvgbQaZ7'
						target='_blank'
					>
						連結
					</a>
					去申請
				</h5>
				{courses.map((course) => (
					<CourseCard course={course} key={course.id} />
				))}
			</Container>
		</Layout>
	);
}
