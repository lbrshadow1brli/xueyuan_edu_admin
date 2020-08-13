const url = 'http://localhost:8001/eduservice/teacher/';
const rootUrl = 'http://localhost:8001';

let api = {
    getTeacherList: url + 'moreConditionPageList',
    deleteTeacher: url,
    addTeacher: url + 'addTeacher',
    getTeacherById:url+'getTeacherInfo',
    updateTeacher: url + 'updateTeacher',
    uploadAvatar: rootUrl + '/eduservice/oss/upload',
    getSubjectList: rootUrl + '/eduservice/subject/' + 'getAllSubject',
    addSubject: rootUrl + '/eduservice/subject/' + 'addSubject',
    getTwoSubjectList: rootUrl + '/eduservice/subject/' + 'getTwoLevelList',
    addCourse: rootUrl + '/eduservice/course/' + 'addCourse',
    getChapterInfo: rootUrl + '/eduservice/chapter/' + 'getChapterVideo',
};

export default api
