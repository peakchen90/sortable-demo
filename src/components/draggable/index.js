import Draggable from './draggable';
import DraggableItem from './draggable-item';

export default function install(Vue) {
  Vue.component('draggable', Draggable);
  Vue.component('draggable-item', DraggableItem);
}
