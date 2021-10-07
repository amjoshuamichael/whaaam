let context

export function setupContext() {
	const AudioContext = window.AudioContext || window.webkitAudioContext
	context = new AudioContext()
}

export default function getContext() {
	if (context === undefined) {
		setupContext()
	}
	
	return context;
}