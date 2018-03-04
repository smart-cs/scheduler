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
        top: '63.5%',
        left: '35.7%',
        // left: (parseInt(this.col) * 60).toString() + 'px',
        // top: (parseInt(this.row) * 15 - 8).toString() + 'px',
        height: (parseInt(this.len) * 15 - 1).toString() + 'px',
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
