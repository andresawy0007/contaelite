<?php
/** Environment configuration for Conta Élite. */
$settings['trusted_host_patterns'] = [
  '^contaelite\.ddev\.site$',
  '^contaelite\.haridevelopers\.com$',
];
$settings['config_sync_directory'] = DRUPAL_ROOT . '/config/sync';
if (getenv('IS_DDEV_PROJECT') !== 'true') {
  $databases['default']['default'] = [
    'database' => getenv('DRUPAL_DB_NAME') ?: 'contaelite',
    'username' => getenv('DRUPAL_DB_USER') ?: 'contaelite',
    'password' => getenv('DRUPAL_DB_PASSWORD') ?: '',
    'host' => getenv('DRUPAL_DB_HOST') ?: 'localhost',
    'port' => getenv('DRUPAL_DB_PORT') ?: '3306',
    'driver' => 'mysql',
    'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
    'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
    'prefix' => '',
  ];
  $settings['hash_salt'] = getenv('DRUPAL_HASH_SALT') ?: '';
  $settings['file_private_path'] = getenv('DRUPAL_PRIVATE_PATH') ?: '../private';
}
