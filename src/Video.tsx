import {Composition} from 'remotion';
import phone from './assets/phone.mp4';
import tablet from './assets/tablet.mp4';
import {Scene} from './Scene';

// Welcome to the Remotion Three Starter Kit!
// Two compositions have been created, showing how to use
// the `ThreeCanvas` component and the `useVideoTexture` hook.

// You can play around with the example or delete everything inside the canvas.

// Remotion Docs:
// https://remotion.dev/docs

// @remotion/three Docs:
// https://remotion.dev/docs/three

// React Three Fiber Docs:
// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Phone"
				component={Scene}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					videoSrc: phone,
					baseScale: 1,
				}}
			/>
			<Composition
				id="Tablet"
				component={Scene}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					videoSrc: tablet,
					baseScale: 1.8,
				}}
			/>
		</>
	);
};
