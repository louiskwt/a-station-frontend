import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AnswerPanel({ questions }) {
	const questionData = questions.questions;
	const instruction = questions.instruction;
	return (
		<div className='mt-4 col-10 offset-1'>
			<Form>
				<h5>{instruction}</h5>
				{questionData.map((data, index) => (
					<Form.Group key={data.question}>
						<Form.Label>
							Q{index + 1}: {data.question}
						</Form.Label>
						<br />
						{data.options.map((option) => (
							<Form.Check
								inline
								name={option}
								type='radio'
								label={option}
								key={option}
							/>
						))}
					</Form.Group>
				))}

				<Button variant='success' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
}
