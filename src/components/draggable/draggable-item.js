export default {
  name: 'DraggableItem',

  inheritAttrs: false,

  created() {
    this.$parent._renderItem = data => this.$scopedSlots.default(data);
  },

  render() {
    return null;
  },
};
