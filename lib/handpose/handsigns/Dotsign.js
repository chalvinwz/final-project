import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const dotSign = new GestureDescription('. ')

dotSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
dotSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
dotSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9)
dotSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	dotSign.addCurl(finger, FingerCurl.FullCurl, 1.0)
	dotSign.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}

dotSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)
dotSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
dotSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)
dotSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)
