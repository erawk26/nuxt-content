<template lang="pug">
    span {{elapsedTime}}
</template>

<script>
import { formatDistance, parseISO } from 'date-fns'
export default {
  props: {
    date: {
      type: String,
      default: new Date(),
    },
  },
  data() {
    return {
      elapsedTime: formatDistance(parseISO(this.date), new Date()),
    }
  },
}
</script>

<style lang="scss" scoped></style>
