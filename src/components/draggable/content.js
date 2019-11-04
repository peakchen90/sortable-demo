import { Sortable, MultiDrag } from 'sortablejs';

Sortable.mount(new MultiDrag());

const manager = {
  _nextId: 0,
  _instances: [],
  nextId() {
    return this._nextId++;
  },
  add(id, instance) {
    const ele = {
      id,
      instance,
      selected: [],
    };
    this._instances.push(ele);
    return ele;
  },
  remove(id) {
    const index = this._instances.findIndex(item => item.id === id);
    if (index !== -1) {
      this._instances.splice(index, 1);
    }
  },
  find(el) {
    return this._instances.find(item => item.instance.sortable.el === el) || null;
  },
};


export default {
  name: 'draggable-content',

  inheritAttrs: false,

  props: {
    value: {
      type: Array,
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
    customClass: {
      type: String,
      default: 'draggable-content',
    },
    group: [String, Object],
  },

  data() {
    return {
      data: [],
    };
  },

  methods: {
    serializeIndexes(evt) {
      const {
        oldIndex, newIndex, oldIndicies, newIndicies,
      } = evt;
      if (oldIndicies.length > 1 && newIndicies.length > 1) {
        return [
          oldIndicies.map(i => i.index),
          newIndicies.map(i => i.index),
        ];
      }
      return [
        [oldIndex],
        [newIndex],
      ];
    },
    getNewIndex(evt) {
      const { newIndex, newIndicies } = evt;
      if (newIndicies.length > 1) {
        return newIndicies[0].index;
      }
      return newIndex;
    },
    removeItems(indexes) {
      const copies = [...indexes].sort((a, b) => b - a);
      return copies.map(index => this.value.splice(index, 1)[0]).reverse();
    },
    updatePosition(oldIndexes, newIndexes) {
      const removed = this.removeItems(oldIndexes);
      this.value.splice(newIndexes[0], 0, ...removed);
      this.emitInputEvent();
    },
    emitInputEvent() {
      this.$emit('input', this.value);
    },
  },

  created() {
    this.data = [...this.value];
    this.instanceId = manager.nextId();
  },

  mounted() {
    this.sortable = Sortable.create(this.$refs.content, {
      group: this.group,
      sort: true,
      scroll: true,
      multiDrag: true,
      animation: 150,
      multiDragKey: /Mac OS/.test(navigator.userAgent) ? 'Meta' : 'Control',
      emptyInsertThreshold: 50,
      onStart: ({ oldIndex, oldIndicies }) => {
        if (oldIndicies.length > 0) {
          this.current.selected = oldIndicies.map(i => this.value[i.index]);
        } else {
          this.current.selected = [this.value[oldIndex]];
        }
      },
      onUpdate: (evt) => {
        this.$nextTick(() => {
          if (this._ignoreUpdate) {
            this._ignoreUpdate = null;
            return;
          }
          const [oldIndexes, newIndexes] = this.serializeIndexes(evt);
          this.updatePosition(oldIndexes, newIndexes);
        });
      },
      onAdd: (evt) => {
        this._ignoreUpdate = true;
        this.$nextTick(() => {
          this._ignoreUpdate = null;
        });

        const from = manager.find(evt.from);
        if (from && from.selected.length > 0) {
          const newIndex = this.getNewIndex(evt);
          this.value.splice(newIndex, 0, ...from.selected);
          this.emitInputEvent();
        }
      },
      onRemove: (evt) => {
        this._ignoreUpdate = true;
        this.$nextTick(() => {
          this._ignoreUpdate = null;
        });

        const [oldIndexes] = this.serializeIndexes(evt);
        this.removeItems(oldIndexes);
        this.emitInputEvent();
      },
    });

    this.current = manager.add(this.instanceId, this);
  },

  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
    manager.remove(this.instanceId);
  },

  render() {
    return (
      <div class={this.customClass} ref="content">
        {this.$parent._renderItem
          ? this.data.map(item => this.$parent._renderItem(item))
          : null
        }
      </div>
    );
  },
};
