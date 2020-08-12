<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="教师名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="上传头像">
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8001//eduservice/oss/upload?host=teacherAvatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="form.avatar" :src="form.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import api from '../../../public/API';
    export default {
        name: "addTeacher",
        data() {
            return {
                form: {
                    name: '',
                    avatar: '',
                }
            }
        },
        created() {
            if (this.$route.query.id != undefined) {
                this.axios.get(api.getTeacherById + '/' + this.$route.query.id)
                    .then(res => {
                        console.log(res);
                        this.form=res.data.data.eduTeacher
                    });
            }
        },
        methods: {
            /*上传*/
            onSubmit() {
                if (this.$route.query.id != undefined) {
                    this.axios.post(api.updateTeacher + '/' + this.$route.query.id,this.form)
                        .then(res => {
                            console.log(res);
                        });
                } else {
                    this.axios.post(api.addTeacher, this.form)
                        .then(res => {
                            console.log(res);
                        });
                }
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                this.form.avatar = res.data.avatar;
            },

        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
