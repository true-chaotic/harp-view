import Viewer from './viewer';
import Player from './player';
import Ticker from './ticker';
import ControllerView from "./controller-view";
import isPause from './helpers/isPause';

export default function Controller({tune}) {
  let tick = -1;
  let tuneIndex = -1;
  let ticksPerMinute = 60 * 4;

  const ticksPerMinuteSteps = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4]
    .map(multiplier => Math.round(ticksPerMinute * multiplier));

  let currentTicksStep = ticksPerMinuteSteps.findIndex(tpm => tpm === ticksPerMinute);

  const tuneArray = tune.split('');
  const ticksPerSnap = 4;
  const ticksPerNote = 2;
  const highLightTicks = 1;

  const viewer = new Viewer();
  const player = new Player();

  const playAndShow = () => {
    const note = tuneArray[tuneIndex];

    viewer.dimAll();

    if (isPause(note)) {
      return;
    }

    player.playNote(note);
    viewer.highLight(note);
  };

  let ticker;
  let controllerView;

  const stop = () => {
    tick = -1;
    tuneIndex = -1;

    controllerView.update({playing: false});
    ticker.stop();
    viewer.dimAll();
  };

  const onTick = () => {
    tick += 1;

    if (tick % ticksPerNote === highLightTicks) {
      viewer.dimAll();
    }

    if (tick % ticksPerNote === 0) {
      tuneIndex += 1;

      if (tuneIndex === tuneArray.length) {
        return stop();
      }

      playAndShow();
    }

    if (tick % ticksPerSnap === 0) {
      player.playSnap();
    }
  };

  ticker = new Ticker({
    ticksPerMinute,
    onTick
  });

  const speedStep = (increment) => {
    currentTicksStep = Math.max(0, Math.min((currentTicksStep + increment), ticksPerMinuteSteps.length - 1));

    ticksPerMinute = ticksPerMinuteSteps[currentTicksStep];

    ticker.update({ticksPerMinute});
    controllerView.update({bpm: ticksPerMinute / ticksPerSnap});
  };

  controllerView = new ControllerView({
    viewerElement: viewer.$el,

    bpm: ticksPerMinute / ticksPerSnap,

    onClickFaster() {
      speedStep(+1);
    },

    onClickSlower() {
      speedStep(-1);
    },

    onPlay() {
      controllerView.update({playing: true});

      ticker.start();
    },
    onStop: stop
  });

  return controllerView.$el;
}
