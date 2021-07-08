import { createContext, useState, useEffect } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
	// State
	// State for Timer
	const [startingTime, setStartingTime] = useState(0);
	// Timer State
	const [finishingTime, setFinishingTime] = useState();

	const [scoringData, setScoringData] = useState([]);

	const [title, setTitle] = useState('');

	const [type, setType] = useState('');

	const [record, setRecord] = useState({});

	const recordScore = (totalPoint, total) => {
		const date = Date.now();
		setRecord({
			title,
			score: totalPoint,
			time: finishingTime,
			total,
			date
		});
	};

	return (
		<ScoreContext.Provider
			value={{
				startingTime,
				setStartingTime,
				setFinishingTime,
				scoringData,
				setScoringData,
				finishingTime,
				title,
				setTitle,
				type,
				setType,
				recordScore,
				record
			}}
		>
			{children}
		</ScoreContext.Provider>
	);
};

export default ScoreContext;
