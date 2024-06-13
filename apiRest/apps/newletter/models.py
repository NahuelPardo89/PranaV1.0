from django.db import models


class Newletter(models.Model):
    email = models.EmailField('Correo Electrónico', max_length=255, unique=True,)

    def __str__(self):
        return self.email