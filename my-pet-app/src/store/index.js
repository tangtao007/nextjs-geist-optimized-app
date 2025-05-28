import { createStore } from 'vuex'

const store = createStore({
  state: {
    userInfo: null,
    pets: [
      {
        id: '1',
        name: '小黄',
        breed: '金毛',
        age: 2,
        avatar: 'https://placekitten.com/400/400'
      },
      {
        id: '2',
        name: '贝贝',
        breed: '波斯猫',
        age: 1,
        avatar: 'https://placekitten.com/401/401'
      }
    ],
    loading: false
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_PETS(state, pets) {
      state.pets = pets
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    // User actions
    async login({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        // Mock login for now
        const userInfo = {
          id: '1',
          name: '宠物爱好者',
          avatar: 'https://i.pravatar.cc/150'
        }
        commit('SET_USER_INFO', userInfo)
        uni.setStorageSync('userInfo', userInfo)
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // Pet actions
    async fetchPets({ commit }) {
      commit('SET_LOADING', true)
      try {
        // Using the pets from state as mock data
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
        commit('SET_LOADING', false)
      } catch (error) {
        console.error('Failed to fetch pets:', error)
        commit('SET_LOADING', false)
        throw error
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.userInfo,
    userInfo: state => state.userInfo || {},
    pets: state => state.pets,
    isLoading: state => state.loading
  }
})

export default store
