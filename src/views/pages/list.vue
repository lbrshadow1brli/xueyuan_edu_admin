<template>
    <div class="page">
        <div class="alignCenter width100">
            <div class="fontBlack14" style="width: 80px;">姓名</div>
            <el-input v-model="form.name" class="marginRight20" style="width: 200px"></el-input>
            <div class="fontBlack14" style="width: 80px;">开始时间</div>
            <el-date-picker class="marginRight20"    v-model="form.begin" type="date" placeholder="选择日期"></el-date-picker>
            <div class="fontBlack14" style="width: 80px;">结束时间</div>
            <el-date-picker class="marginRight20" v-model="form.end" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" @click="getTeacherList(1)">查询</el-button>
        </div>
        <!--教师列表-->
        <div class="teacherList">
            <el-table
                    :data="tableData"
                    style="width: 100%;">
                <el-table-column
                        prop="id"
                        label="id"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
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
        <!--分页器-->
        <div>
            <el-pagination
                    layout="prev, pager, next"
                    :total=totalPage
                    @current-change="changePage">
            </el-pagination>
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
                this.axios.post(api.getTeacherList + '/' + page + '/' + 10,this.form)
                    .then(res => {
                        console.log(res);
                        this.tableData = res.data.data.list;
                        this.totalPage = Number(res.data.data.total);
                        console.log(this.tableData);
                    });
            },
            //切换页数
            changePage(e) {
                this.getTeacherList(e);
            },
            //编辑
            handleEdit(index, row) {
                this.$router.push({path:'/addteacher',query:{id: row.id}})
            },
            //删除
            handleDelete(index, row) {
                this.axios.delete(api.deleteTeacher + row.id)
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
