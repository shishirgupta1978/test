from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Enquiry
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password","profile_pic","documents"]



class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "profile_pic",
            "documents",
            "is_staff",
            "first_name",
            "last_name"
        ]

    
    def to_representation(self, instance):
        representation = super(UserSerializer, self).to_representation(instance)
        if instance.is_superuser:
            representation["admin"] = True
        return representation


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = "__all__"




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        token['profile_pic'] = user.profile_pic.url if user.profile_pic else None
        token['first_name'] = user.first_name
        token['is_staff'] = user.is_staff
        return token


class MyTokenRefreshSerializer(TokenRefreshSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['profile_pic'] = user.profile_pic.url if user.profile_pic else None
        token['first_name'] = user.first_name
        token['is_staff'] = user.is_staff
        return token
