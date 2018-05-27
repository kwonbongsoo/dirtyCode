<template>
  <div id="app">
    <div>
      <div>클릭하시면 문제로 넘어가집니다</div>
      <ul>
        <li @click="alter_date_format()">alter-date-format</li>
        <li @click="is_available_time()">is-available-time</li>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    document.title = '지그재그 테스트'
  },
  methods: {
    alter_date_format() {
      this.$router.push('/alter_date_format');
    },
    is_available_time() {
      this.$router.push('/is_available_time');
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
