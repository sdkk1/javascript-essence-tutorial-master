/**
 * 問題：
 * 電卓の入力と同じような挙動をするチェーンメソッド
 * を作成してみましょう。
 * 
 * 例えば、次のように使用し、結果が表示
 * されるようにします。
 * 
 * 
 * 例１）
 * const calc = new Calculator();
 * 
 * calc.set(10)
 * .minus()
 * .set(3) -> '7'を出力(10 - 3)
 * 
 * 例２）
 * const calc = new Calculator();
 * 
 * calc.set(10)
 * 	.minus()
 * 	.set(3) -> '7'を出力
 * 	.mutiply()
 * 	.set(6) -> '42'を出力（10 - 3) * 6
 */

class Calculator {
	constructor() {
		this.value = null;
		this._calc;
	}

	set(arg) {
		if (this.value === null) {
			this.value = arg;
		} else {
			this._calc(this.value, arg);
		}
		return this
	}
	plus() {
		this._calc = (arg1, arg2) => {
			const result = arg1 + arg2;
			this._output(result);
		}
		return this
	}
	minus() {
		this._calc = (arg1, arg2) => {
			const result = arg1 - arg2;
			this._output(result);
		}
		return this
	}
	mutiply() {
		this._calc = (arg1, arg2) => {
			const result = arg1 * arg2;
			this._output(result);
		}
		return this
	}
	divide() {
		this._calc = (arg1, arg2) => {
			const result = arg1 / arg2;
			this._output(result);
		}
		return this
	}
	_output(result) {
		this.value = result;
		console.log(result);
	}
}

const calc = new Calculator();

calc.set(10)
	.minus()
	.set(3)
	.mutiply()
	.set(6)
	.divide()
	.set(2)
	.plus()
	.set(2)
