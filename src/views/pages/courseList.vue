<template>
    <div class="page">
        <!--列表-->
        <div class="teacherList">
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column
                        prop="id"
                        label="id"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="title"
                        width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import api from '../../../public/API';

    export default {
        name: "list",
        data() {
            return {
                tableData: [],
                totalPage: null,
                form: {
                    name: '',
                    begin: '',
                    end:'',
                },
            }
        },
        created() {
            this.getTeacherList(1);
        },
        methods:{
            //获取教师列表
            getTeacherList(page) {
                this.axios.get(api.getCourseList)
                    .then(res => {
                        console.log(res);
                        this.tableData = res.data.data.list;
                    });
            },
            //切换页数
            changePage(e) {
                this.getTeacherList(e);
            },
            //编辑
            handleEdit(index, row) {
                this.$router.push({path:'/addCourse',query:{id: row.id}})
            },
            //删除
            handleDelete(index, row) {
                this.axios.delete(api.deleteCourse+'/' + row.id)
                    .then(res => {
                        this.getTeacherList(1);
                    });
            }
        },
    }
</script>

<style scoped>
    .teacherList {
        width: 100%;
    }
</style>
