import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import Score from './Score';
import { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { shuffleArray } from '@/helper/shuffle';
import { useRouter } from 'next/router';
import ScoreContext from '@/context/ScoreContext';

export default function AnswerPanel({ questions, answers, startingTime }) {
	const router = useRouter();

	const { setFinishingTime, setScoringData } = useContext(ScoreContext);
	// Spinner state
	const [loading, setLoading] = useState(false);

	// react state for exercise
	const btnEl = useRef(null);

	// exercise variable
	const ans = answers.answers;
	const instruction = questions.instruction;
	const [questionArr, setQuestionArr] = useState(null);

	useEffect(() => {
		let arr = [];
		questions.questions.map((question) => {
			let questionObj = {
				question: question.question
			};
			const shuffledOpt = shuffleArray(question.options);
			questionObj.options = shuffledOpt;
			arr.push(questionObj);
		});
		setQuestionArr(arr);
	}, []);

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

			for (let j = 0; j < optionLength; j++) {
				if (optionArr[j].checked === true) {
					scoringArr.push({
						response: optionArr[j].id,
						answer: ans[i]
					});
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

		// Handling time spent
		let t = Date.now() - startingTime;
		setFinishingTime(t);

		router.push('/score');
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
				{questionArr &&
					questionArr.map((data, index) => (
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
			</Form>
		</div>
	);
}
