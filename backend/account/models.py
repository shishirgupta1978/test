import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(verbose_name=_("Username"), max_length=255, unique=True)
    profile_pic = models.ImageField( upload_to='profile_pics/',null=True,blank=True)
    documents = models.FileField(upload_to='documents/',null=True,blank=True)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=50,blank=True,null=True)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=50,blank=True,null=True)
    email = models.EmailField(verbose_name=_("Email Address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.username

    @property
    def get_full_name(self):
        return f"{self.email}"

    def get_short_name(self):
        return self.username


class TimeStampedUUIDModel(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True





class Enquiry(TimeStampedUUIDModel):
    name = models.CharField(_("Your Name"), max_length=100)
    phone_number = models.IntegerField(blank=True,null=True )
    email = models.EmailField(_("Email"))
    subject = models.CharField(_("Subject"), max_length=100)
    message = models.TextField(_("Message"))

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Enquiries"
