<template>
  <p v-bind:style="overlayStyle">
    {{ name }} ({{ type }})
  </p>
</template>

<script>
export default {
  name: 'course-component',
  props: ['name', 'type', 'row', 'col', 'len'],
  computed: {
    overlayStyle: function () {
      const style = {
        left: (parseInt(this.col) * 100).toString() + 'px',
        top: (parseInt(this.row) * 20 - 16).toString() + 'px',
        height: (parseInt(this.len) * 20 - 1).toString() + 'px',
        width: '100px',
        fontSize: '100%',
        backgroundColor: '#ADD8E6',
        position: 'absolute'
      }

      return style
    }
  }
}
</script>
