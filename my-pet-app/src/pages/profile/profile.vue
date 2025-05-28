<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const pets = computed(() => store.state.pets)

const login = async () => {
  try {
    await store.dispatch('login')
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: '登录失败',
      icon: 'error'
    })
  }
}

const navigateToSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/settings'
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <view v-if="userInfo" class="user-info">
        <image :src="userInfo.avatar" class="avatar" mode="aspectFill" />
        <view class="user-details">
          <text class="username">{{ userInfo.name }}</text>
          <text class="user-id">ID: {{ userInfo.id }}</text>
        </view>
        <view class="settings-button" @tap="navigateToSettings">
          <text class="settings-icon">⚙️</text>
        </view>
      </view>
      <view v-else class="login-prompt" @tap="login">
        <text class="login-text">点击登录</text>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="section-title">我的宠物</text>
      </view>
      <view class="pet-list">
        <view v-if="pets.length === 0" class="empty-state">
          <text class="empty-text">还没有添加宠物</text>
        </view>
        <view 
          v-else
          v-for="pet in pets" 
          :key="pet.id" 
          class="pet-item"
        >
          <image :src="pet.avatar" class="pet-avatar" mode="aspectFill" />
          <view class="pet-info">
            <text class="pet-name">{{ pet.name }}</text>
            <text class="pet-breed">{{ pet.breed }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@use '@/common/styles/common.scss' as *;

.container {
  min-height: 100vh;
  background-color: $background-color;
}

.header {
  background-color: $white;
  padding: $spacing-xl $spacing-lg;
  margin-bottom: $spacing-lg;
  @include card-shadow;
}

.user-info {
  @include flex-between;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
}

.user-details {
  flex: 1;
  margin-left: $spacing-lg;
}

.username {
  font-size: $font-size-lg;
  color: $text-primary;
  font-weight: bold;
  margin-bottom: $spacing-xs;
  display: block;
}

.user-id {
  font-size: $font-size-sm;
  color: $text-light;
}

.settings-button {
  padding: $spacing-sm;
}

.settings-icon {
  font-size: $font-size-xl;
}

.login-prompt {
  @include flex-center;
  padding: $spacing-xl 0;
}

.login-text {
  font-size: $font-size-lg;
  color: $primary-color;
}

.section {
  background-color: $white;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  @include card-shadow;
}

.section-header {
  margin-bottom: $spacing-lg;
}

.section-title {
  font-size: $font-size-lg;
  color: $text-primary;
  font-weight: bold;
}

.pet-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.empty-state {
  @include flex-center;
  padding: $spacing-xl 0;
}

.empty-text {
  font-size: $font-size-md;
  color: $text-light;
}

.pet-item {
  display: flex;
  align-items: center;
  padding: $spacing-md;
  background-color: $background-color;
  border-radius: $radius-md;
}

.pet-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
}

.pet-info {
  margin-left: $spacing-md;
}

.pet-name {
  font-size: $font-size-md;
  color: $text-primary;
  font-weight: 500;
  margin-bottom: $spacing-xs;
  display: block;
}

.pet-breed {
  font-size: $font-size-sm;
  color: $text-secondary;
}
</style>
