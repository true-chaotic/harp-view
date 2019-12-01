import Viewer from "./viewer";
import Player from './player';
import Ticker from './ticker';
import ControllerView from "./controller-view";
import isPause from './helpers/isPause';

export default function Controller({tune}) {
  let tick = -1;
  let tuneIndex = -1;

  const tuneArray = tune.split('');
  const ticksPerSnap = 4;
  const ticksPerNote = 2;

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
    ticksPerMinute: 60 * 4,
    onTick
  });

  controllerView = new ControllerView({
    viewerElement: viewer.$el,

    onPlay() {
      controllerView.update({playing: true});

      ticker.start();
    },
    onStop: stop
  });

  return controllerView.$el;
}
