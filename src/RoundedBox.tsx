import * as React from 'react';
import {ExtrudeBufferGeometry, Mesh, Shape} from 'three';

const eps = 0.00001;

export function createShape(width: number, height: number, radius0: number) {
	const shape = new Shape();
	const radius = radius0 - eps;
	shape.absarc(eps + radius, eps + radius, eps, -Math.PI / 2, -Math.PI, true);
	shape.absarc(eps + radius, height - radius, eps, Math.PI, Math.PI / 2, true);
	shape.absarc(width - radius, height - radius, eps, Math.PI / 2, 0, true);
	shape.absarc(width - radius, eps + radius, eps, 0, -Math.PI / 2, true);
	return shape;
}

type NamedArrayTuple<T extends (...args: any) => any> = Parameters<T>;

type Props = {
	args?: NamedArrayTuple<
		(width?: number, height?: number, depth?: number) => void
	>;
	radius: number;
	smoothness?: number;
	depth: number;
} & Omit<JSX.IntrinsicElements['mesh'], 'args'>;

export const RoundedBox = React.forwardRef<Mesh, Props>(function RoundedBox(
	{
		args: [width = 1, height = 1] = [],
		radius,
		smoothness = 4,
		children,
		depth,
		...rest
	},
	ref
) {
	const shape = React.useMemo(
		() => createShape(width, height, radius),
		[width, height, radius]
	);
	const params = React.useMemo(
		() => ({
			depth: depth / 2,
			bevelEnabled: true,
			bevelSegments: 0,
			steps: 1,
			bevelSize: radius - eps,
			bevelThickness: 0,
			curveSegments: smoothness,
		}),
		[radius, smoothness, depth]
	);
	const geomRef = React.useRef<ExtrudeBufferGeometry>();

	return (
		<mesh ref={ref} {...rest}>
			<extrudeBufferGeometry
				ref={geomRef}
				attach="geometry"
				args={[shape, params]}
			/>
			{children}
		</mesh>
	);
});
