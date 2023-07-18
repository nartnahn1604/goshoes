from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import json
from GOShoes.models import Shoes
from GOShoes.serializer import ShoesSerializer

# Create your views here.
@csrf_exempt
def index(request):
    if request.method == 'GET':
        shoeses = Shoes.objects.all()
        shoeses_serializers = ShoesSerializer(shoeses, many=True)
        context = {
            'data': shoeses_serializers.data,
        }
        return render(request, 'index.html', context)
        # return JsonResponse(shoeses_serializers.data, safe=False)
    elif request.method == 'POST':
        shoes_data = JSONParser().parse(request)
        shoes_serializers = ShoesSerializer(data=shoes_data)
        
        if shoes_serializers.is_valid():
            shoes_serializers.save()
            return JsonResponse('Added', safe=False)
        return JsonResponse('Failed', safe=False)