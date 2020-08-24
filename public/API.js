const url = 'http://localhost:8001/eduservice/teacher/';
const rootUrl = 'http://localhost:8001';

let api = {
    getTeacherList: url + 'moreConditionPageList',
    deleteTeacher: url,
    addTeacher: url + 'addTeacher',
    getTeacherById: url + 'getTeacherInfo',
    updateTeacher: url + 'updateTeacher',
    uploadAvatar: rootUrl + '/eduservice/oss/upload',
    getSubjectList: rootUrl + '/eduservice/subject/' + 'getAllSubject',
    addSubject: rootUrl + '/eduservice/subject/' + 'addSubject',
    getTwoSubjectList: rootUrl + '/eduservice/subject/' + 'getTwoLevelList',
    addCourse: rootUrl + '/eduservice/course/' + 'addCourse',
    getChapterList: rootUrl + '/eduservice/chapter/' + 'getChapterList',//查询课程的章节列表
    getCourseList: rootUrl + '/eduservice/course/' + 'getCourseList',
    getCouseInfo: rootUrl + '/eduservice/course/' + 'getCourseInfo',
    updateCourseInfo: rootUrl + '/eduservice/course/' + 'updateCourseInfo',
    addChapter: rootUrl + '/eduservice/chapter/' + 'addChapter',
    deleteChapter: rootUrl + '/eduservice/chapter/' + 'deleteChapter',//删除章节
    getChapterInfo: rootUrl + '/eduservice/chapter/' + 'getChapterInfo',//查询章节详情
    updateChapterInfo: rootUrl + '/eduservice/chapter/' + 'updateChapter', //修改章节信息
    deleteCourse: rootUrl + '/eduservice/course/' + 'deleteCourse', //删除课程
    addVideo: rootUrl + '/eduservice/video/' + 'addVideo', //添加视频
};

export default api
