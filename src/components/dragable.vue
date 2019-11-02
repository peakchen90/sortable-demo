<template>
  <div class="wrapper">
    <div class="left-group">
      <h2>LEFT</h2>
      <transition-group type="transition" name="flip-move" ref="left" tag="div">
        <div
          v-for="item in left"
          :key="item.name"
          class="img-item">
          <span class="img-name">{{item.name}}</span>
          <img :src="item.url" :alt="item.name">
        </div>
      </transition-group>
    </div>

    <div class="right-group">
      <h2> RIGHT</h2>
      <transition-group name="flip-list" ref="right" tag="div">
        <div
          v-for="item in right"
          :key="item.name"
          class="img-item">
          <span class="img-name">{{item.name}}</span>
          <img :src="item.url" :alt="item.name">
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Sortable, { MultiDrag } from 'sortablejs';

Sortable.mount(new MultiDrag());

export default {
  data() {
    return {
      left: [
        {
          name: '图片1',
          url: require('@/assets/1.jpg'),
        },
        {
          name: '图片2',
          url: require('@/assets/2.jpg'),
        },
        {
          name: '图片3',
          url: require('@/assets/3.jpg'),
        },
        {
          name: '图片4',
          url: require('@/assets/4.jpg'),
        },
        {
          name: '图片5',
          url: require('@/assets/5.jpg'),
        },
        {
          name: '图片6',
          url: require('@/assets/6.jpg'),
        },
        {
          name: '图片7',
          url: require('@/assets/7.jpg'),
        },
        {
          name: '图片8',
          url: require('@/assets/8.jpg'),
        },
        {
          name: '图片9',
          url: require('@/assets/9.jpg'),
        },
        {
          name: '图片10',
          url: require('@/assets/10.jpg'),
        },
        {
          name: '图片11',
          url: require('@/assets/11.jpg'),
        },
        {
          name: '图片12',
          url: require('@/assets/12.jpg'),
        },
        {
          name: '图片13',
          url: require('@/assets/13.jpg'),
        },
        {
          name: '图片14',
          url: require('@/assets/14.jpg'),
        },
        {
          name: '图片15',
          url: require('@/assets/15.jpg'),
        },
      ],
      right: [
        {
          name: '图片16',
          url: require('@/assets/16.jpg'),
        },
        {
          name: '图片17',
          url: require('@/assets/17.jpg'),
        },
        {
          name: '图片18',
          url: require('@/assets/18.jpg'),
        },
        {
          name: '图片19',
          url: require('@/assets/19.jpg'),
        },
        {
          name: '图片20',
          url: require('@/assets/20.jpg'),
        },
        {
          name: '图片21',
          url: require('@/assets/21.jpg'),
        },
        {
          name: '图片22',
          url: require('@/assets/22.jpg'),
        },
        {
          name: '图片23',
          url: require('@/assets/23.jpg'),
        },
        {
          name: '图片24',
          url: require('@/assets/24.jpg'),
        },
        {
          name: '图片25',
          url: require('@/assets/25.jpg'),
        },
        {
          name: '图片26',
          url: require('@/assets/26.jpg'),
        },
        {
          name: '图片27',
          url: require('@/assets/27.jpg'),
        },
        {
          name: '图片28',
          url: require('@/assets/28.jpg'),
        },
        {
          name: '图片29',
          url: require('@/assets/29.jpg'),
        },
        {
          name: '图片30',
          url: require('@/assets/30.jpg'),
        },
      ],
    };
  },
  mounted() {
    this.leftSortable = new Sortable(this.$refs.left.$el, {
      group: 'def',
      sort: true,
      scroll: true,
      multiDrag: true,
      multiDragKey: 'CTRL',
      onUpdate(e) {
        console.log(e);
      },
      // scrollSensitivity: 500,
      // draggable: '.img-item',
    });
    this.rightSortable = new Sortable(this.$refs.right.$el, {
      group: 'def',
      sort: true,
      scroll: true,
      multiDrag: true,
      multiDragKey: 'CTRL',
      // scrollSensitivity: 500,
      // draggable: '.img-item',
    });
  },
};
</script>

<style lang="scss" scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    margin: 20px;

    h2 {
      margin-left: 10px;
    }

    .img-item {
      position: relative;
      flex-shrink: 0;
      width: 200px;
      height: 200px;
      overflow: hidden;
      border: 2px solid #ffe8d1;
      border-radius: 5px;
      margin-left: 10px;
      margin-top: 10px;
      background: #f5f5f5;

      &.sortable-chosen,
      &.sortable-selected {
        border-color: #ff7459;
        opacity: 0.8;
      }

      .img-name {
        position: absolute;
        left: 10px;
        top: 2px;
        font-size: 14px;
        color: #888;
      }

      img {
        width: 150%;
        margin-left: -50px;
      }
    }

    .left-group, .right-group {
      margin-left: 40px;

      > div {
        display: flex;
        flex-wrap: wrap;
        width: 428px;
      }
    }
  }
</style>
