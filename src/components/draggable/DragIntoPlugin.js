import { Sortable } from '@/common/sortable';

const { toggleClass } = Sortable.utils;

function throttle(fn, ms) {
  let timer = null;
  return function delay(...args) {
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
        sortable, putSortable, target, parentEl,
        dragEl, changed, completed, cancel,
        oldIndex, newIndex,
      } = evt;
      const { options, el } = sortable;
      if (!options.dragInto) return;

      const toSortable = putSortable || sortable;

      if (target && target !== el) {
        const prevDragIntoEl = lastDragIntoEl;
        if (typeof options.beforeDragInto === 'function' && options.beforeDragInto({
          sortable: this,
          name: 'dragInto',
          from: parentEl,
          to: toSortable.el,
          dragged: dragEl,
          related: target,
          originalEvent: evt,
          oldIndex,
          newIndex,
        })) {
          toggleClass(target, options.dragIntoClass, true);
          lastDragIntoEl = target;
          delay(() => {
            lastDragIntoEl = null;
            toggleClass(target, options.dragIntoClass, false);
          });

          changed();
          completed(true);
          cancel();
        }

        if (prevDragIntoEl && prevDragIntoEl !== lastDragIntoEl) {
          toggleClass(prevDragIntoEl, options.dragIntoClass, false);
        }
      }
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
        && options.beforeDragInto({
          sortable: this,
          name: 'dragInto',
          from: activeSortable.el,
          to: toSortable.el,
          dragged: dragEl,
          related: lastDragIntoEl,
          originalEvent: evt,
          oldIndex,
          newIndex,
        })
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
