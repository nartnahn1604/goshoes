from django.db import models

# Create your models here.
class Shoes(models.Model):
    ID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=500)
    Image = models.CharField(max_length=10000)
    Description = models.CharField(max_length=500)
    Price = models.FloatField(max_length=500)
    Color = models.CharField(max_length=10)