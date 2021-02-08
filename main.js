//変数ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//初期値
const question = document.getElementById('question'); //質問を表示するidを取得
const form = document.forms.typing; //formの入力画面を取得
const timer = document.getElementById('timer'); //時間を表示するidを取得

//問題文
const textList = [
  'おはよう',
  'こんにちは',
  'おやすみなさい',
  'ごめんなさい',
  'いただきます',
];

let TIME = 50; //制限時間
let count = 0; //正解数の初期値
let state = true; //ユーザーの操作を制限

//関数ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//カウントダウンの処理
const countdown = setInterval(function() {  
  timer.textContent = '制限時間：' + --TIME + '秒';  //残り時間の表示
  if(TIME <= 0) finish(); //０秒になると終了する処理
}, 1000); //１秒ごとに実行

// //正解判定処理
form.addEventListener('keypress', function(e) {  
  //ゲーム判定処理
  if(!state) return;

  //正解判定処理
  if(form.text.value === question.textContent) {
    count++; //カウント＋１
    init();  //初期化
  } else {
    question.textContent = '間違いです！'; //不正解を表示
    setTimeout(function(){ init(); },1000)  //1秒後にinitを呼ぶ
  }
});

//初期化処理
function init() {
  const rnd = Math.floor(Math.random() * textList.length); // ①ランダムに問題を取得
  question.textContent = textList[rnd];// ②取得した問題を表示 
  form.text.value = '';// ③フォームの入力を空にする
  form.text.focus();  // ④フォーカスをテキストエリアへ
}

//終了処理
function finish() {
  clearInterval(countdown);
  question.textContent = '正解数は' + count + '個でした！';
  state = false;
}


//実行ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//初期化してスタート
init();