<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="tree-wrapper">
          <q-tree
            :nodes="treeData"
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
        <q-btn label="Sukurti aplanką" @click="createFolder" color="primary" />
        <q-btn label="Sukurti Canvas" @click="createCanvas" color="secondary" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { db, auth } from '../firebase'
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore'

const treeData = ref([])

onMounted(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (!user) {
      treeData.value = []
      return
    }
    const q = query(collection(db, 'folders'), where('userId', '==', user.uid))
    onSnapshot(q, (snapshot) => {
      // Tikimasi, kad dokumentai turi children lauką (jei ne, reikia papildomos logikos)
      treeData.value = snapshot.docs.map(doc => doc.data())
    })
  })
})

const createFolder = async () => {
  const user = auth.currentUser
  if (!user) return
  await addDoc(collection(db, 'folders'), {
    label: 'Naujas aplankas',
    userId: user.uid,
    children: []
  })
}

const createCanvas = async () => {
  const user = auth.currentUser
  if (!user) return
  await addDoc(collection(db, 'folders'), {
    label: 'Naujas Canvas',
    userId: user.uid,
    type: 'canvas',
    children: []
  })
}
</script>

<style lang="scss">
/* Jei turi atskirą treeoverride.scss, importuok jį, arba įklijuok stilių čia */
</style>
