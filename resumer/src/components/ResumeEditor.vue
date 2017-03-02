<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}"
          @click="selected = item.field">
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resume.config" v-show="item.field === selected">
        <div class="resumeField" v-for="(value, key) in resume[item.field]">
          <label>{{key}}</label>
          <input type="text" v-model="resume[item.field][key]">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
    export default{
      name: 'ResumeEditor',
      data(){
          return{
            selected: 'profile',
            resume:{
                visibleItems: ['profile', 'work history', 'education', 'projects', 'awards', 'contacts', 'others'],
              config: [
                { field: 'profile', icon: 'id' },
                { field: 'work history', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' },
              ],
              profile: {
                    name: '',
                    city: '',
                    title: ''
                },
                'work history': [
                  {company: 'AL', content:'我的第二份工作是'},
                  {company: 'TX', content: '我的第一份工作是'},
                ],
                education: [],
                projects: [],
                awards: [],
                contacts: [],
//                others: []
            }


          }
      }
    }
</script>

<style lang="scss" scoped>
  #resumeEditor {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;

  >
  nav {
    width: 80px;
    background: black;
    color: white;

  >
  ol {

  >
  li {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;

  &
  .active {
    background: white;
    color: black;
  }

  }
  }
  }
  >
  .panels {
    flex-grow: 1;

  >
  li {
    padding: 24px;
  }

  }
  svg.icon {
    width: 24px;
    height: 24px;
  }

  ol {
    list-style: none;
  }

  .resumeField {

  >
  label {
    display: block;
  }

  input[type=text] {
    margin: 16px 0;
    border: 1px solid #ddd;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 40px;
    padding: 0 8px;
    }
 }
}
</style>
