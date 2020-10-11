<template>
  <h5
    v-bind="$attrs"
    class="subheading text-uppercase font-weight-medium"
    v-on="$listeners"
  >
    <slot />
  </h5>
</template>

<script>
export default {
  name: 'Subheading',
}
</script>
