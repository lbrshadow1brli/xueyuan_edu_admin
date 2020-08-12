<template>
    <div class="index">
        <el-col :span="12" class="nav">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                     @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="$router.push('/list')">教师列表</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/addteacher')">添加讲师</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>

                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>

                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>

            </el-menu>
        </el-col>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .index {
        width: 100%;
        min-height: 100vh;
        display: flex;
    }

    .nav {
        width: 200px;
    }
</style>
