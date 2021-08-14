
<template>
  <div class="calculator">
    <div class="display" v-resize-text>
      <span >
        {{ current || "0" }}</span>
    </div>
    <div @click="clear" class="btn states">
      <span class="text">{{ clearToggle }}</span>
    </div>
    <div @click="sign" class="btn states">
      <span class="text">&plusmn;</span>
    </div>
    <div @click="percent" class="btn states">
      <span class="text">&percnt;</span>
    </div>
    <div
      @click="divide"
      v-bind:class="[operatorSelector === 1 ? 'borderOn' : '']"
      class="btn operator"
      title="Divide (or press /)"
    >
      <span class="text">&divide;</span>
    </div>
    <div @click="append(7)" class="btn"><span class="text">7</span></div>
    <div @click="append(8)" class="btn"><span class="text">8</span></div>
    <div @click="append(9)" class="btn"><span class="text">9</span></div>
    <div
      @click="multiply"
      v-bind:class="[operatorSelector === 2 ? 'borderOn' : '']"
      class="btn operator"
      title="Multiply (or press *)"
    >
      <span class="text">&times;</span>
    </div>
    <div @click="append(4)" class="btn"><span class="text">4</span></div>
    <div @click="append(5)" class="btn"><span class="text">5</span></div>
    <div @click="append(6)" class="btn"><span class="text">6</span></div>
    <div
      @click="subtract"
      v-bind:class="[operatorSelector === 3 ? 'borderOn' : '']"
      class="btn operator"
      title="Subtract (or press -)"
    >
      <span class="text">&minus;</span>
    </div>
    <div @click="append(1)" class="btn"><span class="text">1</span></div>
    <div @click="append(2)" class="btn"><span class="text">2</span></div>
    <div @click="append(3)" class="btn"><span class="text">3</span></div>
    <div
      @click="add"
      v-bind:class="[operatorSelector === 4 ? 'borderOn' : '']"
      class="btn operator"
      title="Add (or press +)"
    >
      <span class="text">&plus;</span>
    </div>
    <div @click="append(0)" class="btn zero"><span class="text">0</span></div>
    <div @click="decimal()" class="btn"><span class="text">.</span></div>
    <div @click="equal" class="btn operator" title="Equal (or press Return)">
      <span class="text">&equals;</span>
    </div>
  </div>
</template>
<script>
import ResizeText from 'vue-resize-text'

export default {
  directives: {
    ResizeText
 },
  data() {
    return {
      constant: null,
      previous: null,
      current: "",
      operator: null,
      operatorClicked: false,
      operatorSelector: null,
      clearToggle: "AC",
    };
  },
  methods: {
    clear() {
      this.current = "";
      this.clearToggle = "AC";
      this.operatorSelector = null;
      this.operator = null;
      this.operatorClicked = false;
      this.constant = null;
    },
    sign() {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      if (this.clearToggle === "AC") {
        this.clearToggle = "C";
      }
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    decimal() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    setPrevious() {
      this.operatorClicked = true;
      this.previous = this.current;
    },
    divide() {
      this.operator = (a, b) => a / b;
      this.operatorSelector = 1;
      this.setPrevious();
    },
    multiply() {
      this.operator = (a, b) => a * b;
      this.operatorSelector = 2;
      this.setPrevious();
    },
    subtract() {
      this.operator = (a, b) => a - b;
      this.operatorSelector = 3;
      this.setPrevious();
    },
    add() {
      this.operator = (a, b) => a + b;
      this.operatorSelector = 4;
      this.setPrevious();
    },
    equal() {
      if (!this.operatorClicked && !this.operatorSelector) {
        this.previous = this.current 
      }
      if (this.operatorSelector) {
        // Hitting eaqul repeats the previous operation with the returned value
        this.constant = this.current; // of previous operation.
        this.operatorSelector = null;
      }
      this.current = `${this.operator(
        parseFloat(this.previous),
        parseFloat(this.constant)
      )}`;
          this.setPrevious();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

.calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row: minmax(50px, auto);
  width: 235px;
  height: 320px;
  margin: 0 auto;
  gap: 1px;
  border: 1px black solid;
  border-radius: 10px;
  /* overflow: hidden; */
  box-shadow: 0px 10px 30px #999;
  color: white;
  background: rgb(85, 85, 85);
}

.display {
  grid-column: 1 / 5;
  background: rgb(87, 87, 92);
  color: white;
  text-align: right;
  font-size: 40px;
  display: flex;
  padding: 0 5px;
  width: 220px;
}

.display span {
  margin: auto 0 0 auto;
  display: flex;
}

.zero {
  grid-column: 1 / 3;
}

.text {
  margin: auto;
  font-size: 21px;
  font-family: "Roboto";
}

.btn {
  background: rgb(130, 130, 134);
  display: flex;
  cursor: pointer;
}
.states {
  background: rgb(95, 95, 99);
}
/* onclick notice */
.btn:active {
  background: rgb(184, 183, 185);
}
.states:active {
  background: rgb(130, 130, 134);
}

.operator {
  background: rgb(246, 158, 15);
  position: relative;
}
.operator:active {
  background: rgb(202, 126, 7);
}
.borderOn:after {
  /* Operator Selector */
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid black;
  cursor: pointer;
}
</style>
