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

export default function CoursesPage({ courses }) {
	// pagination
	console.log(courses);
	return (
		<Layout title='線上課程 | a-station'>
			<Container className='mt-5'>
				{courses.map((course) => (
					<CourseCard
						course={course}
						key={course.id}
						className='w-100'
					/>
				))}
			</Container>
		</Layout>
	);
}
