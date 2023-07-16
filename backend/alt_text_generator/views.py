import datetime
from django.utils import timezone
from django.conf import settings
from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib import messages
from account.models import User
from django.contrib.auth.decorators import login_required
from .serializers import FigureSerializer, DocumentSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from alt_text_generator.alt_text_prediction import figure_predictions



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_upload_document(request):
    data={}

    data["source"]= request.FILES['source']
    data["type"]=request.POST.get('type')
    data["created_by"]=request.user.pk
    serializer = DocumentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        try:
            fig_list = figure_predictions(str(settings.MEDIA_ROOT)+serializer.data['source'].replace("/media/","/"))
            serializer.data["figure_list"]=fig_list
        except Exception as e:
            print(e)
            serializer.data["figure_list"]=[]
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
