<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center column">
        <h2>Pagrindinis puslapis</h2>
        <p>Sveiki prisijungę! Čia galite pereiti į failų medį.</p>
        <q-btn label="Eiti į failų medį" color="primary" @click="goToFiles" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToFiles = () => {
  router.push('/files')
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
