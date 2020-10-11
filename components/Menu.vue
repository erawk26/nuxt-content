<template lang="pug">
v-list(:dense='true', :color='color')
  v-list-item.nav-item.uc(
    v-for='(item, i) in menu',
    :key='i',
    :to='item.to',
    :href='item.href',
    link,
    :nuxt='!item.external',
    :target='item.external ? "_blank" : "_self"',
    :title='item.title',
    :class='{ "full-width": type == "mobile" }'
  )
    //FLAT MENU HERE
    template(v-if='type == "flat"')
      v-list-item-action(
        :class='{ "visually-hidden": hideIcon, "no-text": hideText }'
      )
        v-icon
          | {{ item.icon }}
      v-list-item-content(
        :class='{ "visually-hidden": hideText, "no-icon": hideIcon }'
      )
        v-list-item-title {{ item.title }}
    // MOBILE VIEW HERE
    .eo-flex.a-center(v-else-if='type == "mobile"')
      v-icon.mr-4 {{ item.icon }}
      span {{ item.title }}
    // DROPDOWN MENU HERE
    v-list-group.flex-grow-1(
      v-else,
      :prepend-icon='item.icon',
      :append-icon='!item.submenu ? "" : "expand_more"'
    )
      template(v-slot:activator)
        v-list-item-content
          v-list-item-title {{ item.title }}
      v-list-item(
        v-if='!parentState',
        v-for='(subitem, j) in item.submenu',
        :key='j',
        dense,
        sub-group,
        :to='subitem.to',
        :href='subitem.href',
        link,
        :nuxt='!subitem.external',
        :target='subitem.external ? "_blank" : "_self"'
      )
        v-list-item-content
          v-list-item-title {{ subitem.title }}
  slot(name='extra')
</template>
<script>
export default {
  components: {},
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'flat',
    },
    color: {
      type: String,
      default: 'transparent',
    },
    hideText: {
      type: Boolean,
      default: null,
    },
    hideIcon: {
      type: Boolean,
      default: null,
    },
    parentState: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  watch: {
    // parentState: (newV, oldV) => //console.log(newV, oldV)
  },
}
</script>
<style lang="scss">
.v-application--is-ltr,
.v-application--is-rtl {
  .v-list-item__action.no-text,
  .v-list-item__action.no-text:first-child {
    margin-left: 0;
    margin-right: 0;
  }
}
.v-list-item.nav-item,
.v-list--dense .v-list-item.nav-item {
  .v-list-item__title {
    line-height: 1;
    font-size: 1.8rem;
  }
}
</style>
