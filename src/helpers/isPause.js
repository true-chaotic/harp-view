const PAUSES = new Set(['x', 'z']);

const isPause = note => PAUSES.has(note);

export default isPause;
