const fingerJoints = {
	thumb: [0, 1, 2, 3, 4],
	index: [0, 5, 6, 7, 8],
	mid: [0, 9, 10, 11, 12],
	ring: [0, 13, 14, 15, 16],
	pinky: [0, 17, 18, 19, 20],
}

export function drawHand(prediction, ctx) {
	if (prediction.length > 0) {
		prediction.forEach((prediction) => {
			const landmarks = prediction.landmarks

			for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
				let finger = Object.keys(fingerJoints)[j]

				for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
					const firstJointIndex = fingerJoints[finger][k]
					const secondJointIndex = fingerJoints[finger][k + 1]

					ctx.beginPath()

					ctx.moveTo(
						landmarks[firstJointIndex][0],
						landmarks[firstJointIndex][1]
					)

					ctx.lineTo(
						landmarks[secondJointIndex][0],
						landmarks[secondJointIndex][1]
					)

					ctx.strokeStyle = 'yellow'
					ctx.lineWidth = 2
					ctx.stroke()
				}
			}

			for (let i = 0; i < landmarks.length; i++) {
				const x = landmarks[i][0]

				const y = landmarks[i][1]

				ctx.beginPath()
				ctx.arc(x, y, 5, 0, 3 * Math.PI)

				ctx.fillStyle = 'black'
				ctx.fill()
			}
		})
	}
}
