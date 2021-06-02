import {Composition} from 'remotion';
import {Main} from './Main';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={Main}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
