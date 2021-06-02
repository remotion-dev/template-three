import {Shape} from 'three';

export function roundedRect({
	x,
	y,
	width,
	height,
	radius,
}: {
	x: number;
	y: number;
	width: number;
	height: number;
	radius: number;
}): Shape {
	const roundedRectShape = new Shape();
	roundedRectShape.moveTo(x, y + radius);
	roundedRectShape.lineTo(x, y + height - radius);
	roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
	roundedRectShape.lineTo(x + width - radius, y + height);
	roundedRectShape.quadraticCurveTo(
		x + width,
		y + height,
		x + width,
		y + height - radius
	);
	roundedRectShape.lineTo(x + width, y + radius);
	roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
	roundedRectShape.lineTo(x + radius, y);
	roundedRectShape.quadraticCurveTo(x, y, x, y + radius);
	return roundedRectShape;
}
