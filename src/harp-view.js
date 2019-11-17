import insertAfter from './helpers/insertAfter';
import __ from './helpers/translate';
import tuneValid from './helpers/tuneValid';
import Controller from "./controller";

window.HarpView = function(selector) {
  document.querySelectorAll('.' + selector).forEach(node => {
    const tune = node.innerHTML.trim();

    if (!tuneValid(tune)) {
      console.error(__('error.bad-tune'), node);

      return;
    }

    insertAfter(new Controller({tune}), node);
  });
};
