<template>
  <view class="loading-container">
    <view class="loading-spinner"></view>
    <text class="loading-text">{{ text || '加载中...' }}</text>
  </view>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 6rpx solid #f3f3f3;
  border-top: 6rpx solid #8BA989;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 16rpx;
  font-size: 28rpx;
  color: #666;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
