import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const aSign = new GestureDescription('a')

//Thumb
aSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
aSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)
aSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7)

//Index
aSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1)
aSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7)
// aSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70)

//Middle
aSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1)
aSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7)
// aSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.70)

//Ring
aSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1)
aSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7)

//Pinky
aSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1)
aSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7)
