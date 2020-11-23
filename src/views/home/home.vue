<!--
 * @Author: your name
 * @Date: 2020-07-23 09:22:53
 * @LastEditTime: 2020-11-23 09:40:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_projectmaterial\src\views\home\home.vue
-->
<template>
    <div class="cons">
        <div class="left">
            <img :src="homeImage" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            homeImage: ''
        };
    }
};

</script>
<style scoped lang='scss'>
    .cons{
        background: #FAFAFA;
       .left {
            width: 100%;
            height: 100%;
            float: left;
            line-height: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                // width: 80%;
                max-height: 100%;
                max-width: 100%;
                vertical-align: middle;
            }
       }
       .right {
            width: 25%;
            height: 100%;
            float: left;
            h2 {
                font-size: 24px;
                color: #000;
                margin-top: 160px;
                font-weight: normal;
                margin-bottom: 40px;
            }
            p {
                line-height: 42px;
                color: #333;
                font-size: 18px;
            }
            a {
                margin-top: 60px;
                color: #2b74ec;
                display: block;
                font-size: 16px;
                text-decoration: none;
                i {
                    margin-right: 8px;
                }
            }
       }
    }
</style>
