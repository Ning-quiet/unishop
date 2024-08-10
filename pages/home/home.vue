<template>
	<view>
		<view class="search-box">
			<mySearch @click="gotoSearch"></mySearch>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<!-- 相当于a标签s商品详细页 -->
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<img :src="item.floor_title.image_src" class="floor-title" />
				<view class="floor-img-box">
					<navigator  :url="item.product_list[0].url" class="left-img-box">
						<img :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"/>
					</navigator>
					
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index) in item.product_list" :key="index" :url="item2.url" >
							<img :src="item2.image_src" v-if="index !== 0" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></img>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix  from  '../../mixins/tabbar-badge.js'
export default {
	 mixins:[badgeMix],
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList:[],
		};
	},
	onLoad() {
		this.getSwiperList()
		this.getNavList()
		this.getFloorList()
	},
	methods: {
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			this.swiperList = res.message;
		},

		async getNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			this.navList = res.message;
		},
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			 res.message.forEach(floor => {
			     floor.product_list.forEach(prod => {
			       prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
			     })
			   })
			 
			 // for(var i in res.message){
				//  var floor = res.message[i].product_list
				//  for(var  j in floor){
				// 	  console.log(floor[j])
				// 	  res.message[i].product_list[j]["url"] = "/subpkg/goods_list/goods_list?" + floor[j].navigator_url.split('?')[1]
				//  }
			 // }
			this.floorList = res.message;
		},

		navClickHandler(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
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
// 1rpx = 0.50x

swiper {
	height: 330rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}

.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title{
	width: 100%;
	height: 60rpx;
}
.floor-img-box{
	display: flex ;
	padding-left:10rpx ;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.search-box{
	// 设置定位效果为“吸顶”
	  position: sticky;
	  // 吸顶的“位置”
	  top: 0;
	  // 提高层级，防止被轮播图覆盖
	  z-index: 999;
}


</style>
