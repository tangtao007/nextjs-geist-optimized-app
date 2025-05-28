<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'

const store = useStore()
const loading = computed(() => store.state.loading)
const pets = computed(() => store.state.pets)

onMounted(async () => {
  try {
    await store.dispatch('fetchPets')
  } catch (error) {
    console.error('Failed to fetch pets:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  }
})

const navigateToPet = (id) => {
  uni.navigateTo({
    url: `/pages/pet-detail/pet-detail?id=${id}`
  })
}

const navigateToAddPet = () => {
  uni.navigateTo({
    url: '/pages/add-pet/add-pet'
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">My Pet App</text>
    </view>
    
    <view v-if="loading" class="loading-container">
      <Loading text="加载中..." />
    </view>
    
    <view v-else class="pet-list">
      <view v-if="pets.length === 0" class="empty-state">
        <text class="empty-text">还没有添加宠物哦</text>
      </view>
      
      <view 
        v-else
        v-for="pet in pets" 
        :key="pet.id" 
        class="pet-card"
        @tap="navigateToPet(pet.id)"
      >
        <image 
          class="pet-image" 
          :src="pet.avatar" 
          mode="aspectFill"
        />
        <view class="pet-info">
          <text class="pet-name">{{ pet.name }}</text>
          <text class="pet-breed">{{ pet.breed }}</text>
        </view>
      </view>
    </view>

    <view class="add-pet-button" @tap="navigateToAddPet">
      <text class="add-icon">+</text>
    </view>
  </view>
</template>

<style lang="scss">
@use '@/common/styles/common.scss' as *;

.container {
  padding: $spacing-lg;
  background-color: $background-color;
  min-height: 100vh;
}

.header {
  margin-bottom: $spacing-xl;
  padding: $spacing-lg 0;
  text-align: center;
}

.title {
  font-size: $font-size-xl;
  font-weight: bold;
  color: $text-primary;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.empty-text {
  font-size: $font-size-md;
  color: $text-secondary;
}

.pet-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.pet-card {
  background: $white;
  border-radius: $radius-lg;
  overflow: hidden;
  @include card-shadow;
}

.pet-image {
  width: 100%;
  height: 400rpx;
}

.pet-info {
  padding: $spacing-md;
}

.pet-name {
  font-size: $font-size-lg;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: $spacing-xs;
}

.pet-breed {
  font-size: $font-size-sm;
  color: $text-secondary;
}

.add-pet-button {
  position: fixed;
  bottom: 60rpx;
  right: 60rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  background-color: $primary-color;
  @include flex-center;
  @include card-shadow;
}

.add-icon {
  color: $white;
  font-size: 48rpx;
  font-weight: bold;
}
</style>
