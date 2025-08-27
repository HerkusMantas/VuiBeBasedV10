<template>
  <div class="tree-wrapper">
    <q-tree
      :nodes="customize"
      :duration="100"
      node-key="label"
      default-expand-all
      ref="mytree"
    >
      <template v-slot:header-generic="prop">
        <div class="row items-center no-wrap">
          <q-icon
            :name="prop.node.icon || 'star'"
            :color="prop.node.iconcolor || 'orange'"
            class="icon-common"
          />
          <div class="node-common">{{ prop.node.label }}</div>
        </div>
      </template>
      <template v-slot:default-header="prop">
        <div class="node-common">{{ prop.node.label }}</div>
      </template>
      <template v-slot:body-story="prop">
        <span class="row items-center">The story is: {{ prop.node.story }}</span>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
const customize = [
  {
    label: "Good food",
    icon: "restaurant_menu",
    iconcolor: "teal-10",
    header: "generic",
    children: [
      {
        label: "Quality ingredients",
        icon: "local_dining",
        iconcolor: "green-7",
        body: "story",
        story: "Our ingredients are sourced locally."
      },
      {
        label: "Good recipe",
        icon: "receipt",
        iconcolor: "blue-7",
        body: "story",
        story: "Secret family recipes that everyone loves!"
      }
    ]
  },
  {
    label: "Good service",
    icon: "room_service",
    iconcolor: "purple-7",
    header: "generic",
    enabled: false,
    children: [
      {
        label: "Prompt attention",
        icon: "timer",
        iconcolor: "orange-7",
        children: [
          { label: "child node one", icon: "star", iconcolor: "amber-7" },
          { label: "child node two", icon: "star", iconcolor: "amber-7" }
        ]
      },
      { label: "Professional waiter", icon: "person", iconcolor: "grey-7" }
    ]
  },
  {
    label: "Pleasant surroundings",
    icon: "nature_people",
    iconcolor: "brown-7",
    children: [
      { label: "Happy atmosphere", icon: "mood", iconcolor: "yellow-7" },
      { label: "Good table presentation", header: "generic", icon: "table_restaurant", iconcolor: "deep-orange-7" },
      { label: "Pleasing decor", icon: "palette", iconcolor: "pink-7" }
    ]
  }
]
</script>

<style lang="scss">
@import "treeoverride";
</style>
