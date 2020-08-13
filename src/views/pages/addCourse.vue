<template>
    <div class="page padding20">
        <el-steps :active="active" finish-status="success" class="width100">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>

        <div class="width100">
            <!--步骤1-->
            <div class="width100 column" v-if="active==0">
                <!--课程名称-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">课程标题</div>
                    <el-input v-model="title" class="marginRight20"></el-input>
                </div>
                <!--课程分类-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">分类名称</div>
                    <el-select v-model="oneLevelSubject" placeholder="请选择" class="marginRight20" @change="getTwoLevelSubject">
                        <el-option v-for="(item,index) in data" :key="index" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="twoLevelSubject" placeholder="请选择" class="marginRight20">
                        <el-option v-for="(item,index) in twoLevelSubjectList" :key="index" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </div>
                <!--课程讲师-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">课程讲师</div>
                    <el-select v-model="teacherId" placeholder="请选择" class="marginRight20" @change="getTwoLevelSubject">
                        <el-option v-for="(item,index) in teacherList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
                <!--总课时-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">总课时</div>
                    <el-input-number v-model="courseNum" :min="1" :max="30"></el-input-number>
                </div>
                <!--课程介绍-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">课程介绍</div>
                    <el-input v-model="description" class="marginRight20"></el-input>
                </div>

                <!--上传封面-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">上传封面</div>
                    <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8001//eduservice/oss/upload?host=courseCover"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="cover" :src="cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>

            <!--步骤2-->
            <div class="width100" v-if="active==1">
                <el-tree :data="chapterList" :props="defaultProps"></el-tree>
            </div>

        </div>

        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

    </div>
</template>

<script>
    import api from "../../../public/API";

    export default {
        name: "addCourse",
        data() {
            return {
                active: 1,
                title: '',
                data: '',

                oneLevelSubject: '',
                twoLevelSubject: '',

                twoLevelSubjectList: [],

                teacherList: [],
                teacherId: '',

                courseNum: '',

                description: '',

                cover: '',

                courseId: '',
                chapterList: [],

                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
            };
        },
        created() {
            this.getSubjectData();
            this.getTeacherList();
            this.getChapterList();
        },
        methods: {
            next() {
                this.addCourselves();
                if (this.active++ > 2) this.active = 0;
            },
            getSubjectData() {
                this.axios.get(api.getSubjectList)
                    .then(res => {
                        console.log(res);
                        this.data = res.data.data.list;
                    });
            },
            getTwoLevelSubject() {

                this.twoLevelSubject = '';

                this.axios.post(api.getTwoSubjectList+'?parentId='+this.oneLevelSubject, {})
                    .then(res => {
                        console.log(res);
                        this.twoLevelSubjectList = res.data.data.list;
                    });
            },
            // 获取讲师
            getTeacherList() {
                this.axios.get(api.deleteTeacher)
                    .then(res => {
                        this.teacherList = res.data.data.teacher;
                    });
            },
            // 上传头像
            handleAvatarSuccess(res, file) {
                this.cover = res.data.avatar;
            },
            // 上传课程信息
            addCourselves() {
                this.axios.post(api.addCourse,
                    {
                        title: this.title,
                        subjectParentId: this.oneLevelSubject,
                        subjectId: this.twoLevelSubject,
                        teacherId: this.teacherId,
                        lessonNum: this.courseNum,
                        description: this.description,
                        cover: this.cover
                    })
                    .then(res => {
                        this.courseId = res.data.data.courseId;
                    });
            },
            // 获取课程章节信息
            getChapterList() {
                this.axios.get(api.getChapterInfo + '/' +'1293720858195886082')
                    .then(res => {
                        this.chapterList = res.data.data.list;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
