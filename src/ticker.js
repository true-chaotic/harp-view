const second = 1000;
const minute = second * 60;
import noop from "./helpers/noop";

export default function Ticker({
  ticksPerMinute = 60,
  onTick = noop
} = {}) {
  let tpm = ticksPerMinute;
  let interval;

  function stop() {
    clearInterval(interval);

    interval = null;
  }

  function start() {
    stop();

    interval = setInterval(onTick, minute / tpm);
  }

  function update({ticksPerMinute}) {
    tpm = ticksPerMinute;

    if (interval) {
      start();
    }
  }

  return {
    start,
    stop,
    update
  }
}
