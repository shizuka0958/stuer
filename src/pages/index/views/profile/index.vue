<template>
  <div class="profile_container">
    <div class="profile-info block" v-if="userExist">
      <div class="profile-info-main">
        <div class="img-box">
          <img :src="avatar" class="avatar">
        </div>
        <div class="info-box">
          <div class="nickName-box">
            <h1 class="nickName">{{nickName}}</h1>
            <div class="role">{{roleName}}</div>
          </div>
          <div class="personSign-box">
            <span class="personSign">{{personSign}}</span>
          </div>
        </div>
      </div>
      <div class="profile-info-opt">
        <button class="edit-profile-btn" @click="routeToUserEdit" v-if="amI">编辑个人资料</button>
      </div>
    </div>
    <div class="profile-main" v-if="userExist">
      <div class="profile-main-nav block">
        <ul class="profile-nav">
          <li
            :class="{'profile-nav-item':true, 'active': activeIndex === index}"
            v-for="(nav, index) in navs"
            :key="index"
            @click="activeIndex = index"
          >
            <a :href="`/profile/${$route.params.id}${nav.href}`">
              <svg class="profile-nav-item-logo" aria-hidden="true">
                <use :xlink:href="nav.icon"></use>
              </svg>
              <span>{{nav.name}}</span>
              <i class="el-icon-arrow-right icon-right"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="profile-main-content block">
        <router-view></router-view>
      </div>
    </div>
    <div class="userNotFound block" v-if="!userExist">用户不存在</div>
    <div class="toIndex" v-if="!userExist">
      <el-button type="primary" @click="routeToIndex">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import avatar from '@/assets/logo.png';
import { getUserInfoById } from '@/api';
export default {
  data() {
    return {
      activeIndex: 0,
      avatar,
      navs: [
        {
          href: '',
          icon: '#icon-home',
          name: '首页'
        },
        {
          href: '/discuss',
          icon: '#icon-discuss',
          name: '讨论帖'
        },
        {
          href: '/likes',
          icon: '#icon-zan',
          name: '我的点赞'
        },
        {
          href: '/basicInfo',
          icon: '#icon-user',
          name: '基本信息'
        },
        {
          href: '/setting',
          icon: '#icon-setting',
          name: '设置'
        }
      ],
      userExist: true // 用户是否存在,默认为true
    };
  },
  computed: {
    ...mapGetters([
      'pageUser',
      'user'
      // ...
    ]),
    amI() {
      //是否是本人的个人信息界面
      if (this.user && this.pageUser && this.user.id === this.pageUser.id) {
        return true;
      }
      return false;
    },
    nickName() {
      if (this.pageUser && this.pageUser.nickName) {
        return this.pageUser.nickName;
      }
      return `${this.amI ? '你' : '他'}的昵称`;
    },
    personSign() {
      if (this.pageUser && this.pageUser.personSign) {
        return this.pageUser.personSign;
      }
      return `${this.amI ? '你' : '他'}的个性签名/座右铭/人生感悟`;
    },
    roleName() {
      const map = {
        1: '毕业生',
        2: '在校生',
        3: '老师',
        4: '运营管理员',
        5: '学校管理员',
        6: '企业管理员',
        7: '超级管理员'
      };
      if (this.pageUser && this.pageUser.email && this.pageUser.email === '14glwu@stu.edu.cn') {
        return 'Stuer网创始人';
      }
      if (this.pageUser && this.pageUser.role) {
        return map[this.pageUser.role] || '毕业生';
      }
      return '毕业生';
    }
  },
  async created() {
    await this.getPageUserInfo();
  },
  methods: {
    async getPageUserInfo() {
      // 查询当前页面的用户信息，非登录用户本身
      const result = await getUserInfoById(this.$route.params.id);
      if (result.code === 0) {
        this.$store.commit('setPageUser', result.data);
      } else if (result.code === 2003) {
        this.userExist = false;
      }
    },
    routeToUserEdit() {
      this.$router.push(`/profile/${this.$route.params.id}/basicInfo#edit`);
    },
    routeToIndex() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.profile_container {
  padding: 2rem 0;
}
.profile-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem;
  &-main,
  &-opt {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  overflow: hidden;
  background: #eee;
  cursor: pointer;
  .avatar {
    height: 7rem;
    width: 7rem;
  }
}
.info-box {
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
}
.nickName-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .nickName {
    margin-right: 1rem;
    font-size: 2rem;
    font-weight: 600;
    word-break: break-word;
  }
  .role {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    color: #fff;
    background: #5cb85c;
  }
}
.personSign-box {
  margin-top: 1.2rem;
  .personSign {
    font-size: 1.25rem;
    line-height: 1.5;
    color: #4a68ad;
    cursor: pointer;
  }
}
.edit-profile-btn {
  width: 10rem;
  color: $primary-color;
  margin: 1rem 0 0;
  padding: 0;
  height: 2.834rem;
  font-size: 1.333rem;
  font-weight: 500;
  line-height: 1.2;
  border: 1px solid $primary-color;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.profile-main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  &-nav {
    width: 25%;
  }
  &-content {
    width: 72%;
    height: auto;
  }
}
.profile-nav {
  &-item {
    position: relative;
    font-size: 1.3rem;
    color: #71777c;
    cursor: pointer;
    &:hover {
      background-color: hsla(0, 0%, 94.9%, 0.5);
    }
    a {
      display: flex;
      align-items: center;
      padding: 2rem 2rem;
      color: #71777c;
      &:hover {
        color: $primary-color;
      }
    }
    &-logo {
      display: inline-block;
      width: 1em;
      height: 1em;
      margin: 0 2rem 0 1rem;
      font-size: 1.2em;
      vertical-align: middle;
    }
  }
}
.icon-right {
  position: absolute;
  right: 1rem;
  font-size: 1.5rem;
  color: #d8d8d8;
}
.userNotFound {
  padding: 4rem;
  font-size: 1.5rem;
  color: $link-color;
  text-align: center;
}
.toIndex {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>