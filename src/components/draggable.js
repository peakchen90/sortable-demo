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
  name: 'draggable',

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

  beforeCreate() {
    this.instanceId = manager.nextId();
  },

  mounted() {
    this.sortable = Sortable.create(this.$refs.draggable, {
      group: this.group,
      sort: true,
      scroll: true,
      multiDrag: true,
      animation: 150,
      multiDragKey: 'CTRL',
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
          this.value.splice(evt.newIndex, 0, ...from.selected);
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

  render(h) {
    return h(
      'div',
      { class: 'draggable-wrapper' },
      [
        this.$slots.header,
        h(
          this.tag,
          {
            ref: 'draggable',
            class: this.customClass,
          },
          this.$slots.default,
        ),
        this.$slots.footer,
      ],
    );
  },
};
