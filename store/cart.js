export default {
	// 为当前模块开启命名空间
	namespaced: true,
	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')

	}),
	// 模块的 mutations 方法
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			/// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const find_result = state.cart.find(x => x.goods_id === goods.goods_id)
			if (find_result) {
				find_result.goods_state = goods.goods_state
				this.commit("m_cart/saveToStorage")
			}
		},
		updateGoodsCount(state, goods) {
			const find_result = state.cart.find(x => x.goods_id === goods.goods_id)
			if (find_result) {
				find_result.goods_count = goods.goods_count
				this.commit("m_cart/saveToStorage")
			}
		},
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}


	},
	// 模块的 getters 属性
	getters: {
		total(state) {
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		checkoutCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_price * item
				.goods_count, 0).toFixed(2)

		}
	}
}