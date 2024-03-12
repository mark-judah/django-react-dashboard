from django.utils.translation import gettext_lazy as translate
from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError



class UserManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, password, **extra_fields):
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(translate("An email address is required"))

        if not first_name:
            raise ValueError(translate("First name is required"))

        if not last_name:
            raise ValueError(translate("Last name is required"))

       

        user = self.model(email=email, first_name=first_name,
                          last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
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
