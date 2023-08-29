<template>
  <div class="card container">
    <div class="card-image pulsate">
    </div>
    <div class="block pulsate">
      </div>
    <div class="card-content">
      <div class="block3 pulsate">
      </div>
      <div class="circle pulsate">
      </div>
    </div>
</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.fpo {
    position: relative;
    margin: 25% auto;
    display: block;
}
.pulsate{
  background: linear-gradient(-45deg, #DDDDDD, #F0F0F0, #DDDDDD, #F0F0F0);
	background-size: 400% 400%;
	-webkit-animation: Gradient 2.25s ease infinite;
	-moz-animation: Gradient 2.25s ease infinite;
	animation: Gradient 2.25s ease infinite;
}
.block {
  display:block;
  margin-top: 14px;
  width:100%;
  height:20px;
  color:#000000;
}
.block2 {
  width:78px;
  height:8px;
  margin-bottom:8px;
}
.block3 {
  margin-right: 10px;
  width:131px;
  height:19px;
}
.circle {
  width:102px;
  height:42px;
  border-radius:30px;
}
.card {
  box-sizing: border-box;
  padding: 18px;
	width: 280px;
  background: #fff;
	position: relative;
	margin:auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
}
.card-image {
  box-sizing: border-box;
  display:block;
  margin: 0 auto;
  width:80%;
  height:250px;
}
.card-content {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-top: 18px;
  background: #fff;
}
@-webkit-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@-moz-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}
</style>
