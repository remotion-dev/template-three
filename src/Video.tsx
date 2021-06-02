import {Composition} from 'remotion';
import {Scene} from './Main';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Scene"
				component={Scene}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
