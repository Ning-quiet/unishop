<template>
	<view>
		<!-- <my-search> </my-search> -->
		
		
		<mySearch @click="gotoSearch"></mySearch>
		
		
	
		<view class="scroll-view-container">
			<!-- 左侧 -->
			<scroll-view scroll-y="true" :style="{ height: wh + 'px' }" class="left-scroll-view">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i=== active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
		
			</scroll-view>
			<scroll-view  class="right-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" >
							<img :src="item3.cat_icon" alt="" @click="gotoGoodsList(item3)"/>
							<text @click="gotoGoodsList(item3)">{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix  from  '../../mixins/tabbar-badge.js'
	
export default {
	mixins:[badgeMix],
	data() {
		return {
			// 当前设备可用高度
			wh: 0,
			active:0,
			scrollTop:0,
			cateList: [],
			cateLevel2:[]
		};
	},
	onLoad() {
		const sysInfo = uni.getSystemInfoSync();
		// 为 wh 窗口可用高度动态赋值
		this.wh=sysInfo.windowHeight - 50
		this.getCateList();
	},
	methods: {
		
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories')
			if (res.meta.status !== 200) {
				return uni.$showMsg()
			}
			this.cateList = res.message
			this.cateLevel2 = res.message[0].children
		},
		activeChanged(i){
			this.active = i
			this.cateLevel2 = this.cateList[i].children
			this.scrollTop = this.scrollTop === 0 ? 1:0
		},

		gotoGoodsList(item3) {
			// console.log(21312423)
		  uni.navigateTo({
		    url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
		  })
		},
		gotoSearch(){
			uni.navigateTo({
				 url: '/subpkg/search/search'
			})
		}
	}
};
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-view-item {
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			&.active {
				background-color: #ffffff;
				position: relative;
				&::before {
					content: ' ';
					display: flex;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list{
	display: flex;
	flex-wrap:wrap;
	.cate-lv3-item{
		width: 33.33%;
		margin-bottom: 10px;
		display:flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 60px;
			height:60px;
		}
		text{
			font-size: 12px;
		}
	}
}


</style>