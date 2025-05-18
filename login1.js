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
  
  // クリックでフォーム表示（ログイン済みなら出さない）
  document.addEventListener("click", function (event) {
    const loginForm = document.getElementById("login-form");
    const overlay = document.getElementById("overlay");
  
    if (isLoggedIn()) return;
    if (loginForm.contains(event.target) || overlay.contains(event.target)) return;
  
    loginForm.style.display = "block";
    overlay.style.display = "block";
  });
  
  // ✕ボタンで閉じる
  document.getElementById("close-btn").addEventListener("click", function (event) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    event.stopPropagation();
  });
  
  // オーバーレイクリックでも閉じる
  document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
  
  // フォーム送信時の処理（エラーメッセージ対応）
  document.querySelector("#login-form form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = event.target.username.value;
    const password = event.target.password.value;
    const errorDiv = document.getElementById("login-error");
  
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
  
    const formData = new FormData();
    formData.append('action', 'custom_login');
    formData.append('username', username);
    formData.append('password', password);
  
    fetch('/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLoggedIn();
          document.getElementById("login-form").style.display = "none";
          document.getElementById("overlay").style.display = "none";
        } else {
          errorDiv.textContent = data.data?.message || "ユーザーIDまたはパスワードが違います。再度入力してください。";
          errorDiv.style.display = "block";
        }
      })
      .catch(() => {
        errorDiv.textContent = "通信エラーが発生しました。しばらくしてから再度お試しください。";
        errorDiv.style.display = "block";
      });
  });
  
  // 未ログインなら a タグの遷移をブロック
  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      if (!isLoggedIn()) {
        event.preventDefault();
        alert('ログインしてください');
      }
    });
  });
  