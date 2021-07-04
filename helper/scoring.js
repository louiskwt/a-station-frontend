export function calculatingPoint(scoringData) {
	let point = 0;
	scoringData.map((data) => {
		if (data.answer.includes('/')) {
			const alterAnswer = data.answer.split('/');
			for (let i = 0; i < alterAnswer.length; i++) {
				if (data.response === alterAnswer[i]) {
					point += 1;
				}
			}
		} else {
			if (data.response === data.answer) {
				point += 1;
			}
		}
	});
	return point;
}

// Timer function
export function millisToMinAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);

	return `${minutes < 10 ? '0' : ''}${minutes} m : ${
		seconds < 10 ? '0' : ''
	}${seconds} s`;
}
