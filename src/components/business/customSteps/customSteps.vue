<!--
 * @Author: your name
 * @Date: 2020-11-19 12:03:25
 * @LastEditTime: 2020-11-19 13:13:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\components\business\customSteps\customSteps.vue
-->
<template>
    <div class="custom-steps">
        <div
            class="steps-list"
            :class="index !== stepsList.length-1 ? 'dividing-steps' : 'dividing-unchecked'"
            v-for="(item, index) in stepsList" :key="index">
            <div class="steps">
                <i v-if="item.icon" :class="item.icon"></i>
                <div v-else class="steps-step" :class="active > index ? 'step-active' : 'unchecked'">{{item.step}}</div>
                <div class="steps-tips" :class="active > index ? 'tips-active' : 'tips-unchecked'">{{item.tips}}</div>
            </div>
            <div v-if="index !== stepsList.length-1" class="dividing"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    props: {
        // 步骤图
        stepsList: {
            type: Array,
            default: () => []
        },
        // 当前步骤
        active: {
            type: Number,
            default: 1
        }
    }
};
</script>
<style lang="scss" scoped>
.custom-steps{
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    .dividing-steps{
        flex: 1;
    }
    .dividing-unchecked{
        margin-left: 10px;
    }
    .steps-list{
        display: flex;
        .steps{
            .steps-step{
                width: 35px;
                height: 35px;
                margin: 0 auto;
                border-radius: 50%;
                line-height: 35px;
                background-color: #2b74ec;
                color: #ffffff;
            }
            .unchecked{
                background-color: #ffffff;
                border: solid 1px #878787;
                color: #999999;
            }
            .step-active {
                background-color: #2b74ec;
                color: #ffffff;
            }
            .steps-tips{
                font-size: 14px;
                margin: 10px 0;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
            }
            .tips-active{
                color: #333333;
            }
            .tips-unchecked{
                color: #999999;
            }
        }
        .dividing{
            flex: 1;
            border-top: 1px solid #e8e8e8;
            margin-top: 20px;
        }
    }
}
</style>
