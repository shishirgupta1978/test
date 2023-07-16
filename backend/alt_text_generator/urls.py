from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [

    path('upload-document/', views.api_upload_document, name='api_upload_document'),

]


