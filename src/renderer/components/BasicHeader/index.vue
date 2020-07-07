<template>
  <div class="top-bar">
    <div class="top-bar-logo">
      客户端
    </div>
    <div class="top-bar-main">
      <div class="top-bar-menu">
        <div class="top-bar-menu-user">
          <div class="item">
            <user-info></user-info>
          </div>
          <div class="item">
            <theme-setting />
          </div>
          <div class="item" @click="logout" v-if="userId">退出</div>
        </div>
        <frame-actions />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from './UserInfo'
import ThemeSetting from './ThemeSetting'
import FrameActions from './FrameActions'
export default {
  components: {
    UserInfo,
    ThemeSetting,
    FrameActions
  },
  computed: {},
  data() {
    return {
      userId: false
    }
  },
  methods: {}
}
</script>

<style>
.ant-popover-arrow {
  border-top-color: #fafafa !important;
  border-left-color: #fafafa !important;
}
</style>
<style lang="less">
.top-bar {
  display: flex;
  height: 100%;
  overflow: hidden;
  .top-bar-logo {
    display: flex;
    font-size: 26px;
    align-items: center;
    width: 200px;
    flex: 0 0 200px;
    padding-left: 15px;
    img {
      width: 140px;
    }
  }
  .top-bar-main {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-bar-search {
      width: 240px;
      flex: 0 0 240px;
      -webkit-app-region: no-drag;
    }
    .top-bar-control {
      margin-right: 5px;
      -webkit-app-region: no-drag;
      /deep/ .ant-btn {
        height: 24px;
        line-height: 22px;
      }
    }
  }
}

.top-bar-menu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  .top-bar-menu-user {
    display: flex;
    -webkit-app-region: no-drag;
    .item {
      display: inline-flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: rgba(255, 255, 255, 1);
      }
      .ant-badge-count {
        height: 16px;
        line-height: 16px;
        min-width: 16px;
        padding: 0 5px;
        background: #fff;
        color: @primary-color;
        box-shadow: none;
        border-radius: 8px;
      }
      .avatar {
        margin-right: 8px;
        border-radius: 50%;
      }

      .icon {
        font-size: 16px;
      }
    }
  }
}

.header-user {
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  .header-user-info {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 13px;
    letter-spacing: 2px;
  }
}
.user-info-name {
  display: inline-block;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
