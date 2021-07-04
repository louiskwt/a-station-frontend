// Shuffling the MC options with Fisher-Yates (aka Kunth) Shuffle
export function shuffleArray(arr) {
	let currentIndex = arr.length,
		randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element within the range of the arr
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// Swap it with the current element
		[arr[currentIndex], arr[randomIndex]] = [
			arr[randomIndex],
			arr[currentIndex]
		];
	}
	return arr;
}
