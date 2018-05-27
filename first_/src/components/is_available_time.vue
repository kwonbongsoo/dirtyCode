<template>
 <div class="test">
    <div class="test_title">is_available_time</div>
    <div class="test_desc">
        <p>사용해야하는 요일과 시간을 입력해주세요</p>
    </div>
    <div class="input_div">
        <input class="day" type="text" v-model="day" placeholder="요일입력 ex 월요일">
        <input class="time" v-model="time" placeholder="시간입력 ex 13:00">
        <input @click="day_time_result" class="input_btn" type="button" value="입력">
    </div>
 </div>
</template>

<script>
export default {
  name: 'is_available_time',
  data () {
    return {
      day: '',
      time: '',
      day_num: true,
      status: '',
      rules: {
        day_rule: [true,true,true,true,true,true,false], // 0번째부터 월 7까지 일요일이고, true면 가능한 요일이다.
        time_rule: [
                { start:'01:00', end:'12:00' }, //월
                { start:'01:00', end:'12:00' }, //화
                { start:'01:00', end:'12:00' }, //수
                { start:'22:00', end:'05:00' }, //목
                { start:'17:00', end:'20:00' }, //금
                { start:'00:00', end:'00:00' }, //토
                { start:'00:00', end:'00:00' } //일
            ], 
        //0번째 인덱스는 월요일, 안에 있는 또 하나의 배열은 0번째는 사용가능한 시작시간, 1번째는 끝나는 시간
      },
    }
  },
  methods: {
      day_time_result() {
        this.status = true;
        this.day_switch();
        if(!this.status) {
            alert('요일을 잘못입력')
            return
        }
        if(isNaN(this.time.split(':')[1]) == true) {
            alert('시간을 잘못 입력')
            return
        }
        if(isNaN(this.time.split(':')[0]) == true) {
            alert('시간을 잘못 입력')
            return
        }
        if(!~this.time.indexOf(':')) {
            alert('시간을 잘못 입력')
            return
        }
        this.calc_result()
      },
      day_switch() {
          switch (this.day) {
            case '월요일' : this.day_num = 0;break;
            case '화요일' : this.day_num = 1;break;
            case '수요일' : this.day_num = 2;break;
            case '목요일' : this.day_num = 3;break;
            case '금요일' : this.day_num = 4;break;
            case '토요일' : this.day_num = 5;break;
            case '일요일' : this.day_num = 6;break;
            default: this.status = false;
        }
      },
      check_(start_rule_hour, end_rule_hour, hour, day_exception, start_rule_min, end_rule_min, min, result) {
          if(start_rule_hour == end_rule_hour && start_rule_min == end_rule_min) {
                result = false
              if(start_rule_hour == 0)
                result = true
              return result
          }
          if (start_rule_hour <= hour && end_rule_hour >= hour && !day_exception) {
                if(start_rule_hour == hour) {
                    if( start_rule_min <= min && min < 60 ) 
                        result = true
                    else
                        result = false
                }
                else if (end_rule_hour == hour) {
                    if( end_rule_min >= min && min < 60 )
                        result = true
                    else
                        result = false
                }
                else
                    result = true
                
            } 
            else
                result = false
        return result
      },
      calc_result() {
        let result,hour, min, start_rule_hour, start_rule_min, end_rule_hour, end_rule_min, day_exception = false
        if(this.rules.day_rule[this.day_num]) {
            hour = this.time.split(':')[0]
            min = this.time.split(':')[1]
            start_rule_hour = this.rules.time_rule[this.day_num].start.split(':')[0]
            start_rule_min = this.rules.time_rule[this.day_num].start.split(':')[1]
            end_rule_hour = this.rules.time_rule[this.day_num].end.split(':')[0]
            end_rule_min = this.rules.time_rule[this.day_num].end.split(':')[1]

            let monday_exception = this.day_num
            if (this.day_num == 0)
                monday_exception = 6

            if (this.rules.time_rule[monday_exception].start.split(':')[0] >= this.rules.time_rule[monday_exception].end.split(':')[0] 
                &&  !this.check_(start_rule_hour, end_rule_hour, hour, day_exception, start_rule_min, end_rule_min, min, result)) {
                day_exception = true
                hour = parseInt(hour) + 24
            
                start_rule_hour = this.rules.time_rule[monday_exception].start.split(':')[0]
                start_rule_min = this.rules.time_rule[monday_exception].start.split(':')[1]
                end_rule_hour = this.rules.time_rule[monday_exception].end.split(':')[0]
                end_rule_hour = parseInt(end_rule_hour)+24
                end_rule_min = this.rules.time_rule[monday_exception].end.split(':')[1]
                if(day_exception && hour <= end_rule_hour && min <= end_rule_min) 
                    result = true
                else
                    result = false
            } // ex) 영업시간이 목요일 22:00 부터  금요일 새벽 5:00 까지할때와 입력한 시간과 요일로 사용가능하지 않은 시간일 때 예외검사를 하기 위해 만듬
            // check_함수에서 리턴이 false일때 무조건들어온다는 점에서 효율적이지 못한 코드 인데, 다른방법은 생각이 나지 않아서.. ㅠㅠ
            else
                result = true
            //check_에서 result로 true 가 리턴됬을 때 이 else에 들어오기 때문에 이렇게 처리함
        }else 
            result = false
        alert(result)
      } 
  }
}
</script>

<style scoped>
.test {
    margin: 1rem;
}
.test>.test_title {
    text-align: center;
    font-weight: bold;
}
.test_desc, {
    padding: 1rem 0;
}
.day, .time {
    width: 35%;
}
.input_btn {
    width: 20%;
}
.input_div {
    margin-top: 1rem;
}
</style>
