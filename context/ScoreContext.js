import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
	// State
	// State for Timer
	const [startingTime, setStartingTime] = useState(0);
	// Timer State
	const [finishingTime, setFinishingTime] = useState();

	const [scoringData, setScoringData] = useState();

	// Router
	const router = useRouter();

	return (
		<ScoreContext.Provider
			value={{
				startingTime,
				setStartingTime,
				setFinishingTime,
				scoringData,
				setScoringData,
				finishingTime
			}}
		>
			{children}
		</ScoreContext.Provider>
	);
};

export default ScoreContext;
