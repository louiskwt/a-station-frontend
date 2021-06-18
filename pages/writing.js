import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '@/components/Filter';

export default function writing() {
	return (
		<Layout>
			<Container>
				<Row>
					<Col>
						<h2 className='mt-5'>寫作訓練</h2>
					</Col>
					<Col>
						<Filter />
					</Col>
				</Row>
				<hr></hr>
				<Row>
					<h3>Questions Card go here</h3>
				</Row>
			</Container>
		</Layout>
	);
}
