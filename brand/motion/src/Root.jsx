import { Composition } from 'remotion';
import { WebsiteLaunch } from './compositions/WebsiteLaunch.jsx';
import { Printestimation } from './compositions/Printestimation.jsx';
import { BrandInABox } from './compositions/BrandInABox.jsx';

export const Root = () => (
  <>
    <Composition
      id="WebsiteLaunch"
      component={WebsiteLaunch}
      durationInFrames={270}
      fps={30}
      width={1080}
      height={1080}
    />
    <Composition
      id="Printestimation"
      component={Printestimation}
      durationInFrames={270}
      fps={30}
      width={1080}
      height={1080}
    />
    <Composition
      id="BrandInABox"
      component={BrandInABox}
      durationInFrames={270}
      fps={30}
      width={1080}
      height={1080}
    />
  </>
);
