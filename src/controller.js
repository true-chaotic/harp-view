import Viewer from "./viewer";
import Player from './player';
import Ticker from './ticker';
import __ from "./helpers/translate";
import noop from "./helpers/noop";
import createElement from "./helpers/createElement";

const PAUSES = {
  x: true,
  z: true
};

const isPause = note => Boolean(PAUSES[note]);

function ControllerView({
  onPlay = noop,
  onStop = noop,
  viewerElement,
  block = 'harp-view'} = {}
) {
  const state = {
    playing: false
  };

  const view = createElement('div', block);
  const playButton = createElement('button', `${block}__play`, {
    click: function() {
      if (!state.playing) {
        onPlay();
      } else {
        onStop();
      }
    }
  });

  function updateButton() {
    playButton.innerText = __(!state.playing ? 'play' : 'stop');
  }

  updateButton();

  view.appendChild(playButton);

  const viewerContainer = createElement('div', `${block}__viewer`);
  viewerContainer.appendChild(viewerElement);
  view.appendChild(viewerContainer);

  function update({playing = state.playing}) {
    state.playing = playing;

    updateButton();
  }

  return {
    $el: view,
    update
  }
}

export default function Controller({tune}) {
  let waitTick = 2;
  let tick = 0;

  let snapTick = 2;
  const waitSnapTick = 4;

  let tuneIndex = -1;

  const tuneArray = tune.split('');

  const viewer = new Viewer();
  const player = new Player();

  function playAndShow(index) {
    const note = tuneArray[tuneIndex];

    viewer.dimAll();

    if (isPause(note)) {
      return;
    }

    player.playNote(note);
    viewer.highLight(note);
  }

  let ticker;
  let controllerView;

  function stop() {
    tuneIndex = -1;

    ticker.stop();

    controllerView.update({playing: false});

    viewer.dimAll();
  }

  ticker = new Ticker({
    ticksPerMinute: 60 * 4,

    onTick() {
      tick += 1;
      snapTick += 1;

      if (snapTick === waitSnapTick) {
        snapTick = 0;

        player.playSnap();
      }

      if (tick === waitTick) {
        tick = 0;

        tuneIndex += 1;

        if (tuneIndex === tuneArray.length) {
          stop();

          return;
        }

        playAndShow(tuneIndex);
      }
    }
  });

  controllerView = new ControllerView({
    viewerElement: viewer.$el,

    onPlay() {
      controllerView.update({playing: true});

      ticker.start();
    },
    onStop() {
      controllerView.update({playing: false});

      ticker.stop();
    }
  });

  return controllerView.$el;
}
