from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from account.views import send_enquiry_email,MyTokenObtainPairView,MyTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/send_enquery/", send_enquiry_email, name="send-enquiry"),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/alt-text-generator/', include('alt_text_generator.urls')),
]

urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Admin"
admin.site.site_title = "Admin Portal"
admin.site.index_title = "Welcome to the Admin Portal"

