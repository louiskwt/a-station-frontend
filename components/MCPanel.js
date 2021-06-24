import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import Score from './Score';

export default function AnswerPanel({ questions, answers }) {
	// react hooks
	const [attempt, setAttempt] = useState(false);
	const [scoringData, setScoringData] = useState([]);
	const btnEl = useRef(null);
	// exercise variable
	const ans = answers.answers;
	const questionData = questions.questions;
	const instruction = questions.instruction;

	const handleSubmit = (e) => {
		e.preventDefault();
		const total = questions.questions.length;
		const scoringArr = [];

		// Getting the selected options from users
		for (let i = 0; i < total; i++) {
			const target = `e.target.q${i + 1}`;
			target = eval(target);
			const optionArr = Array.from(target);

			for (let j = 0; j < optionArr.length; j++) {
				if (optionArr[j].checked === true) {
					scoringArr.push({
						response: optionArr[j].id,
						answer: ans[i]
					});
				}
			}
		}
		setScoringData(scoringArr);
		btnEl.current.blur();
		btnEl.current.disabled = 'true';

		setAttempt(true);
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
								required
							/>
						))}
					</Form.Group>
				))}

				<Button variant='success' type='submit' ref={btnEl}>
					Submit
				</Button>
				{attempt ? <Score scoringData={scoringData} /> : ''}
			</Form>
		</div>
	);
}
