import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const dotSign = new GestureDescription('. ')

// Thumb
dotSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
dotSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25)
dotSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25)

// Index
dotSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
dotSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.25)
dotSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.25)

// Pinky
dotSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
dotSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25)

for (let finger of [Finger.Middle, Finger.Ring]) {
	dotSign.addCurl(finger, FingerCurl.FullCurl, 0.75)
	dotSign.addDirection(finger, FingerDirection.VerticalUp, 0.25)
}
