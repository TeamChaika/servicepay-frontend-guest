<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-gray-600">Загрузка...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-6xl mb-4">❌</div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Ошибка</h1>
        <p class="text-gray-600">{{ error }}</p>
      </div>

      <!-- Deposit Info -->
      <div v-else-if="deposit" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 text-white">
          <h1 class="text-3xl font-bold mb-2">Оплата депозита</h1>
          <p class="text-primary-100">{{ deposit.venue?.name }}</p>
        </div>

        <!-- Content -->
        <div class="px-8 py-6 space-y-6">
          <!-- Venue Info -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-3">Информация о заведении</h2>
            <div class="space-y-2 text-gray-700">
              <p><span class="mr-2">🏢</span>{{ deposit.venue?.name }}</p>
              <p><span class="mr-2">📍</span>{{ deposit.venue?.address }}</p>
              <p v-if="deposit.venue?.phone">
                <span class="mr-2">📞</span>{{ deposit.venue?.phone }}
              </p>
            </div>
          </div>

          <!-- Event Info (if exists) -->
          <div v-if="deposit.event" class="border-t pt-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">Мероприятие</h2>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">{{ deposit.event.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ deposit.event.description }}</p>
              <p class="text-sm text-gray-700">
                <span class="mr-2">📅</span>
                {{ formatDateTime(deposit.event.start_datetime) }}
              </p>
            </div>
          </div>

          <!-- Reservation Info (if no event) -->
          <div v-else-if="deposit.extra_data?.reservation_date" class="border-t pt-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">Детали резервирования</h2>
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <p class="text-gray-700">
                <span class="mr-2">📅</span>
                <strong>Дата:</strong> {{ formatDate(deposit.extra_data.reservation_date) }}
              </p>
              <p class="text-gray-700">
                <span class="mr-2">🕐</span>
                <strong>Время:</strong> {{ deposit.extra_data.reservation_time }}
              </p>
              <p v-if="deposit.extra_data.guests_count" class="text-gray-700">
                <span class="mr-2">👥</span>
                <strong>Гостей:</strong> {{ deposit.extra_data.guests_count }}
              </p>
            </div>
          </div>

          <!-- Description -->
          <div v-if="deposit.description" class="border-t pt-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Примечание</h2>
            <p class="text-gray-700">{{ deposit.description }}</p>
          </div>

          <!-- Amount -->
          <div class="border-t pt-4">
            <div class="flex justify-between items-center">
              <span class="text-xl font-medium text-gray-700">Сумма к оплате:</span>
              <span class="text-3xl font-bold text-primary-600">{{ formatCurrency(deposit.total_amount) }}</span>
            </div>
            <p class="text-sm text-gray-500 mt-2 text-right">
              Включая все комиссии
            </p>
          </div>

          <!-- Status -->
          <div class="border-t pt-4">
            <div class="p-4 rounded-lg" :class="getStatusClass(deposit.status)">
              <div class="flex items-center">
                <div class="text-3xl mr-3">{{ getStatusEmoji(deposit.status) }}</div>
                <div>
                  <p class="font-semibold">{{ getStatusText(deposit.status) }}</p>
                  <p class="text-sm mt-1">{{ getStatusDescription(deposit.status) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- QR Code (if pending) -->
          <div v-if="deposit.status === 'pending' && deposit.qr_url" class="border-t pt-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 text-center">
              Отсканируйте QR-код для оплаты
            </h2>
            
            <div class="flex justify-center mb-4">
              <div class="bg-white border-4 border-gray-200 rounded-lg p-4 shadow-lg">
                <img :src="deposit.qr_url" alt="QR Code" class="w-64 h-64" />
              </div>
            </div>
            
            <div class="text-center space-y-2">
              <p class="text-sm text-gray-600">
                Откройте приложение банка и отсканируйте QR-код
              </p>
              <p class="text-xs text-gray-500">
                Срок действия: {{ formatDateTime(deposit.expired_at) }}
              </p>
            </div>
          </div>

          <!-- Paid Success -->
          <div v-if="deposit.status === 'completed'" class="text-center py-6">
            <div class="text-6xl mb-4">✅</div>
            <p class="text-lg font-semibold text-gray-900">Спасибо за оплату!</p>
            <p class="text-sm text-gray-600 mt-2">
              Оплачено: {{ formatDateTime(deposit.paid_at) }}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-4 border-t">
          <p class="text-xs text-gray-500 text-center">
            Powered by HelpChaika • Безопасная оплата через СБП
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const route = useRoute()

const loading = ref(true)
const error = ref('')
const deposit = ref<any>(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

onMounted(async () => {
  const depositId = route.params.id
  
  try {
    const response = await axios.get(`${API_URL}/api/v1/deposits/${depositId}/public`)
    deposit.value = response.data
  } catch (err: any) {
    error.value = err.response?.data?.detail || 'Депозит не найден'
  } finally {
    loading.value = false
  }
  
  // Автоматическая проверка статуса каждые 5 секунд
  if (deposit.value?.status === 'pending') {
    setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/deposits/${depositId}/public`)
        deposit.value = response.data
      } catch (err) {
        console.error('Failed to refresh status', err)
      }
    }, 5000)
  }
})

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(amount / 100)
}

function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru })
}

function formatDateTime(dateStr: string): string {
  if (!dateStr) return ''
  return format(new Date(dateStr), 'dd.MM.yyyy в HH:mm', { locale: ru })
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-50 border border-yellow-200',
    processing: 'bg-blue-50 border border-blue-200',
    completed: 'bg-green-50 border border-green-200',
    failed: 'bg-red-50 border border-red-200',
    cancelled: 'bg-gray-50 border border-gray-200'
  }
  return classes[status] || 'bg-gray-50 border border-gray-200'
}

function getStatusEmoji(status: string): string {
  const emojis: Record<string, string> = {
    pending: '⏳',
    processing: '🔄',
    completed: '✅',
    failed: '❌',
    cancelled: '🚫'
  }
  return emojis[status] || 'ℹ️'
}

function getStatusText(status: string): string {
  const texts: Record<string, string> = {
    pending: 'Ожидает оплаты',
    processing: 'Обрабатывается',
    completed: 'Оплачено',
    failed: 'Ошибка оплаты',
    cancelled: 'Отменено'
  }
  return texts[status] || status
}

function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    pending: 'Отсканируйте QR-код для оплаты через СБП',
    processing: 'Платеж обрабатывается банком',
    completed: 'Депозит успешно оплачен',
    failed: 'Произошла ошибка при оплате',
    cancelled: 'Депозит был отменен'
  }
  return descriptions[status] || ''
}
</script>

