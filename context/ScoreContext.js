import { createContext, useState, useEffect } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
	// State
	const [startingTime, setStartingTime] = useState(0);

	const [finishingTime, setFinishingTime] = useState();

	const [scoringData, setScoringData] = useState([]);

	const [title, setTitle] = useState('');

	const [type, setType] = useState('');

	const [record, setRecord] = useState({});

	const recordScore = (totalPoint, total, time, title) => {
		const date = Date.now();
		setRecord({
			title,
			score: totalPoint,
			time,
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
