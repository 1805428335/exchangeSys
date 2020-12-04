<!--
 * @Author: your name
 * @Date: 2020-08-15 14:37:43
 * @LastEditTime: 2020-08-31 16:37:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_projectmachinery\src\App.vue
-->
<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>

    export default {
        name: 'App',
        provide () {
            return {
                reload: this.reload
            };
        },
        // isRouterAlive控制显示
        data () {
            return {
                isRouterAlive: true
            };
        },
        methods: {
            // 刷新方法
            reload () {
                this.isRouterAlive = false;
                // 该方法会在dom更新后执行
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                });
            }
        }
    };
</script>
