from django.db import models

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin

from django.utils.translation import gettext_lazy as translate
from .userManager import UserManager


class User(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(max_length=255,unique=True,verbose_name=translate("Email Address"))
    first_name=models.CharField(max_length=100,verbose_name=translate("First Name"))
    last_name=models.CharField(max_length=100,verbose_name=translate("Last Name"))
    
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_verified=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    date_joined=models.DateField(auto_now_add=True)
    last_login=models.DateTimeField(auto_now=True)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["first_name","last_name"]

    objects=UserManager()

    def __str__(self):
        return self.email
    
  
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"




