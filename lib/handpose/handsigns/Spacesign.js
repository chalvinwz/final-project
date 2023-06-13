import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const spaceSign = new GestureDescription(' ')

for (let finger of [
	Finger.Thumb,
	Finger.Index,
	Finger.Middle,
	Finger.Ring,
	Finger.Pinky,
]) {
	spaceSign.addCurl(finger, FingerCurl.NoCurl, 1.0)
}
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	spaceSign.addDirection(finger, FingerDirection.VerticalUp, 0.95)
	spaceSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.2)
	spaceSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.2)
}

// Thumb
spaceSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5)
spaceSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5)
