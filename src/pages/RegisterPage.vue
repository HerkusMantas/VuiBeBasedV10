<template>
		<q-layout view="lHh Lpr lFf">
			<q-page-container>
				<q-page>
					<q-form @submit="onRegister">
						<q-input v-model="email" label="El. paštas" type="email" />
						<q-input v-model="password" label="Slaptažodis" type="password" />
						<q-btn label="Registruotis" type="submit" color="primary" />
						<q-btn label="Atgal į prisijungimą" @click="goToLogin" flat />
						<div v-if="error" class="q-mt-md text-negative">{{ error }}</div>
					</q-form>
				</q-page>
			</q-page-container>
		</q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../firebase'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const onRegister = async () => {
	error.value = ''
	try {
		await register(email.value, password.value)
		router.push('/files')
	} catch (e) {
		error.value = e.message || 'Registracija nepavyko.'
	}
}

const goToLogin = () => {
	router.push('/login')
}
</script>
