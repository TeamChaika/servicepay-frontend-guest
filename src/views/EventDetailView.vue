<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <router-link to="/events" class="text-primary-600 hover:text-primary-700">
          ← Назад к мероприятиям
        </router-link>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Название мероприятия
        </h1>
        <p class="text-gray-600 mb-8">Подробное описание...</p>
        
        <button class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Купить билет
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Event detail
</script>

