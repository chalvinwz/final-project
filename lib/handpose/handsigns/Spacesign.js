import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const spaceSign = new GestureDescription(' ')

// Thumb
spaceSign.addCurl(Finger.Thumb, FingerCurl.NoCurl)
spaceSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0)
spaceSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9)
spaceSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	spaceSign.addCurl(finger, FingerCurl.FullCurl, 1.0)
	spaceSign.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}
