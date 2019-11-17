const second = 1000;
const minute = second * 60;
import noop from "./helpers/noop";

export default function Ticker({
  ticksPerMinute = 60,
  onTick = noop
} = {}) {
  let interval;

  function stop() {
    clearInterval(interval);
  }

  function start() {
    stop();

    interval = setInterval(onTick, minute / ticksPerMinute);
  }

  return {
    start,
    stop
  }
}
