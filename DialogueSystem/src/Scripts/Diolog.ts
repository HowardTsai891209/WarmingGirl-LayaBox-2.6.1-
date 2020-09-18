import Reader from "./Reader"
import commandReader from "./commandReader"
export default class DiaLab extends Laya.Scene{
    static instance: DiaLab;//若其他程式要調用 則必須宣告
    private word: number;//文本中 每一句話個別的字數
    public line: number;//文本中 句數
    public lineComplete: boolean;//判斷 這句話是否講完
    private splitted: string;//把文本拆開
    private showWord: number;//讓文本一字一字出現的函式
    public story: string[] = [""];//文本
    public chaNum: number;//文本中 名字的位置
    public findNext: number;//excel扣掉Command有幾列就要多少 用來找到下一個相同欄位
    public onlyOnce: boolean;//讓Reader取出文本的動作不要重複執行
    public faceNum: number;//文本中 表情的位置
    public comNum: number;//文本中command的位置
    public selNum: number;
    public waitNum: number;
    public Diolog: Laya.Label;//對話內容顯示區域
    public Name: Laya.Label; //名字顯示區域
    private reader: Reader;//讀文本
    private comReader: commandReader;
    public Face: Laya.Image;//表情顯示區域
    public Btn1: Laya.Button;
    public Btn2: Laya.Button;
    public Btn3: Laya.Button;
    
    createChildren():void {
        super.createChildren();
        this.loadScene("Msg");
    }
    
    constructor() {
        super();
        DiaLab.instance = this;
    }

    onEnable(): void {
        this.Diolog.on(Laya.Event.CLICK, this, this.ClickFn);
    }

    onAwake(): void {        
        this.reader = this.getComponent(Reader);
        this.comReader = this.getComponent(commandReader);
        this.onlyOnce = false;
        this.comNum = 8;
        this.chaNum = 10;
        this.line = 11;
        this.faceNum = 12;
        this.waitNum = 13;
        this.findNext = 7;
        this.word = 0;
        this.lineComplete = false;
        this.Btn1.visible = false;
        this.Btn2.visible = false;
        this.Btn3.visible = false;
        this.ShowWords();
    }   

    ShowWords(): void {//讓文本一字一字出現
        this.reader.read(this.chaNum);
        this.showWord = setInterval(() => {
            if(!this.reader.preload) return;
            this.splitted = this.story[this.line][this.word];//把文本拆開
            if (this.splitted == undefined) return; //運行到最後一字時 避免出錯  
            this.Diolog.text += this.splitted;
            this.word++;//跳下一個字            
            if (this.story[this.line][this.word] == undefined) {//判斷此句是否結束
                clearInterval(this.showWord);//關閉showWord
                this.lineComplete = true;
                this.comReader.showBtn();
            }
        }, 50);
    }

    isEnd(): void {//判斷這句話是否講完 & 文本是否全部講完
        if (this.story[this.line + this.findNext] == undefined) { //文本是否結束
            this.Diolog.off(Laya.Event.CLICK, this, this.ClickFn);//關閉點擊事件
            console.log("結束");
            return;
        } else if (this.story[this.line][this.word] == undefined) {//此句是否結束
            this.onlyOnce = true;
            this.word = 0;
            this.Diolog.text = "";
            this.line+=this.findNext;//下一句話
            this.chaNum+=this.findNext;//下一個人
            this.faceNum+=this.findNext;//下一個表情
            this.comNum+=this.findNext;//下一個指令
            this.waitNum+=this.findNext;
            return;
        }
    }

    ClickFn(): void {//點擊事件
        this.lineComplete = !this.lineComplete;
        if (this.lineComplete) {//文字還沒跳完時 點擊使他一次跳完
            clearInterval(this.showWord);
            this.word = this.story[this.line].length;//this.word = 此句最後一個字 (作為條件判斷是否進入下一句)
            this.Diolog.text = this.story[this.line];//.substring(0, this.story[this.line].length);//跳出完整句子
            this.lineComplete = true;
            this.comReader.showBtn();
        } else {//文字跳完時 點擊跳出下一句 並呼叫showWord
            this.isEnd();            
            this.ShowWords();
        }
    }       
  
    nameCase(name?: string): void {//抓取開頭代號 改變名字
        switch (name) {
            case "玩家小紅":
                this.Name.text = "小紅"
                break;
            case "元老-狼大":
                this.Name.text = "元老-狼大"
                break;
            case "":
                this.Name.text = ""
                break;
            case "D":
                this.Name.text = "D"
                break;
            case "E":
                this.Name.text = "E"
                break;
            case "F":
                this.Name.text = "F"
                break;
            case "G":
                this.Name.text = "G"
                break;
            case "H":
                this.Name.text = "H"
                break;
            case "I":
                this.Name.text = "I"
                break;
        }
    }
}