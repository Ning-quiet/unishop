<template>
	<view class="my-settle-container" >
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck"><text>全选</text></radio>
		</label>
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<view class="btn-settle">
			结算（{{checkoutCount}}）
		</view>
	</view>
	
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkoutCount','total','checkedGoodsAmount']),
			
			isFullCheck(){
				return this.total === this.checkoutCount
			},
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				// 修改购物车中所有商品的选中状态
				    // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	
.my-settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			 color: #c00000;
		}
		
	}
	.btn-settle{
		height: 50px;
		min-width: 100px;
		background-color: red;
		color: white;
		line-height: 50px;
		text-align: center;
		padding:0 10px;
	}
	
}
</style>