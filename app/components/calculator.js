import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { performCalc }  from '../utils/performCalc'

export default class CalculatorComponent extends Component {

    @tracked liveDisplay = '';
    @tracked formulaDisplay = '';
    @tracked displayingFinalAnswer = false;

    @action updateNumber(event) {
        if(this.displayingFinalAnswer) {
            this.displayingFinalAnswer = false;
            this.formulaDisplay = '';
            this.liveDisplay = '';
        }
        this.liveDisplay += event.target.value;
    }

    @action clearDisplay(event) {
        if(event.target.value === 'AC') {
            this.formulaDisplay = '';
        }

        this.liveDisplay = '';
    }

    @action plusOrMinusToggle(event) {
        if(this.liveDisplay === '-') {
            this.liveDisplay = '';
        } else if(this.liveDisplay.length === 0) {
            this.liveDisplay = '-';  
        } 
    }

    @action insertOperator(event) {

        if(this.displayingFinalAnswer) {
            this.displayingFinalAnswer = false;
            this.formulaDisplay = '';
        }


        if(this.liveDisplay !== '') {
            if(event.target.value !== '=') {
                this.formulaDisplay += this.liveDisplay + event.target.value;
                this.liveDisplay = '';
            } else {
                this.formulaDisplay = this.formulaDisplay + this.liveDisplay; 
                let answer = performCalc(this.formulaDisplay);
                this.liveDisplay = answer;
                this.displayingFinalAnswer = true;
            }
            
        }
    }

   
}
