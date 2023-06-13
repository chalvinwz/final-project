import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const commaSign = new GestureDescription(', ')

// Thumb
commaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl)
commaSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0)
commaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9)
commaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	commaSign.addCurl(finger, FingerCurl.FullCurl, 1.0)
	commaSign.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}
