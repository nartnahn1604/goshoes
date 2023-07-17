from django.conf.urls import url
from GOShoes import views

urlpatterns = [
    url(r'', views.index)
]