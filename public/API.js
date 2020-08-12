const url = 'http://localhost:8001/eduservice/teacher/';
const rootUrl = 'http://localhost:8001';

let api = {
    getTeacherList: url + 'moreConditionPageList',
    deleteTeacher: url,
    addTeacher: url + 'addTeacher',
    getTeacherById:url+'getTeacherInfo',
    updateTeacher: url + 'updateTeacher',
    uploadAvatar: rootUrl + '/eduservice/oss/upload',
};

export default api
