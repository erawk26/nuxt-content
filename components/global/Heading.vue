<template>
  <h3
    v-bind="$attrs"
    class="heading text-uppercase font-weight-medium"
    v-on="$listeners"
  >
    <slot />
  </h3>
</template>

<script>
export default {
  name: 'Heading',
}
</script>
