import {useThree, Vector3} from '@react-three/fiber';
import React, {useEffect, useMemo} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {VideoTexture} from 'three';
import {roundedRect} from './rounded-rectangle';
import {RoundedBox} from './RoundedBox';

const RADIUS = 1;
const Z_FLICKER_PREVENTION = 0.001;

const PHONE_HEIGHT = 2;
const PHONE_WIDTH = 1;
const PHONE_THICKNESS = 0.3;
const PHONE_BEVEL = 0.04;

const PHONE_COLOR = 0x41a7f5;
const SCREEN_WIDTH = PHONE_WIDTH - PHONE_BEVEL * 2;
const SCREEN_HEIGHT = PHONE_HEIGHT - PHONE_BEVEL * 2;

const SCREEN_RADIUS = 0.07;
const PHONE_RADIUS = SCREEN_RADIUS + (PHONE_WIDTH - SCREEN_WIDTH) / 2;

const SCREEN_POSITION = [
	-SCREEN_WIDTH / 2,
	-SCREEN_HEIGHT / 2,
	PHONE_THICKNESS / 2 + Z_FLICKER_PREVENTION,
] as Vector3;

const SCREEN_SCALE = [SCREEN_WIDTH, SCREEN_HEIGHT, 1] as Vector3;

export const Mesh: React.FC<{
	videoTexture: VideoTexture | null;
}> = ({videoTexture}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const camera = useThree((state) => state.camera);

	const constantRotation = interpolate(
		frame,
		[0, durationInFrames],
		[0, Math.PI * 4]
	);

	const entranceAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
			mass: 3,
		},
	});

	useEffect(() => {
		camera.position.set(0, 0, RADIUS * 2.5);
		camera.near = 0.2;
		camera.far = Math.max(5000, RADIUS * 4);
		camera.lookAt(0, 0, 0);
	}, [camera]);

	const entranceRotation = interpolate(
		entranceAnimation,
		[0, 1],
		[0, Math.PI * 2]
	);

	const rotateY = entranceRotation + constantRotation;

	const translateY = interpolate(entranceAnimation, [0, 1], [-4, 0]);

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
