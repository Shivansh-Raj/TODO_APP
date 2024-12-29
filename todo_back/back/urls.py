from django.urls import path,include
from django.urls import path
from .views import TasksAPI
urlpatterns = [
    path('task_set/<int:taskid>', TasksAPI.as_view(), name = "get Recommendations"),
    # path('UserHistory/<int:show_id>', UserHistory.as_view(), name ="Adding to History"),
    # path('get_for_you', for_you, name ="For You"),
]