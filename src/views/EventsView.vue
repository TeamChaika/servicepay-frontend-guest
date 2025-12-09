<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Мероприятия</h1>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Название мероприятия
          </h3>
          <p class="text-gray-600 mb-4">Описание мероприятия...</p>
          <router-link
            to="/events/1"
            class="text-primary-600 hover:text-primary-700"
          >
            Подробнее →
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Events list
</script>

