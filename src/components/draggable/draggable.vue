<template>
  <div class="draggable__wrapper">
    <slot name="header"></slot>

    <!-- 隐藏挂载 -->
    <slot></slot>

    <draggable-content
      v-bind="$attrs"
      v-on="$listeners">
    </draggable-content>

    <slot name="footer"></slot>
  </div>
</template>

<script>
import draggableContent from './content';

export default {
  name: 'Draggable',

  inheritAttrs: false,

  components: {
    draggableContent,
  },
};
</script>
