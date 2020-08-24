<template>
    <div class="page padding20">
        <el-steps :active="active" finish-status="success" class="width100">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <!--列表-->
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
                    <el-select v-model="oneLevelSubject" placeholder="请选择" class="marginRight20"
                               @change="getTwoLevelSubject">
                        <el-option v-for="(item,index) in data" :key="index" :label="item.title"
                                   :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="twoLevelSubject" placeholder="请选择" class="marginRight20">
                        <el-option v-for="(item,index) in twoLevelSubjectList" :key="index" :label="item.title"
                                   :value="item.id"></el-option>
                    </el-select>
                </div>
                <!--课程讲师-->
                <div class="alignCenter marginTop20">
                    <div class="fontBlack14" style="width: 80px;">课程讲师</div>
                    <el-select v-model="teacherId" placeholder="请选择" class="marginRight20" @change="getTwoLevelSubject">
                        <el-option v-for="(item,index) in teacherList" :key="index" :label="item.name"
                                   :value="item.id"></el-option>
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
                <!--添加章节-->
                <div @click="addChapterDialogShow=true">添加章节</div>
                <!--列表-->
                <el-tree :data="chapterList" :props="defaultProps">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button type="text" size="mini" @click="showVideoDialog(data)">添加</el-button>
                            <el-button type="text" size="mini" @click="remove(node, data)">删除</el-button>
                            <el-button type="text" size="mini" @click="getChapterInfo(data)">修改</el-button>
                        </span>
                    </span>
                </el-tree>
            </div>
        </div>
        <!--下一步按钮-->
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        <!--添加章节弹出层-->
        <el-dialog title="章节信息" :visible.sync="addChapterDialogShow">

            <div class="width100 alignCenter">
                <div class="fontBlack14" style="width: 80px;">课程标题</div>
                <el-input v-model="chapterTitle" class="marginRight20" style="width: 200px"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addChapter">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改章节弹出层-->
        <el-dialog title="章节信息" :visible.sync="editDialogShow">

            <div class="width100 alignCenter">
                <div class="fontBlack14" style="width: 80px;">课程标题</div>
                <el-input v-model="chapterTitle" class="marginRight20" style="width: 200px"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editChapterInfo">确 定</el-button>
            </div>
        </el-dialog>

        <!--添加小节弹出层-->
        <el-dialog title="添加小节" :visible.sync="addVideoDialogShow">

            <div class="width100 alignCenter">
                <div class="fontBlack14" style="width: 80px;">小节标题</div>
                <el-input v-model="videoTitle" class="marginRight20" style="width: 200px"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addVideo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../../public/API";

    export default {
        name: "addCourse",
        data() {
            return {
                active: 0,
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

                addChapterDialogShow: false, //添加章节dialog
                chapterTitle: '', //课程标题
                editDialogShow: false, //修改章节dialog
                currentChapterId: '', // 修改章节的ID
                addVideoDialogShow: false, //添加章节dialog
                videoTitle: '', //小节标题
            };
        },
        created() {
            this.getSubjectData();
            this.getTeacherList();
            if (this.$route.query.id) {
                this.courseId = this.$route.query.id;
                this.getCourseInfo();
            }
        },
        methods: {
            next() {
                if (this.active == 0) {
                    if (this.$route.query.id) {
                        this.updateCourseInfo();
                    } else {
                        this.addCourselves();
                    }
                    this.getChapterList();
                } else if (this.active == 1) {
                } else {
                    return this.active = 0;
                }
                this.active++;
            },
            // 获取所有课程分类
            getSubjectData() {
                this.axios.get(api.getSubjectList)
                    .then(res => {
                        console.log(res);
                        this.data = res.data.data.list;
                    });
            },
            // 获取所选课程一级分类的二级分类
            getTwoLevelSubject() {

                this.twoLevelSubject = '';

                this.axios.post(api.getTwoSubjectList + '?parentId=' + this.oneLevelSubject, {})
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
            // 添加课程基本信息
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
                    }).then(res => {
                    this.courseId = res.data.data.courseId;
                });
            },
            // 获取课程章节列表
            getChapterList() {
                this.axios.get(api.getChapterList + '/' + this.courseId)
                    .then(res => {
                        this.chapterList = res.data.data.list;
                    });
            },
            // 获取课程详情
            getCourseInfo() {
                this.axios.get(api.getCouseInfo + '/' + this.courseId)
                    .then(res => {
                        console.log('课程详情数据');
                        console.log(res);
                        this.title = res.data.data.courseInfo.title;
                        this.description = res.data.data.courseInfo.description;
                        this.cover = res.data.data.courseInfo.cover;
                        this.courseNum = res.data.data.courseInfo.lessonNum;
                        this.oneLevelSubject = res.data.data.courseInfo.subjectParentId;
                        this.getTwoLevelSubject();
                        this.twoLevelSubject = res.data.data.courseInfo.subjectId;
                        this.teacherId = res.data.data.courseInfo.teacherId;
                    });
            },
            // 修改课程基本详情
            updateCourseInfo() {
                this.axios.post(api.updateCourseInfo,
                    {
                        id: this.courseId,
                        title: this.title,
                        subjectParentId: this.oneLevelSubject,
                        subjectId: this.twoLevelSubject,
                        teacherId: this.teacherId,
                        lessonNum: this.courseNum,
                        description: this.description,
                        cover: this.cover
                    }).then(res => {
                    console.log(res);
                });
            },
            // 添加章节
            addChapter() {
                this.axios.post(api.addChapter, {title: this.chapterTitle, coureseId: this.courseId})
                    .then(res => {
                        console.log(res);
                        this.addChapterDialogShow = false;
                        this.getChapterList();
                    });
            },
            // 删除章节
            remove(node, data) {
                console.log('删除的数据信息');
                console.log(data);
                this.axios.delete(api.deleteChapter + '/' + data.id)
                    .then(res => {
                        this.getChapterList();
                    });
            },
            // 获取章节信息
            getChapterInfo(data) {
                this.editDialogShow = true;
                console.log(data);
                // 获取章节详情
                this.axios.get(api.getChapterInfo + '/' + data.id)
                    .then(res => {
                        this.chapterTitle = res.data.data.ChapterInfo.title;
                        this.currentChapterId = res.data.data.ChapterInfo.id;
                    });
            },
            // 修改章节
            editChapterInfo() {
                this.axios.post(api.updateChapterInfo, {title: this.chapterTitle, id: this.currentChapterId})
                    .then(res => {
                        this.getChapterList();
                        this.editDialogShow = false;
                    });
            },
            // 弹出添加小节弹窗
            showVideoDialog(data) {
                console.log(data);
                this.addVideoDialogShow = true;
                this.currentChapterId = data.id;
            },
            // 添加小节
            addVideo() {
                this.axios.post(api.addVideo, {title: this.videoTitle, coureseId: this.courseId,
                    chapterId: this.currentChapterId})
                    .then(res => {
                        console.log(res);
                        this.getChapterList();
                    });
            }
        },
    }
</script>

<style scoped>

</style>
