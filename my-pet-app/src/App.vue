<script>
import { useStore } from 'vuex'

export default {
  onLaunch: function() {
    console.log('App Launch')
    try {
      // 检查更新
      if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function() {
              uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function(res) {
                  if (res.confirm) {
                    updateManager.applyUpdate()
                  }
                }
              })
            })
          }
        })
      }
    } catch (error) {
      console.error('Update check failed:', error)
    }
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@use '@/common/styles/common.scss' as *;

/* 重置基础样式 */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
  background-color: $background-color;
}

/* 去除默认边距 */
view, text, navigator, input, textarea {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* 图片默认样式 */
image {
  width: 100%;
  height: 100%;
  display: block;
}

/* 统一点击反馈 */
.hover-class {
  opacity: 0.7;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

/* 安全区域适配 */
.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* 通用动画类 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

/* 骨架屏动画 */
@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.skeleton {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}
</style>
