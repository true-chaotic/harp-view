import noop from "./helpers/noop";
import createElement from "./helpers/createElement";
import __ from "./helpers/translate";

export default function ControllerView({
  onPlay = noop,
  onStop = noop,
  onClickSlower = noop,
  onClickFaster = noop,
  viewerElement,
  block = 'harp-view',
  bpm
} = {}) {
  const state = {
    playing: false,
    bpm
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

  const controlSpeed = createElement('span', `${block}__control-speed`);
  Object.assign(controlSpeed.style, {
    display: 'inline-block',
    margin: '0 1em'
  });

  const slowerBtn = createElement('button', `${block}__speed-button`, {
    click: onClickSlower
  });
  slowerBtn.innerText = __('slower');

  const fasterBtn = createElement('button', `${block}__speed-button`, {
    click: onClickFaster
  });
  fasterBtn.innerText = __('faster');

  const bpmElement = createElement('span', `${block}__bpm`);
  Object.assign(bpmElement.style, {
    display: 'inline-block',
    margin: '0 0.5em'
  });

  function updateBpm() {
    bpmElement.innerText = state.bpm || '';
  }

  controlSpeed.appendChild(slowerBtn);
  controlSpeed.appendChild(bpmElement);
  controlSpeed.appendChild(fasterBtn);

  updateBpm();

  $el.appendChild(playButton);
  $el.appendChild(controlSpeed);

  const viewerContainer = createElement('div', `${block}__viewer`);
  Object.assign(viewerContainer.style, {
    maxWidth: '320px',
    margin: '0 auto'
  });

  viewerContainer.appendChild(viewerElement);
  $el.appendChild(viewerContainer);

  const updateElement = {
    playing: updateButton,
    bpm: updateBpm
  };

  function update(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (state[key] !== value) {
        state[key] = value;

        updateElement[key]();
      }
    });
  }

  return {
    $el,
    update
  }
}
