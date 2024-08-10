import {
	mapGetters
} from 'vuex'
const badgeMix = {
	data() {
		return {

		};
	},
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch:{
		 // 监听 total 值的变化
		total(){
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}
export default badgeMix