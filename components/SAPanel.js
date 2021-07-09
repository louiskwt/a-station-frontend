import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScoreContext from '@/context/ScoreContext';
import { useRouter } from 'next/router';
import { calculatingPoint, millisToMinAndSeconds } from '@/helper/scoring';

export default function SAPanel({ questions, answers, startingTime, slug }) {
	const router = useRouter();
	// Timer states
	const { setFinishingTime, setScoringData, setTitle, recordScore } =
		useContext(ScoreContext);

	const btnEl = useRef(null);
	// Ex variables
	const ans = answers.answers;
	const questionData = questions.questions[0];
	let scoringArr = [];

	const handleSubmit = (e) => {
		e.preventDefault();
		// Getting the input values
		const totalQuestion = questionData.options.length;

		for (let i = 0; i < totalQuestion; i++) {
			const input = `e.target.q${i + 1}.value`;
			input = eval(input);
			if (input === '') {
				scoringArr = [];
				toast.error('請先回答所有問題', {
					position: 'top-center'
				});
				return;
			}

			scoringArr.push({ response: input, answer: ans[i] });
		}

		setScoringData(scoringArr);
		const totalPoint = calculatingPoint(scoringArr);
		setTitle(slug);
		let t = Date.now();
		t = t - startingTime;
		setFinishingTime(t);

		const time = millisToMinAndSeconds(t);

		recordScore(totalPoint, totalQuestion, time, slug);

		btnEl.current.blur();
		btnEl.current.disabled = 'true';

		router.push(`/score`);
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

				<Button variant='success' type='submit' ref={btnEl}>
					Submit
				</Button>
			</Form>
		</div>
	);
}
