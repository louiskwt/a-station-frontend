import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AnswerPanel({ questions }) {
	const questionData = questions.questions;
	const instruction = questions.instruction;

	const handleSubmit = (e) => {
		e.preventDefault();
		const total = questions.questions.length;

		const responseArr = [];
		// Getting the selected options from users
		for (let i = 0; i < total; i++) {
			const target = `e.target.q${i + 1}`;
			target = eval(target);
			const optionArr = Array.from(target);
			for (let j = 0; j < optionArr.length; j++) {
				if (optionArr[j].checked === true) {
					responseArr.push(optionArr[j].id);
				}
			}
		}
		console.log(responseArr);
	};
	return (
		<div className='mt-4 col-10 offset-1'>
			<Form onSubmit={handleSubmit}>
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
								name={`q${index + 1}`}
								type='radio'
								label={option}
								key={option}
								id={option}
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
