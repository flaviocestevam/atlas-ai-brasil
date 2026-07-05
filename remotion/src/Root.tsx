import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { ProphecyVideo } from "./ProphecyVideo";

export const RemotionRoot = () => (
  <>
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={780}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="prophecy"
      component={ProphecyVideo}
      durationInFrames={1410}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
