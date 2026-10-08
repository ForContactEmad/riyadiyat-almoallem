<?php
// معالج نموذج التواصل — يعمل على Apache + PHP. عدّل القيمتين التاليتين:
const TO_EMAIL   = 'teacher@example.com';      // بريد المعلم الذي تصله الرسائل
const FROM_EMAIL = 'no-reply@example.com';     // بريد على نفس نطاق الموقع

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// رسائل الخطأ باللغتين (الحقل lang يرسله النموذج)
$L = (($_POST['lang'] ?? 'ar') === 'en') ? 'en' : 'ar';
$M = [
    'method' => ['ar' => 'طريقة غير مسموحة', 'en' => 'Method not allowed'],
    'wait'   => ['ar' => 'انتظر قليلًا قبل إرسال رسالة أخرى.', 'en' => 'Please wait a moment before sending another message.'],
    'fields' => ['ar' => 'الرجاء تعبئة الاسم والرسالة.', 'en' => 'Please fill in your name and message.'],
    'email'  => ['ar' => 'البريد الإلكتروني غير صحيح.', 'en' => 'The email address is not valid.'],
    'send'   => ['ar' => 'تعذّر إرسال الرسالة حاليًا.', 'en' => 'The message could not be sent right now.'],
];
$msg = fn(string $k) => $M[$k][$L];

function out(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false, 'error' => $msg('method')]);

// مصيدة الروبوتات: الحقل المخفي يجب أن يبقى فارغًا
if (!empty($_POST['website'])) out(200, ['ok' => true]);

// حد بسيط للإرسال: رسالة كل 30 ثانية لكل عنوان IP
$lock = sys_get_temp_dir() . '/rm_contact_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
if (is_file($lock) && time() - filemtime($lock) < 30) out(429, ['ok' => false, 'error' => $msg('wait')]);

$clean = fn($v) => trim(str_replace(["\r", "\n"], ' ', (string)($v ?? '')));
$name    = mb_substr($clean($_POST['name'] ?? ''), 0, 80);
$email   = mb_substr($clean($_POST['email'] ?? ''), 0, 120);
$topic   = mb_substr($clean($_POST['topic'] ?? ''), 0, 60);
$message = mb_substr(trim((string)($_POST['message'] ?? '')), 0, 3000);

if ($name === '' || mb_strlen($message) < 10) out(422, ['ok' => false, 'error' => $msg('fields')]);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) out(422, ['ok' => false, 'error' => $msg('email')]);

$subject = '=?UTF-8?B?' . base64_encode("رياضيات المعلم: $topic") . '?=';
$body    = "الاسم: $name\nالبريد: $email\nالنوع: $topic\nاللغة: $L\n\n$message\n";
$headers = implode("\r\n", [
    'From: ' . FROM_EMAIL,
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);

if (!mail(TO_EMAIL, $subject, $body, $headers)) out(500, ['ok' => false, 'error' => $msg('send')]);

touch($lock);
out(200, ['ok' => true]);
