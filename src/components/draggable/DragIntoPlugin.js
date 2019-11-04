function DragIntoPlugin() {
  function DragInto() {

  }

  DragInto.prototype = {
    dragOver() {
      // console.log('plugin', evt);
    },
  };

  return Object.assign(DragInto, {
    pluginName: 'dragInto',
  });
}

export default DragIntoPlugin;
