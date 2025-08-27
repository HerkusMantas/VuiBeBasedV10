<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-form @submit.prevent="onLogin">
          <q-input v-model="email" label="El. paštas" type="email" />
          <q-input v-model="password" label="Slaptažodis" type="password" />
          <q-btn label="Prisijungti" type="submit" color="primary" />
          <q-btn label="Registruotis" @click="goToRegister" flat />
          <div v-if="error" class="q-mt-md text-negative">{{ error }}</div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../firebase'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const onLogin = async () => {
  error.value = ''
  try {
    await login(email.value, password.value)
    router.replace('/') // replace, kad negrįžtų į ankstesnį URL
  } catch (e) {
    error.value = e.message || 'Prisijungimas nepavyko.'
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>