<template>
  <div class="insert_div">
    <div class="test_title">alter_date_format</div>
    <input v-model="time" @keyup="call_keyup" placeholder="시간을 입력해주세요"/>
    <input v-model="n" @keyup="call_keyup" @keyup.enter="call_enter_click"  type="number" placeholder="n의 값을 입력하세요"/>
    <input type="button" @click="call_enter_click" value="계산"/>
    <div v-if="calc_time">
      <div>| 시간 | N | 답</div>
      <div>| {{this.time}} | {{this.n}} | {{this.calc_time}} |</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alter_date_format',
  data () {
    return {
      standard_value: 86400, // 24시간을 초로 변환한 값
      half_value: 43200, // 12시간을 초로 변환한 값
      time: "pm 01:30:21",
      second_time: '',
      calc_time: false,
      n: 1234567,
      PM: false,
    }
  },
  methods: {
    call_enter_click() {
      let val = this.time.toUpperCase().split('M')[0]

      switch(val) {
        case 'P': this.PM = true;
        default: this.calc_time = this.secondChange_calc();
      }

    },
    secondChange_calc() {
      let onlyTime = this.time.split(' ')[1]
      let hour = onlyTime.split(':')[0]
      let min = onlyTime.split(':')[1]
      let sec = onlyTime.split(':')[2]
      let sum
      
      hour = parseInt(hour)
      min = parseInt(min)
      sec = parseInt(sec)
      this.n = parseInt(this.n)

      hour *= 3600;
      min *= 60;
      sum = hour+min+sec;

      if(this.PM)
        sum += this.half_value

      sum += this.n

      let nHour,nMin, nSec, tmp;

      if(sum > this.standard_value) 
        sum %= this.standard_value

      nHour = parseInt(sum / 3600)
      tmp = nHour * 3600
      sum -= tmp

      nMin = parseInt(sum / 60)
      tmp = nMin * 60
      sum -= tmp

      if(nHour < 10)
        nHour = '0'+nHour
      if(nMin < 10)
        nMin = '0'+nMin
      if(sum < 10)
        sum = '0'+sum

      this.PM = false

      return nHour+':'+nMin+':'+sum
    },
    call_keyup() {
      this.calc_time = false
    }
  }
}
</script>

<!— Add "scoped" attribute to limit CSS to this component only —>
<style scoped>
 .test_title {
    text-align: center;
    font-weight: bold;
 }
</style>