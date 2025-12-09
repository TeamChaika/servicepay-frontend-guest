<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900">HelpChaika</h1>
        <p class="text-gray-600 mt-2">Мероприятия и билеты</p>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center py-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Добро пожаловать!
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Найдите лучшие мероприятия в вашем городе
        </p>
        <router-link
          to="/events"
          class="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-lg font-medium"
        >
          Посмотреть мероприятия
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Home page
</script>

