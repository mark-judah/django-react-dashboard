import json
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.core.serializers import serialize
from django.contrib.auth import authenticate, login
from django.utils.translation import gettext_lazy as translate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from userApp.models import UserManager


@api_view(['POST'])
def register(request):
    user_data = request.data
    print(user_data)

    user = UserManager.create_user(
        UserManager,
        user_data['email'],
        user_data['first_name'],
        user_data['last_name'],
        user_data['password'],
    )
    return HttpResponse(user)


@api_view(['POST'])
def login(request):
    print('here')

    user_data = request.data
    # authenticate user
    user = authenticate(
        username=user_data['email'], password=user_data['password'])
    if user is not None:
        # return token
        try:
            token = Token.objects.get(user_id=user.id)

        except Token.DoesNotExist:
            token = Token.objects.create(user=user)

        return JsonResponse({
            'token': token.key,

        })
    else:
        return HttpResponse(translate("Wrong username or password"), status=401)
