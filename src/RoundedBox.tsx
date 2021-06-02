import * as React from 'react';
import {ExtrudeBufferGeometry, Mesh} from 'three';
import {roundedRect} from './helpers/rounded-rectangle';

type Props = {
	args: number[];
	radius: number;
	smoothness: number;
	depth: number;
} & Omit<JSX.IntrinsicElements['mesh'], 'args'>;

export const RoundedBox = React.forwardRef<Mesh, Props>(function RoundedBox(
	{args, radius, smoothness, children, depth, ...rest},
	ref
) {
	const shape = React.useMemo(
		() => roundedRect({x: 0, y: 0, width: args[0], height: args[1], radius}),
		[args, radius]
	);
	const params = React.useMemo(
		() => ({
			depth,
			bevelEnabled: true,
			bevelSegments: 0,
			steps: 1,
			bevelSize: 0,
			bevelThickness: 0,
			curveSegments: smoothness,
		}),
		[smoothness, depth]
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
