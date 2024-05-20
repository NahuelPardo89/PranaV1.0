#!/bin/bash
# Activar el entorno virtual
source /home/prueba/htdocs/PranaV1.0/apiRest/env/bin/activate

# Cambiar al directorio del proyecto
cd /home/prueba/htdocs/PranaV1.0/apiRest

# Ejecutar el comando de Django
python manage.py send_email_remainder

# Desactivar el entorno virtual (opcional, ya que el script terminará)
deactivate