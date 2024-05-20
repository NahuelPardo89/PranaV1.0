@echo off
REM Activar el entorno virtual
call C:\Users\nanit\Desktop\devcord\PranaV1\venv\Scripts\activate.bat

REM Cambiar al directorio del proyecto
cd C:\Users\nanit\Desktop\devcord\PranaV1\PranaV1.0\apiRest

REM Ejecutar el comando de Django y redirigir la salida a un archivo de log
python manage.py send_email_remainder > output.log 2>&1

REM Desactivar el entorno virtual
deactivate