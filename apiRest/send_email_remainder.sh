#!/bin/bash

# Activar el entorno virtual
source /home/prueba/htdocs/PranaV1.0/apiRest/env/bin/activate

# Cambiar al directorio del proyecto
cd /home/prueba/htdocs/PranaV1.0/apiRest

# Crear el archivo de log con fecha y hora
LOG_FILE="/home/prueba/htdocs/PranaV1.0/apiRest/logs/send_email_$(date +'%Y-%m-%d_%H-%M-%S').log"

# Ejecutar el comando de Django y redirigir la salida a un archivo de log
python manage.py send_email_remainder >> "$LOG_FILE" 2>&1

# Desactivar el entorno virtual (opcional, ya que el script terminará)
deactivate