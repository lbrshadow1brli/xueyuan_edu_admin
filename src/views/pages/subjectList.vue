<template>
    <div class="page">
        <!--添加分类-->
        <div class="width100 alignCenter">
            <div class="fontBlack14" style="width: 80px;">父分类</div>
            <el-select v-model="oneLevelSubject" placeholder="请选择" class="marginRight20" @change="selectParent">
                <el-option v-for="(item,index) in data" :key="index" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <div class="fontBlack14" style="width: 80px;">分类名称</div>
            <el-input v-model="subjectName" class="marginRight20" style="width: 200px"></el-input>
            <el-button type="success" @click="addSubject">添加</el-button>
        </div>
        <!--树状图-->
        <div class="width100">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
    </div>
</template>

<script>

    import api from "../../../public/API";

    export default {
        name: "subjectList",
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                oneLevelSubject: '',
                subjectName: '',
            };
        },
        created() {
            this.getSubjectData();
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            addSubject() {
                if (this.subjectName == '') {
                    return this.$message('请输入课程名称')
                }
                this.axios.post(api.addSubject, {
                    title: this.subjectName,
                    sort: 0,
                    parentId: (this.oneLevelSubject == '' ? '0' : this.oneLevelSubject)
                })
                    .then(res => {
                        if (res.code = 20000) {
                            this.getSubjectData();
                        }
                    });
            },
            getSubjectData() {
                this.axios.get(api.getSubjectList)
                    .then(res => {
                        console.log(res);
                        this.data = res.data.data.list;
                    });
            },
            selectParent(e) {
                console.log(e);
            }
        }
    }
</script>

<style scoped>

</style>
