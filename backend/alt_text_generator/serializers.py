from .models import Figure,Document
from rest_framework import serializers
from django.contrib.auth import get_user_model
from account.serializers import UserSerializer



User = get_user_model()


class DocumentSerializer(serializers.ModelSerializer):
    #created_by=UserSerializer()
    #date_created = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = Document
        fields = ["id", "source","type", "created_by","date_created"]



class CreateDocumentSerializer(serializers.ModelSerializer):
    #created_by=UserSerializer()
    #date_created = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = Document
        fields = ["id", "source","type", "created_by","date_created"]


class FigureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Figure
        fields = ["id",  "caption", "number", "document"]
