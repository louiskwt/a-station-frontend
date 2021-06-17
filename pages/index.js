import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function HomePage() {
	return (
		<Layout>
			<h2>最新練習</h2>
			<p>Will be replaced by a component</p>
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