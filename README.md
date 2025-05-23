# testauth

## login パターン

- html ファイル

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>クリックでログインフォーム表示</title>
    <style>
      #login-form {
        display: none;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        background: #fff;
        border: 2px solid #333;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        width: 300px;
      }

      #login-form .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
      }

      #overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
    </style>

  </head>
  <body>
    <h1>どこかをクリックするとログインフォームが出ます</h1>
    <h2>メニューです</h2>
    <nav>
      <ul>
        <li><a href="/about.html">aboutページへ</a></li>
        <li><a href="/company.html">companyページへ</a></li>
      </ul>
    </nav>

    <div id="overlay"></div>

    <div id="login-form">
      <button class="close-btn" id="close-btn">✕</button>
      <h2>ログイン</h2>
      <form>
        <label>ユーザー名：<br /><input type="text" name="username" /></label
        ><br /><br />
        <label
          >パスワード：<br /><input type="password" name="password" /></label
        ><br /><br />
        <button type="submit">ログイン</button>
      </form>
    </div>

    <script>
      // セッションストレージでログイン状態を管理
      function isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
      }
      function setLoggedIn() {
        sessionStorage.setItem("loggedIn", "true");
      }

      // 初回ロード時、ログイン済みならフォームもオーバーレイも非表示
      window.addEventListener("DOMContentLoaded", function () {
        if (isLoggedIn()) {
          document.getElementById("login-form").style.display = "none";
          document.getElementById("overlay").style.display = "none";
        }
      });

      // クリックでフォーム表示（何度でも→ログイン済みなら出さない）
      document.addEventListener("click", function (event) {
        const loginForm = document.getElementById("login-form");
        const overlay = document.getElementById("overlay");

        if (isLoggedIn()) return; // ログイン済みなら何もしない
        if (loginForm.contains(event.target) || overlay.contains(event.target))
          return;

        loginForm.style.display = "block";
        overlay.style.display = "block";
      });

      // ✕ボタンクリックで非表示にする
      document
        .getElementById("close-btn")
        .addEventListener("click", function (event) {
          document.getElementById("login-form").style.display = "none";
          document.getElementById("overlay").style.display = "none";
          event.stopPropagation();
        });

      // オーバーレイクリックでも閉じるようにする（オプション）
      document.getElementById("overlay").addEventListener("click", function () {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("overlay").style.display = "none";
      });

      // ログインフォーム送信時にセッションストレージへ保存
      document.querySelector("#login-form form").addEventListener("submit", function (event) {
        event.preventDefault();
        setLoggedIn();
        document.getElementById("login-form").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        // 必要ならここでログイン後の処理を追加
      });

      // 未ログイン時はaタグの遷移を防ぐ
      document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(event) {
          if (!isLoggedIn()) {
            event.preventDefault();
            alert('ログインしてください');
          }
        });
      });
    </script>

  </body>
</html>

- js ファイル(login.js)
  // セッションストレージでログイン状態を管理
  function isLoggedIn() {
  return sessionStorage.getItem("loggedIn") === "true";
  }
  function setLoggedIn() {
  sessionStorage.setItem("loggedIn", "true");
  }

// 初回ロード時、ログイン済みならフォームもオーバーレイも非表示
window.addEventListener("DOMContentLoaded", function () {
if (isLoggedIn()) {
document.getElementById("login-form").style.display = "none";
document.getElementById("overlay").style.display = "none";
}
});

// クリックでフォーム表示（何度でも → ログイン済みなら出さない）
document.addEventListener("click", function (event) {
const loginForm = document.getElementById("login-form");
const overlay = document.getElementById("overlay");

if (isLoggedIn()) return; // ログイン済みなら何もしない
if (loginForm.contains(event.target) || overlay.contains(event.target))
return;

loginForm.style.display = "block";
overlay.style.display = "block";
});

// ✕ ボタンクリックで非表示にする
document
.getElementById("close-btn")
.addEventListener("click", function (event) {
document.getElementById("login-form").style.display = "none";
document.getElementById("overlay").style.display = "none";
event.stopPropagation();
});

// オーバーレイクリックでも閉じるようにする（オプション）
document.getElementById("overlay").addEventListener("click", function () {
document.getElementById("login-form").style.display = "none";
document.getElementById("overlay").style.display = "none";
});

// ログインフォーム送信時にセッションストレージへ保存
document.querySelector("#login-form form").addEventListener("submit", function (event) {
event.preventDefault();
setLoggedIn();
document.getElementById("login-form").style.display = "none";
document.getElementById("overlay").style.display = "none";
// 必要ならここでログイン後の処理を追加
});

// すべての a タグのクリックを監視し、未ログインなら遷移を止める
document.querySelectorAll('a').forEach(function(link) {
link.addEventListener('click', function(event) {
if (!isLoggedIn()) {
event.preventDefault();
alert('ログインしてください');
}
});
});
