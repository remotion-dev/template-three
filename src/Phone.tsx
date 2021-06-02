import {useThree} from '@react-three/fiber';
import React, {useEffect, useMemo} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {VideoTexture} from 'three';
import {
	PHONE_COLOR,
	PHONE_HEIGHT,
	PHONE_RADIUS,
	PHONE_THICKNESS,
	PHONE_WIDTH,
	RADIUS,
	SCREEN_POSITION,
	SCREEN_RADIUS,
	SCREEN_SCALE,
} from './helpers/constants';
import {roundedRect} from './helpers/rounded-rectangle';
import {RoundedBox} from './RoundedBox';

export const Phone: React.FC<{
	videoTexture: VideoTexture | null;
}> = ({videoTexture}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(0, 0, RADIUS * 2.5);
		camera.near = 0.2;
		camera.far = Math.max(5000, RADIUS * 4);
		camera.lookAt(0, 0, 0);
	}, [camera]);

	// During the whole scene, the phone is rotating.
	// 2 * Math.PI is a full rotation.
	const constantRotation = interpolate(
		frame,
		[0, durationInFrames],
		[0, Math.PI * 6]
	);

	// When the composition starts, there is some extra
	// rotation and translation.
	const entranceAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
			mass: 3,
		},
	});

	// Calculate the entrance rotation,
	// doing one full spin
	const entranceRotation = interpolate(
		entranceAnimation,
		[0, 1],
		[Math.PI * 2, 0]
	);

	// Calculating the total rotation of the phone
	const rotateY = entranceRotation + constantRotation;

	// Calculating the translation of the phone at the beginning.
	// The start position of the phone is set to 4 "units"
	const translateY = interpolate(entranceAnimation, [0, 1], [-4, 0]);

	// Calculate a rounded rectangle for the phone screen
	const screenGeometry = useMemo(() => {
		return roundedRect({
			x: 0,
			y: 0,
			width: 1,
			height: 1,
			radius: SCREEN_RADIUS,
		});
	}, []);

	return (
		<group
			scale={entranceAnimation}
			rotation={[0, rotateY, 0]}
			position={[0, translateY, 0]}
		>
			<mesh>
				<RoundedBox
					radius={PHONE_RADIUS}
					depth={PHONE_THICKNESS}
					smoothness={4}
					position={[-PHONE_WIDTH / 2, -PHONE_HEIGHT / 2, 0]}
					args={[PHONE_WIDTH, PHONE_HEIGHT, PHONE_THICKNESS]}
				>
					<meshPhongMaterial color={PHONE_COLOR} shininess={30} />
				</RoundedBox>
			</mesh>
			<mesh scale={SCREEN_SCALE} position={SCREEN_POSITION}>
				<shapeGeometry args={[screenGeometry]} />
				{videoTexture ? (
					<meshBasicMaterial transparent map={videoTexture} />
				) : null}
			</mesh>
		</group>
	);
};
