import {Composition} from 'remotion';
import phone from './assets/phone.mp4';
import tablet from './assets/tablet.mp4';
import {Scene} from './Scene';

// Welcome to the Remotion Three Starter Kit!
// Two compositions have been created, showing how to use
// the `ThreeCanvas` component and the `useVideoTexture` hook.

// You can play around with the example or delete everything inside the canvas.

// The device frame automatically adjusts to the video aspect ratio.
// Change the variable below to try out tablet mode:
type Device = 'phone' | 'tablet';
const deviceType: Device = 'phone';

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
				id="Scene"
				component={Scene}
				durationInFrames={300}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					videoSrc: deviceType === 'phone' ? phone : tablet,
					baseScale: deviceType === 'phone' ? 1 : 1.8,
				}}
			/>
		</>
	);
};
