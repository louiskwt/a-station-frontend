import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Score from './Score';

export default function SAPanel({ questions, answers, startingTime }) {
	// Timer states
	const [finishingTime, setFinishingTime] = useState();

	// React States for scoring
	const [attempt, setAttempt] = useState(false);
	const [scoringData, setScoringData] = useState([]);
	// Spinner State
	const [loading, setLoading] = useState(false);

	const btnEl = useRef(null);
	// Ex variables
	const ans = answers.answers;
	const questionData = questions.questions[0];
	const scoringArr = [];

	const handleSubmit = (e) => {
		e.preventDefault();
		// Getting the input values
		const totalQuestion = questionData.options.length;

		for (let i = 0; i < totalQuestion; i++) {
			const input = `e.target.q${i + 1}.value`;
			input = eval(input);
			if (input === '') {
				toast.error('請先回答所有問題', {
					position: 'top-center'
				});
				setLoading(false);
				return;
			}
			scoringArr.push({ response: input, answer: ans[i] });
		}

		setScoringData(scoringArr);
		let t = Date.now();
		t = t - startingTime;
		setFinishingTime(t);
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
				<h5>{questionData.instruction}</h5>
				<br />
				<br />
				{questionData.options.map((option, index) => (
					<Form.Group as={Row} key={option}>
						<Form.Label column sm='6'>
							Q{index + 1}: {option}
						</Form.Label>
						<Col sm='6'>
							<Form.Control
								name={`q${index + 1}`}
								type='text'
								placeholder='Write your answer here'
							/>
						</Col>
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

				{attempt && (
					<Score
						scoringData={scoringData}
						finishingTime={finishingTime}
					/>
				)}
			</Form>
		</div>
	);
}
