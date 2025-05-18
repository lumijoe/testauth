// 環境変数
function load_env() {
$env_path = ABSPATH . '.env'; // public/.env のパス（ABSPATH は WordPressルートのパス）
    if (file_exists($env_path)) {
$lines = file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
list($name, $value) = explode('=', $line, 2);
            $_ENV[trim($name)] = trim($value);
}
}
}
add_action('init', 'load_env');

// AJAX でログイン認証処理
function handle_login_check() {
// .env ファイルからユーザー名とパスワードを読み込む
$username = $\_ENV['CROBC_USERNAME'] ?? '';
$password = $\_ENV['CROBC_PASSWORD'] ?? '';

    // POSTデータで送られてきたユーザー名とパスワードをチェック
    $input_username = isset($_POST['username']) ? sanitize_text_field($_POST['username']) : '';
    $input_password = isset($_POST['password']) ? sanitize_text_field($_POST['password']) : '';

    // 認証処理
    if ($input_username === $username && $input_password === $password) {
        // 認証成功
        wp_send_json_success(); // 成功
    } else {
        // 認証失敗
        wp_send_json_error(); // エラー
    }

    wp_die(); // AJAX終了

}

add_action('wp_ajax_login_check', 'handle_login_check');
add_action('wp_ajax_nopriv_login_check', 'handle_login_check');
