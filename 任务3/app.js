//import bar from './bar';
import Vue from 'vue';

var app = new Vue({
    el: '#app',
    data: {
        //message: ' Hello World , this is Jack !'
        newTodo: '',
        todoList: []
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
        }
    }


});