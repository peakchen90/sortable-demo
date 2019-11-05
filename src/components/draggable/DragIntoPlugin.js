import Sortable from 'sortablejs';

const { toggleClass } = Sortable.utils;

function throttle(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, ms);
  };
}

function dispatchEvent(evt) {
  const { sortable, name } = evt;
  const eventName = `on${name.charAt(0).toUpperCase()}${name.substr(1)}`;
  if (sortable.options[eventName]) {
    return sortable.options[eventName].call(sortable, evt);
  }
}

let lastDragIntoEl = null;
const delay = throttle(fn => fn(), 60);

function DragIntoPlugin() {
  function DragInto() {
    this.defaults = {
      dragIntoClass: 'sortable-drag-into-highlight',
      beforeDragInto: () => false,
    };
  }

  DragInto.prototype = {
    dragStart(evt) {
      lastDragIntoEl = evt.dragEl;
    },
    dragOverValid(evt) {
      const {
        sortable, target, changed, completed, cancel,
      } = evt;
      const { options, el } = sortable;
      if (!options.dragInto) return;

      if (target && target !== el) {
        const prevDragIntoEl = lastDragIntoEl;
        if (typeof options.beforeDragInto === 'function' && options.beforeDragInto(evt)) {
          toggleClass(target, options.dragIntoClass, true);
          lastDragIntoEl = target;
          delay(() => {
            lastDragIntoEl = null;
            toggleClass(target, options.dragIntoClass, false);
          });
        }

        if (prevDragIntoEl && prevDragIntoEl !== lastDragIntoEl) {
          toggleClass(prevDragIntoEl, options.dragIntoClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop(evt) {
      const {
        activeSortable, putSortable, dragEl, oldIndex, newIndex,
      } = evt;
      const toSortable = putSortable || this.sortable;
      const options = toSortable.options;

      if (
        lastDragIntoEl
        && dragEl !== lastDragIntoEl
        && options.dragInto
        && typeof options.beforeDragInto === 'function'
        && options.beforeDragInto(evt)
      ) {
        const result = dispatchEvent({
          sortable: this,
          name: 'dragInto',
          from: activeSortable.el,
          to: toSortable.el,
          dragged: dragEl,
          related: lastDragIntoEl,
          originalEvent: evt,
          oldIndex,
          newIndex,
          oldIndicies: [],
          newIndicies: [],
        });
        if (result) {
          dragEl.parentNode.removeChild(dragEl);
        }
      }
    },
  };

  return Object.assign(DragInto, {
    pluginName: 'dragInto',
  });
}

export default DragIntoPlugin;