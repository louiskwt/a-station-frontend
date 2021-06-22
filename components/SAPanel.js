import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SAPanel({ questions }) {
	const questionData = questions.questions[0];
	console.log(questionData.options);

	return (
		<div className='mt-4 col-10 offset-1'>
			<Form>
				<h5>{questionData.instruction}</h5>
				<br />
				<br />
				{questionData.options.map((option, index) => (
					<Form.Group as={Row}>
						<Form.Label column sm='6'>
							Q{index + 1}: {option}
						</Form.Label>
						<Col sm='6'>
							<Form.Control
								type='text'
								placeholder='Write your answer here'
							/>
						</Col>
					</Form.Group>
				))}

				<Button variant='success' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
}
