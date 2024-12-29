
from django.contrib import admin
from django.urls import path,include
from back.views import createUser, createTask
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register', createUser.as_view(),name='create user'),
    path('api/user/taskCreation', createTask.as_view(),name='create task'),
    path('api/token',TokenObtainPairView.as_view(), name='get user token'),
    path('api/token/refresh',TokenRefreshView.as_view(), name='get refresh token'),
    # path('api/token/', TokenObtainPairView.as_view(),name = 'get_token'),
    # path('api/token/refresh/', TokenRefreshView.as_view(),name = 'get-new-access token'),
    path('api/',include('back.urls')),
]
