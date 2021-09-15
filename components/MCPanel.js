import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { shuffleArray } from '@/helper/shuffle';
import { useRouter } from 'next/router';
import { calculatingPoint, millisToMinAndSeconds } from '@/helper/scoring';
import ScoreContext from '@/context/ScoreContext';

export default function AnswerPanel({
	questions,
	answers,
	startingTime,
	slug
}) {
	const router = useRouter();

	const { setFinishingTime, setScoringData, setTitle, recordScore } =
		useContext(ScoreContext);

	// react state for exercise
	const btnEl = useRef(null);

	// exercise variable
	const ans = answers.answers;
	const instruction = questions.instruction;
	const [questionArr, setQuestionArr] = useState(null);

	useEffect(() => {
		let arr = [];
		const populateMC = (questionArr) => {
			if (!questionArr) {
				return;
			} else {
				questionArr.map((question) => {
					let questionObj = {
						question: question.question
					};
					const shuffledOpt = shuffleArray(question.options);
					questionObj.options = shuffledOpt;
					arr.push(questionObj);
				});
				setQuestionArr(arr);
			}
		};
		populateMC(questions.questions);

		return () => {
			populateMC();
		};
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
		setTitle(slug);

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
		const time = millisToMinAndSeconds(t);
		const totalPoint = calculatingPoint(scoringArr);

		recordScore(totalPoint, total, time, slug);

		router.push(`/score/${slug}`);
	};

	return (
		<div className='mt-4 col-10 offset-1'>
			<ToastContainer />
			<Form onSubmit={handleSubmit}>
				<h5 className='mb-4'>{instruction}</h5>
				{questionArr &&
					questionArr.map((data, index) => (
						<Form.Group key={data.question} className='mb-4'>
							<Form.Label className='mb-3'>
								Q{index + 1}: {data.question}
							</Form.Label>
							<br />
							{data.options.map((option) => (
								<Form.Check
									inline
									className='mb-3 mr-4'
									name={`q${index + 1}`}
									type='radio'
									label={option}
									key={option}
									id={option}
									style={{
										minWidth: '25px !important',
										display: 'block'
									}}
								/>
							))}
						</Form.Group>
					))}

				<br />
				<Button
					variant='success'
					className='mt-3 btn-lg btn-block'
					type='submit'
					ref={btnEl}
				>
					Submit
				</Button>
			</Form>
		</div>
	);
}
