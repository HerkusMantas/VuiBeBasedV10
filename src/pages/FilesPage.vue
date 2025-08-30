<template>
  <div class="tree-wrapper q-pa-md">
    <div class="row items-center q-mb-md">
      <q-btn label="Pridėti aplanką" @click="addNewNode('folder')" color="primary" icon="folder" class="q-mr-sm" />
      <q-btn label="Pridėti Canvas" @click="addNewNode('canvas')" color="secondary" icon="draw" class="q-mr-sm" />
      <q-btn label="Išvalyti pažymėjimą" @click="clearSelection" color="grey" icon="clear" flat />
      <div v-if="selectedNode" class="q-ml-md text-grey-8">
        <q-icon :name="'info'" color="blue-7" class="q-mr-xs" />
        Pažymėta: <span class="text-bold">{{ selectedNode }}</span>
      </div>
      <div v-else class="q-ml-md text-grey-6">
        <q-icon :name="'info'" color="grey-5" class="q-mr-xs" />
        Nieko nepažymėta
      </div>
    </div>
    <q-tree
      :nodes="customize"
      :duration="100"
      node-key="label"
      default-expand-all
      v-model:selected="selectedNode"
      ref="mytree"
      class="bg-grey-1 q-pa-sm shadow-1 rounded-borders"
    >
      <template v-slot:header-generic="prop">
        <div class="row items-center no-wrap">
          <q-icon
            :name="prop.node.type === 'folder' ? 'folder' : 'draw'"
            :color="prop.node.iconcolor || (prop.node.type === 'folder' ? 'blue-7' : 'green-7')"
            class="icon-common q-mr-sm"
          />
          <div class="node-common text-weight-medium">{{ prop.node.label }}</div>
        </div>
      </template>
      <template v-slot:default-header="prop">
        <div class="node-common">{{ prop.node.label }}</div>
      </template>
      <template v-slot:body-story="prop">
        <span class="row items-center text-grey-8">The story is: {{ prop.node.story }}</span>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedNode = ref(null)
const customize = ref([
  {
    label: "Aplankas 1",
    type: "folder",
    iconcolor: "blue-7",
    children: [
      {
        label: "Canvas 1",
        type: "canvas",
        iconcolor: "green-7"
      }
    ]
  },
  {
    label: "Aplankas 2",
    type: "folder",
    iconcolor: "blue-7",
    children: []
  },
  {
    label: "Canvas 2",
    type: "canvas",
    iconcolor: "green-7"
  }
])

function addNewNode(type) {
  const newNode = {
    label: (type === 'folder' ? 'Aplankas ' : 'Canvas ') + Date.now(),
    type,
    iconcolor: type === 'folder' ? 'blue-7' : 'green-7',
    children: type === 'folder' ? [] : undefined
  }
  if (selectedNode.value) {
    function addToNode(nodes) {
      for (const node of nodes) {
        if (node.label === selectedNode.value) {
          if (node.type === 'folder') {
            if (!node.children) node.children = []
            node.children.push(newNode)
          }
          return true
        }
        if (node.children && addToNode(node.children)) return true
      }
      return false
    }
    addToNode(customize.value)
  } else {
    customize.value.push(newNode)
  }
}

function clearSelection() {
  selectedNode.value = null
}
</script>

<style lang="scss">
@import "treeoverride";
</style>
