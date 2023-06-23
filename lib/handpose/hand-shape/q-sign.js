import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const qSign = new GestureDescription('q')

// Thumb
qSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
qSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5)
qSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5)

// Other Finger
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	qSign.addCurl(finger, FingerCurl.HalfCurl, 1.0)
	qSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25)
}
