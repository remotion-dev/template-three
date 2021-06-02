import {Environment} from '@react-three/drei';
import {ThreeCanvas, useVideoTexture} from '@remotion/three';
import React, {useRef} from 'react';
import {AbsoluteFill, useVideoConfig, Video} from 'remotion';
import {Phone} from './Phone';
import src from './vid.mp4';

const container: React.CSSProperties = {
	backgroundColor: 'white',
};

const videoStyle: React.CSSProperties = {
	position: 'absolute',
	opacity: 0,
};

export const Scene: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const {width, height} = useVideoConfig();

	const texture = useVideoTexture(videoRef);
	return (
		<AbsoluteFill style={container}>
			<Video ref={videoRef} src={src} style={videoStyle} />
			<ThreeCanvas width={width} height={height}>
				<Environment preset="city" />
				<ambientLight intensity={1.5} color={0xffffff} />
				<pointLight position={[10, 10, 0]} />
				<Phone videoTexture={texture} />
			</ThreeCanvas>
		</AbsoluteFill>
	);
};
