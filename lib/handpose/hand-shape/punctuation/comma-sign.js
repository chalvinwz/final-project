import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from 'fingerpose'

export const commaSign = new GestureDescription(', ')

// Thumb
commaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
commaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25)
commaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25)

// Index
commaSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
commaSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.25)
commaSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.25)

// Middle
commaSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
commaSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.25)

// Ring
commaSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75)
commaSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.25)

// Pinky
commaSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
commaSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25)
