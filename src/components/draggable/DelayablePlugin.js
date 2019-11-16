import { Sortable } from '@/common/sortable';
import { getRect } from '@/common/sortable/src/utils';

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

let lastDragIntoEl = null;
const delay = throttle(fn => fn(), 150);

/* eslint-disable */

let bar = null;

function highlightCreator() {
  if (bar) return bar;

  const bar = document.createElement('div');
  bar.style.position = 'absolute';
  bar.style.top = '-5px';
  bar.style.left = '-20px';
  bar.style.width = '5px';
  bar.style.height = '218px';
  bar.style.background = '#efb068';
  // bar.style.display = 'none';
  document.body.appendChild(bar);
  return bar;
}

function getPageRect(...arg) {
  const result = getRect(...arg);
  result.left += document.documentElement.scrollLeft;
  result.top += document.documentElement.scrollTop;
  return result;
}

function moveBar(rect, targetEl, putRight = false) {
  const { left, top, width } = rect || getPageRect(targetEl);
  const offsetX = putRight ? width + 20 * 2 : 0;
  bar.style.display = 'block';
  bar.style.transform = `translate(${left + offsetX}px, ${top}px)`;
}

function hideBar() {
  bar.style.display = 'none';
}

function DelayablePlugin() {
  function Delayable() {
    if (!bar) {
      bar = highlightCreator();
    }

    this.defaults = {
      dragIntoClass: 'sortable-delayable',
    };
  }

  Delayable.prototype = {
    dragStart(evt) {
      lastDragIntoEl = evt.dragEl;
    },
    dragOver(evt) {
      const {
        sortable, putSortable, target, parentEl,
        dragEl, changed, completed, cancel,
        oldIndex, newIndex, targetRect, originalEvent
      } = evt;
      cancel();
      console.log('dragOver:', evt);

      if (target === sortable.el) {
        if (target.children && target.children.length === 0) {
          moveBar(null, target);
        } else {
          let lastEl = target.children[target.children.length - 1];
          let lastRect = getPageRect(lastEl);
          if (
            originalEvent.pageX > lastRect.left &&
            originalEvent.pageY > lastRect.top &&
            originalEvent.pageY < lastRect.top + lastRect.height
          ) {
            moveBar(null, lastEl, true);
          } else {
            hideBar();
          }
        }
      } else {
        moveBar(null, target);
      }
    },
    dragOverValid(evt) {
      // console.log('dragOverValid:', evt);
      return;
      const {
        sortable, putSortable, target, parentEl,
        dragEl, changed, completed, cancel,
        oldIndex, newIndex, targetRect
      } = evt;

      let _rect = targetRect || getPageRect(target);
      console.log(_rect);


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
      hideBar();
      const {
        sortable, putSortable, dragEl, oldIndex, newIndex,
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
          from: sortable.el,
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
          from: sortable.el,
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

  return Object.assign(Delayable, {
    pluginName: 'delayable',
  });
}

export default DelayablePlugin;
