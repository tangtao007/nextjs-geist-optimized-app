<script setup>
import { ref } from 'vue'

const chats = ref([
  {
    id: 1,
    name: '小黄的主人',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: '你好，想问问你家的狗狗...',
    lastTime: '14:30',
    online: true,
    unread: 2
  },
  {
    id: 2,
    name: '贝贝的主人',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: '好的，明天见面聊聊',
    lastTime: '昨天',
    online: false,
    unread: 0
  }
])

const openChat = (chat) => {
  uni.navigateTo({
    url: `/pages/chat/detail?id=${chat.id}`
  })
}
</script>

<template>
  <view class="container">
    <!-- Chat list -->
    <view class="chat-list">
      <view 
        class="chat-item" 
        v-for="chat in chats" 
        :key="chat.id" 
        @tap="openChat(chat)"
      >
        <view class="avatar-container">
          <image :src="chat.avatar" mode="aspectFill" class="avatar"/>
          <view class="online-status" v-if="chat.online"></view>
        </view>
        <view class="chat-content">
          <view class="chat-header">
            <text class="chat-name">{{chat.name}}</text>
            <text class="chat-time">{{chat.lastTime}}</text>
          </view>
          <view class="chat-message">
            <text class="message-text">{{chat.lastMessage}}</text>
            <view class="unread-badge" v-if="chat.unread">{{chat.unread}}</view>
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
  background-color: $white;
  padding-top: $spacing-xl;
}

.chat-list {
  padding: 0 $spacing-lg;
}

.chat-item {
  display: flex;
  padding: $spacing-md 0;
  border-bottom: 2rpx solid $background-color;
}

.avatar-container {
  position: relative;
  margin-right: $spacing-md;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
}

.online-status {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20rpx;
  height: 20rpx;
  border-radius: 10rpx;
  background-color: $primary-color;
  border: 4rpx solid $white;
}

.chat-content {
  flex: 1;
  overflow: hidden;
}

.chat-header {
  @include flex-between;
  margin-bottom: $spacing-xs;
}

.chat-name {
  font-size: $font-size-lg;
  color: $text-primary;
  font-weight: 500;
}

.chat-time {
  font-size: $font-size-xs;
  color: $text-light;
}

.chat-message {
  @include flex-between;
}

.message-text {
  flex: 1;
  font-size: $font-size-sm;
  color: $text-secondary;
  @include text-ellipsis;
}

.unread-badge {
  min-width: 36rpx;
  height: 36rpx;
  padding: 0 $spacing-xs;
  background-color: $primary-color;
  border-radius: 18rpx;
  color: $white;
  font-size: $font-size-xs;
  @include flex-center;
  margin-left: $spacing-xs;
}
</style>
