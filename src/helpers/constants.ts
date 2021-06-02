import {Vector3} from '@react-three/fiber';

export const RADIUS = 1;
export const Z_FLICKER_PREVENTION = 0.001;

export const PHONE_HEIGHT = 2;
export const PHONE_WIDTH = 1;
export const PHONE_THICKNESS = 0.15;
export const PHONE_BEVEL = 0.04;
export const PHONE_SHININESS = 30;
export const PHONE_CURVE_SEGMENTS = 4;

export const PHONE_COLOR = 0x41a7f5;
export const SCREEN_WIDTH = PHONE_WIDTH - PHONE_BEVEL * 2;
export const SCREEN_HEIGHT = PHONE_HEIGHT - PHONE_BEVEL * 2;

export const SCREEN_RADIUS = 0.07;
export const PHONE_RADIUS = SCREEN_RADIUS + (PHONE_WIDTH - SCREEN_WIDTH) / 2;

export const PHONE_POSITION = [
	-PHONE_WIDTH / 2,
	-PHONE_HEIGHT / 2,
	0,
] as Vector3;

export const SCREEN_POSITION = [
	-SCREEN_WIDTH / 2,
	-SCREEN_HEIGHT / 2,
	PHONE_THICKNESS + Z_FLICKER_PREVENTION,
] as Vector3;
