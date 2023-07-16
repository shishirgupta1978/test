from django.core.mail import send_mail
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.settings import DEFAULT_FROM_EMAIL
from .serializers import MyTokenObtainPairSerializer,MyTokenRefreshSerializer
from rest_framework_simplejwt.views import TokenViewBase,TokenRefreshView
from .models import Enquiry
from django.contrib.auth import get_user_model

User = get_user_model()



@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def send_enquiry_email(request):
    data = request.data

    try:
        subject = data["subject"]
        name = data["name"]
        email = data["email"]
        message = data["message"]
        from_email = data["email"]
        recipient_list = [DEFAULT_FROM_EMAIL]

        send_mail(subject, message, from_email, recipient_list, fail_silently=True)

        enquiry = Enquiry(name=name, email=email, subject=subject, message=message)
        enquiry.save()

        return Response({"success": "Your Enquiry was successfully submitted"})

    except:
        return Response({"fail": "Enquiry was not sent. Please try again"})






class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer