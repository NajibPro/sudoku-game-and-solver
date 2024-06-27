export default class Cell{
    private _digit: number | null;
    private _isFixed: boolean = false;

    constructor(d: number | null, f: boolean = false){

        if(d == null){
            this._digit = null;
            return
        }

        this._digit = (d > 9 || d < 1) ? null : d;
        this._isFixed = f;

    }

    set digit(value: number | null) {

        if(this._isFixed){
            throw Error("can not change the number inside a fixed cell")
        }

        if(value == null){
            this._digit = null;
            return
        }

        this._digit = (value > 9 || value < 1) ? null : value;
    }

    get digit(){
        return this._digit;
    }

    set isFixed(value: boolean) {
        if(this._digit == null && value == true){
            throw Error('cell value can not be fixed while the digit stored in it is null!!');
        }

        this._isFixed = value;
    }

    get isFixed(){
        return this._isFixed;
    }
}