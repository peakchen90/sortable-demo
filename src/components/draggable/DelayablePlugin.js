import { Sortable } from '@/common/sortable';
import { getRect } from '@/common/sortable/src/utils';
/* eslint-disable */
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

let lastDragOverEl = null;
const delay = throttle(fn => fn(), 150);


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
  bar.style.display = 'none';
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
      lastDragOverEl = evt.dragEl;
    },
    dragOver(evt) {
      const {
        activeSortable, sortable, putSortable, target, parentEl,
        dragEl, changed, completed, cancel,
        oldIndex, newIndex, targetRect, originalEvent
      } = evt;

      // console.log('dragOver:', evt);
      if (!sortable.options.delayable) return;

      function _completed() {
        lastDragOverEl = target;
        changed();
        completed(true);
      }

      if (target === sortable.el) {
        if (target.children && target.children.length === 0) {
          moveBar(null, target);
          _completed();
        } else {
          let lastEl = target.children[target.children.length - 1];
          let lastRect = getPageRect(lastEl);
          if (
            (
              originalEvent.pageX > lastRect.left &&
              originalEvent.pageY > lastRect.top &&
              originalEvent.pageY < lastRect.top + lastRect.height
            ) || (
              originalEvent.pageY > lastRect.top + lastRect.height
            )
          ) {
            moveBar(null, lastEl, true);
            _completed();
          } else {
            lastDragOverEl = null;
            hideBar();
          }
        }
      } else {
        moveBar(null, target);
        _completed();
      }

      cancel();
    },
    drop(evt) {
      const {
        activeSortable, sortable, putSortable, dragEl, oldIndex, newIndex,
      } = evt;

      if (!sortable.options.delayable) return;

      hideBar();

      if (!lastDragOverEl || dragEl === lastDragOverEl) return;

      const toSortable = putSortable || sortable;
      const toEl = toSortable.el;
      const insertAfter = lastDragOverEl === toEl;
      const isSameGroup = toSortable === activeSortable;

      console.log(dragEl, lastDragOverEl, evt);

      toSortable.captureAnimationState();
      if (!isSameGroup) activeSortable.captureAnimationState();

      if (insertAfter) {
        dragEl.parentNode.removeChild(dragEl);
        toEl.appendChild(dragEl);
      } else {
        dragEl.parentNode.removeChild(dragEl);
        lastDragOverEl.parentNode.insertBefore(dragEl, lastDragOverEl);
      }

      toSortable.animateAll();
      if (!isSameGroup) activeSortable.animateAll();
    },
    nulling() {
      lastDragOverEl = null;
    }
  };

  return Object.assign(Delayable, {
    pluginName: 'delayable',
  });
}

export default DelayablePlugin;
