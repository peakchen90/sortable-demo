<template>
  <div class="demo1">
    <div
      class="drag-group"
      v-for="item in data"
      :key="item.name">

      <h2>{{item.name}}</h2>

      <draggable
        v-model="item.children"
        :onStart="onStart"
        group="def">
        <draggable-item v-slot="child">
          <div
            :key="child.name"
            class="img-item">
            <span class="img-name">{{child.name}}</span>
            <img :src="child.url" :alt="child.name">
          </div>
        </draggable-item>
      </draggable>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      data: [
        {
          name: '文件夹1',
          children: [
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
          ],
        },
        {
          name: '文件夹2',
          children: [
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
          ],
        },
        {
          name: '文件夹3',
          children: [],
        },
      ],
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        console.log('Updated:');
        val.forEach((item) => {
          console.log(item.name, ':', item.children.map(i => i.name).toString());
        });
      },
    },
  },
  methods: {
    onStart() {
    },
    onEnd() {
    },
  },
  mounted() {
  },
  beforeDestroy() {
  },
  filters: {
    stringify(val) {
      const newVal = val.map((item) => {
        if (item.children) {
          return {
            name: item.name,
            children: item.children.map(i => i.name),
          };
        }
        return item.name;
      });
      return JSON.stringify(newVal, null, 2);
    },
  },
};
</script>


<style lang="scss">
  .demo1 {
    margin: 40px;

    .drag-group {
      .draggable-content {
        display: flex;
        flex-wrap: wrap;
        min-height: 50px;
      }

      .img-item {
        position: relative;
        flex-shrink: 0;
        width: 200px;
        height: 200px;
        overflow: hidden;
        border: 4px solid #ffe8d1;
        border-radius: 5px;
        margin: 20px;
        background: #f5f5f5;

        &.sortable-chosen,
        &.sortable-selected {
          border-color: #a35810;
          opacity: 0.6;
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
    }
  }
</style>
