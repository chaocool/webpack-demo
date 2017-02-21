<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css';
  import './assets/reset.css';

  import Topbar from './components/Topbar';
  import ResumeEditor from './components/ResumeEditor';
  import ResumePreview from './components/ResumePreview';



  export default {
    name: 'app',
    data: function () {
        return {
          text: '你好'
        }
    },
    components: {Topbar, ResumeEditor, ResumePreview}
  }
</script>

<style>
  .page{
    height: 100vh;
    display: flex;
    flex-direction: column;  /*方向从左到右排列*/
    background: #EAEBEC;
  }
  .page>main{
    flex-grow: 1; /*定义项目的放大比例,如果为1 等分剩余空间*/
  }
  .page>main {
    min-width: 1024px;
    max-width: 1440px;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    /*justify-content: space-around; !*定义项目在主轴上的 对齐方式  space-around: 每个项目两侧的间隔相等。
                                      所以，项目之间的间隔比项目与边框的间隔大一倍。*/
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    align-self: center;
  }

  #resumeEditor{
    width: 35%;
    background: #444;
  }
  #resumePreview{
    /*width: 61.66667%;*/
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }

</style>
