# Conta Élite

Drupal 11.4.11, DDEV y landing administrable basada en `Conta_Elite_Plantilla.html`.

## Desarrollo

```sh
cp sites/default/contaelite.settings.example.php sites/default/settings.php
ddev start
ddev composer install
ddev drush site:install minimal --site-name='Conta Élite' --account-name=admin
ddev drush en contaelite -y
ddev drush uli
```

Sitio: https://contaelite.ddev.site. No ejecutar `site:install` sobre una base existente.
Editar la página en `/admin/content` (Landing page), o mediante “Editar página” al iniciar sesión. Incluye el rol «Editor de Conta Élite» para delegar la edición. Los 230 campos personalizados se agrupan por sección y permiten editar textos, enlaces, etiquetas accesibles, logo, SEO y canales de contacto. WhatsApp requiere código de país. El logo original convertido se encuentra en `modules/custom/contaelite/assets/logo.webp`; la versión horizontal está en `logo-header.webp`.

El formulario conserva el comportamiento de demostración de la plantilla: valida en el navegador y no envía ni almacena datos. Para recibir solicitudes hace falta implementar la recepción y suministrar la política aprobada. Precios, perfiles y contacto conservan los pendientes originales y se editan desde el contenido.

## Producción

Dominio permitido: `contaelite.haridevelopers.com`. Apuntar el DNS al servidor, configurar el virtual host con esta raíz pública y un certificado TLS para ese dominio. Configurar PHP 8.3+, las extensiones requeridas por Drupal, MariaDB/MySQL y Composer.

Variables de entorno: `DRUPAL_DB_NAME`, `DRUPAL_DB_USER`, `DRUPAL_DB_PASSWORD`, `DRUPAL_DB_HOST`, `DRUPAL_DB_PORT`, `DRUPAL_HASH_SALT` (secreto aleatorio obligatorio) y `DRUPAL_PRIVATE_PATH` (fuera de la raíz pública).

Copiar `sites/default/contaelite.settings.example.php` a `sites/default/settings.php`. Desplegar código y dependencias con `composer install --no-dev --optimize-autoloader`, importar una copia de la base local y `sites/default/files` para conservar el contenido editable; ejecutar `vendor/bin/drush updatedb -y` y `vendor/bin/drush cr`. La configuración exportada no incluye el contenido ni los archivos. No copiar `settings.ddev.php` al servidor. Restringir la escritura a `sites/default/files` y la carpeta privada; denegar acceso web a archivos ocultos, vendor y configuración según `.htaccess` o reglas equivalentes en Nginx.

Para una instalación nueva, instalar Drupal y habilitar `contaelite`; su instalación crea los campos y el contenido inicial. No habilitar el módulo después de importar una base que ya lo tiene habilitado.

DNS, servidor remoto y TLS requieren acceso a la infraestructura de producción y no se provisionan desde este repositorio.

## Archivos que se versionan

Incluir `composer.json` y `composer.lock`, `.ddev/config.yaml`, el código de `modules/custom` y `themes/custom`, `config/sync`, las plantillas de configuración y esta documentación. `composer install` reconstruye Drupal core, las dependencias y los archivos de scaffold. Los archivos subidos y la base de datos se trasladan mediante copias de seguridad, fuera de Git.

Los archivos de core que estaban versionados se retiran del índice sin borrarlos del disco. En el siguiente commit aparecerán como eliminados del repositorio; después dejarán de aparecer como cambios.
