import noop from "./helpers/noop";
import createElement from "./helpers/createElement";
import __ from "./helpers/translate";

export default function ControllerView({
  onPlay = noop,
  onStop = noop,
  viewerElement,
  block = 'harp-view'
} = {}) {
  const state = {
    playing: false
  };

  const $el = createElement('div', block);
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

  $el.appendChild(playButton);

  const viewerContainer = createElement('div', `${block}__viewer`);
  viewerContainer.appendChild(viewerElement);
  $el.appendChild(viewerContainer);

  function update({playing = state.playing}) {
    state.playing = playing;

    updateButton();
  }

  return {
    $el,
    update
  }
}
