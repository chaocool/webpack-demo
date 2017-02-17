//import bar from './bar';
import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = '0p5CPSv97HgBjDmPRqTkJF5K-gzGzoHsz';
var APP_KEY = '2PbwM4Qn9tax8D8uxExzPHhH';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


var app = new Vue({
    el: '#app',
    data: {
        //message: ' Hello World , this is Jack !'
        newTodo: '',
        todoList: [],
        currentUser: null,
        actionType: 'signUp',
        formData: {
                username: '',
                password: ''
        }
    },
    created: function(){
        window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList); // 返回指定值的JSON
            window.localStorage.setItem('myTodos', dataString);
        }

        let oldDataString = window.localStorage.getItem('myTodos');
        let oldData = JSON.parse(oldDataString);
        this.todoList = oldData || [];
    },
    methods: {
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().toDateString(),
                done: false  //添加一个 done 属性
            });
            this.newTodo = '';
            console.log(this.todoList)
        },
        removeTodo: function (todo) {
            let idx = this.todoList.indexOf(todo);
            this.todoList.splice(idx,1); //splice 删除从 index 开始的X个元素并返回数组,第三个参数可以是替换和添加元素加进来
        },
        signUp: function(){
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser)=>{
                this.currentUser = this.getCurrentUser()
            }, (error)=>{
                alert('注册失败')
            });
        },
        login: function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=>{
                this.currentUser = this.getCurrentUser()
            }, function(error){
                alert('登陆失败')
            });
        },
        getCurrentUser: function(){
            let{id, createdAt, attributes: {username}} = AV.User.current();
            return {id, username, createdAt};
        },
        logout: function(){
            AV.User.logOut();
            this.currentUser = null;
            window.location.reload();
        }
    }


});