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
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        newTodo: '',
        todoList: [],
        currentUser: null
    },
    created: function(){
        this.currentUser = this.getCurrentUser();
        this.fetchTodos();

        // window.onbeforeunload = ()=>{
        //     let dataString = JSON.stringify(this.todoList); // 返回指定值的JSON
        //     window.localStorage.setItem('myTodos', dataString);
        //
        //     var AVTodos = AV.Object.extend('AllTodos'),
        //         avTodos = new AVTodos();
        //
        //     avTodos.set('content', dataString);
        //     avTodos.save().then(function(todo){
        //         console.log('保存成功')
        //     }, function(error){
        //         console.error('保存失败');
        //     });
        //     // debugger;
        // }
        //
        // let oldDataString = window.localStorage.getItem('myTodos');
        // let oldData = JSON.parse(oldDataString);
        // this.todoList = oldData || [];
        //
        // this.currentUser = this.getCurrentUser();
    },
    methods: {
        fetchTodos: function(){
            if(this.currentUser) {
                var query = new AV.Query('AllTodos');
                query.find()
                    .then((todos)=>{
                    let avAllTodos = todos[0]; //因为理论上 AllTodos 只有一个，所以我们取结果的第一项
                    let id = avAllTodos.id;
                    this.todoList = JSON.parse(avAllTodos.attributes.content);
                    this.todoList.id = id;// 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
                },function(error){
                    console.error(error);
                })
            }
        },
        updateTodos: function(){
            let dataString = JSON.stringify(this.todoList);
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
            avTodos.set('content', dataString);
            avTodos.save().then(()=>{
                console.log('更新成功')
            })
        },
        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList);
            var AVTodos = AV.Object.extend('AllTodos');
            var avTodos = new AVTodos();
            var acl = new AV.ACL();
            acl.setReadAccess(AV.User.current(),true);// 只读
            acl.setWriteAccess(AV.User.current(),true); //只写


            avTodos.set('content', dataString);
            avTodos.setACL(acl); //设置访问控制
            //avTodos.save().then(function(todo) {
            avTodos.save().then((todo) => {
                    this.todoList.id = todo.id;  // 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
                    // alert('保存成功');
                    console.log('保存成功')
            },function(error) {
                    alert('保存失败');
                });
            // })
        },
        saveOrUpdateTodos: function(){
                if(this.todoList.id){
                    this.updateTodos()
                }else{
                    this.saveTodos()
                }
            },
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().toDateString(),
                done: false  //添加一个 done 属性
            });
            this.newTodo = '';
            //console.log(this.todoList)
            this.saveTodos();
            this.saveOrUpdateTodos(); //不能用 saveTodos 了
        },
        removeTodo: function (todo) {
            let idx = this.todoList.indexOf(todo);
            this.todoList.splice(idx,1); //splice 删除从 index 开始的X个元素并返回数组,第三个参数可以是替换和添加元素加进来
            this.saveTodos();
            this.saveOrUpdateTodos() // 不能用 saveTodos 了
        },
        signUp: function(){
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser)=>{
                this.currentUser = this.getCurrentUser()
        }, (error)=>{
                alert('注册失败');
                console.log(error)
            });
        },
        login: function(){

            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=>{
                this.currentUser = this.getCurrentUser();
                this.fetchTodos(); // 登陆成功后读取 todos
        }, function(error){
                alert('登陆失败');
                consolo.log(error)
            })
        },
        getCurrentUser: function(){
            // let {id, createdAt, attributes: {username}} = AV.User.current();
            // return {id, username, createdAt};

            let current = AV.User.current();

            if(current){
                let {id, createdAt, attributes:{username}} = current;

                return {id, username, createdAt};
            }else{
                return null;
            }
        },
        logout: function(){
            AV.User.logOut();
            this.currentUser = null;
            window.location.reload();
        }
    }


});