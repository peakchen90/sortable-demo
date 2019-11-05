<template>
  <div class="demo1">
    <div class="left-group">
      <draggable
        v-model="left"
        custom-class="left-content"
        :onStart="onStart"
        :onDragInto="onDragInto"
        group="def">
        <h2 slot="header">LEFT</h2>

        <draggable-item v-slot="item">
          <div
            :key="item.name"
            class="dir-item">
            {{item.name}}
            <span class="dir-num" v-if="item.children.length > 0">({{item.children.length}})</span>
          </div>
        </draggable-item>
      </draggable>

      <div class="draggable-data">
        <h3>Data:</h3>
        <pre>{{left | stringify}}</pre>
      </div>
    </div>

    <div class="right-group">
      <draggable
        v-model="right"
        :onDragInto="onDragInto"
        custom-class="right-content"
        group="def">
        <h2 slot="header">RIGHT</h2>

        <draggable-item v-slot="item">
          <div
            :key="item.name"
            class="img-item">
            <span class="img-name">{{item.name}}</span>
            <img :src="item.url" :alt="item.name">
          </div>
        </draggable-item>
      </draggable>

      <div class="draggable-data">
        <h3>Data:</h3>
        <pre>{{right | stringify}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
// import throttle from 'lodash/throttle';
// import debounce from 'lodash/debounce';
export default {
  components: {},
  data() {
    return {
      left: [
        {
          isDir: true,
          name: '目录1',
          children: [],
        },
        {
          isDir: true,
          name: '目录2',
          children: [],
        },
        {
          isDir: true,
          name: '目录3',
          children: [],
        },
        {
          isDir: true,
          name: '目录4',
          children: [],
        },
        {
          isDir: true,
          name: '目录5',
          children: [],
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
  methods: {
    checkRect(pos, rect) {
      const {
        width, height, top, left,
      } = rect;
      return pos[0] + 5 >= left
        && pos[0] - 5 <= left + width
        && pos[1] + 5 >= top
        && pos[1] - 5 <= top + height;
    },
    onRightInput(v) {
      console.log(v);
    },
    onStart() {
      //
    },
    onEnd(evt) {
      console.log('END', evt);
      this._clearDragCallback = null;
      if (this._delayDragCallback) {
        this._delayDragCallback();
        this._delayDragCallback = null;
      }
    },
    onDragInto(evt) {
      console.log(evt);
    },
    // onMove(evt) {
    //   // console.log('onMove', evt);
    //   const { dragged, related, selected } = evt.data;
    //   // debugger;
    //
    //   if (!dragged.isDir && related.isDir) {
    //     this._clearDragCallback = this._clearDragCallback || throttle(() => {
    //       [].forEach.call(evt.to.children, elm => elm.classList.
    //       remove('sortable-related-active'));
    //     }, 60);
    //
    //     [].forEach.call(evt.to.children, elm => elm.classList.
    //     remove('sortable-related-active'));
    //     evt.related.classList.add('sortable-related-active');
    //
    //     this._clearDragCallback2 = this._clearDragCallback2 || throttle(() => {
    //       [].forEach.call(evt.to.children, elm => elm.classList.remove('sortable-related-active'));
    //     }, 40);
    //     this._delayDragCallback = () => related.children.push(...selected);
    //     this._clearDragCallback(evt);
    //   }
    //   return (dragged.isDir && related.isDir) || (!dragged.isDir && !related.isDir);
    // },
  },
  mounted() {
    // window.addEventListener('mousemove', this._posListener = (e) => {
    //   console.log(e);
    //   this.pos = [e.pageX, e.pageY];
    // });
  },
  beforeDestroy() {
    // window.removeEventListener('mousemove', this._posListener);
  },
  filters: {
    stringify(val) {
      return JSON.stringify(val.map(i => i.name), null, 2);
    },
  },
};
</script>


<style lang="scss">
  .demo1 {
    display: flex;
    justify-content: center;
    margin: 20px;

    .left-group,
    .right-group {
      display: flex;
      margin-right: 40px;

      .draggable-data {
        margin-left: 10px;

        pre {
          margin-top: 37px;
          background: #fffbf5;
          border: 1px solid #ffd69d;
          padding: 10px;
          font-size: 14px;
          font-family: 'Avenir', Helvetica, Arial, sans-serif;
          border-radius: 5px;
          color: #076d3e;
        }
      }
    }

    .left-content,
    .right-content {
      display: flex;
      flex-wrap: wrap;
      width: 436px;

      h2 {
        margin-left: 10px;
      }

      .img-item {
        position: relative;
        flex-shrink: 0;
        width: 200px;
        height: 200px;
        overflow: hidden;
        border: 4px solid #ffe8d1;
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

      .dir-item {
        width: 100%;
        margin-right: 20px;
        margin-bottom: 10px;
        border: 1px solid #f7a864;
        background: #ecdbd7;
        padding: 10px 15px;
        color: #000;
        font-size: 16px;
        border-radius: 3px;

        &.sortable-drag-into-highlight,
        &.sortable-chosen,
        &.sortable-selected {
          border: 1px solid #b6b9ca;
          background: #e5e7f9;
          color: #374abb;
        }
      }
    }
  }
</style>
