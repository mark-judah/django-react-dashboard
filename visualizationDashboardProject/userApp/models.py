from django.db import models

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin

from django.utils.translation import gettext_lazy as translate
from django.utils.translation import gettext_lazy as translate
from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

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

    objects=BaseUserManager()
    def __str__(self):
        return self.email
    
  
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"


class UserManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, password, **extra_fields):
        if email:
            email = self.normalize_email(email)
            self.email_validator(self,email)
        else:
            raise ValueError(translate("An email address is required"))

        if not first_name:
            raise ValueError(translate("First name is required"))

        if not last_name:
            raise ValueError(translate("Last name is required"))

       

        user = User(email=email, first_name=first_name,
                          last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(
                translate("is staff must be true for the admin user"))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(
                translate("is superuser must be true for the admin user"))

        if extra_fields.get("is_verified") is not True:
            raise ValueError(
                translate("is verified must be true for the admin user"))
        
        user = self.create_user(email, first_name,
                          last_name,password, **extra_fields)
        user.save(using=self._db)
        return user


    def email_validator(self,email):
            try:
                validate_email(email)
            except ValidationError:
                raise ValueError(translate("Please enter a valid email address"))
