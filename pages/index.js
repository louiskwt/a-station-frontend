import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_URL } from '@/config/index';
import ExerciseCard from '@/components/ExerciseCard';

// Fetching data
export async function getServerSideProps() {
	const [readingsRes, writingsRes] = await Promise.all([
		fetch(`${API_URL}/readings?_sort=date:ASC`),
		fetch(`${API_URL}/writings?_sort=date:ASC`)
	]);
	const [readings, writings] = await Promise.all([
		readingsRes.json(),
		writingsRes.json()
	]);

	return {
		props: { readings, writings }
	};
}

export default function HomePage({ readings, writings }) {
	return (
		<Layout>
			<h2 className='mt-5'>最新Reading練習</h2>
			{readings.length === 0 && (
				<h3>Oh! No reading exercise for today. You can take a break</h3>
			)}
			{readings.map((exercise) => (
				<ExerciseCard exercise={exercise} key={exercise.id} />
			))}
			<hr />
			<h2>最新Writing練習</h2>
			{writings.length === 0 && (
				<h3>Oh! No writing exercise for today. You can take a break</h3>
			)}
			{writings.map((exercise) => (
				<ExerciseCard exercise={exercise} key={exercise.id} />
			))}

			<hr />
			{/* About Section */}
			<Container>
				<h2>關於本站</h2>
				<Row>
					<Col md={4} className='px-4 py-3'>
						<h3>線上英文練習</h3>
						<p>
							一個為學生而設的線上英文練習網站。目前平台仍在起步階段，所有練習會免費開放，而且會持續加入更多練習，如果你想支持這個平台的發展同埋保持免費開放的狀態，可以考慮成為我的Pateron
						</p>
					</Col>
					<Col md={4} className='px-4 py-3'>
						<h3>針對性練習</h3>
						<p>
							現時本站提供Reading 同
							Writing嘅練習。所有練習都是集中針對某一項題型，讓你可以專注去改善你的弱點同強化你專長的題型。更多新的練習仍然在開發，日後會加入更多練習，敬請期待
						</p>
					</Col>
					<Col md={4} className='px-4 py-3'>
						<h3>記錄學習進度</h3>
						<p>
							只要你登記做會員，就可以記錄你已完成的練習同分數，讓你可以知到自己的學習進度和情況，幫你更有系統地去安排你的學習。註冊成為會員是免費的，你只需要提供電郵即可註冊，過程只需大約3分鐘
						</p>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
