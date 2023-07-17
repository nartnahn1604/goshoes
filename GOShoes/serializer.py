from rest_framework import serializers
from GOShoes.models import Shoes

class ShoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shoes
        fields = ('ID', 'Name', 'Image', 'Description', 'Price', 'Color')