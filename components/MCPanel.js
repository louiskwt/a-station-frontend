import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Score from './Score';

export default function AnswerPanel({ questions, answers }) {
	// Spinner state
	const [loading, setLoading] = useState(false);

	// react hooks
	const [attempt, setAttempt] = useState(false);
	const [answered, setAnswered] = useState(false);
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

			const optionLength = optionArr.length;
			setAnswered(false);

			for (let j = 0; j < optionLength; j++) {
				if (optionArr[j].checked === true) {
					scoringArr.push({
						response: optionArr[j].id,
						answer: ans[i]
					});
					setAnswered(true);
				}
			}
		}

		setScoringData(scoringArr);

		if (scoringArr.length < total) {
			toast.error('請先回答所有問題', {
				position: 'top-center'
			});
			return;
		}
		btnEl.current.blur();
		btnEl.current.disabled = 'true';

		setAttempt(true);
	};

	const handleClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	return (
		<div className='mt-4 col-10 offset-1'>
			<ToastContainer />
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

				<Button
					variant='success'
					type='submit'
					ref={btnEl}
					onClick={handleClick}
				>
					{loading ? (
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
							variant='light'
						/>
					) : (
						'Submit'
					)}
				</Button>
				{attempt ? <Score scoringData={scoringData} /> : ''}
			</Form>
		</div>
	);
}
