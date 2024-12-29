from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User 
from .serializers import userSerializer, TaskSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import task

class createUser(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = userSerializer



class createTask(generics.CreateAPIView):
    queryset = task.objects.all()
    # print("-------------------------------",queryset.to_dict(orient='records'))
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]


class TasksAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,taskid):
        try:
            user = request.user
            tasks = task.objects.filter(username=user)
            if tasks:
                serialized_tasks = TaskSerializer(tasks, many = True)
                return Response(serialized_tasks.data,status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'Not Task':"Hurahhh! you got no pending tasks:)"},status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'Error : ':e})

    def patch(self, request,taskid = None):
        try:
            user = request.user
            task_aim = task.objects.get(username = user, id = taskid)
            # print("valueeeee-------------------",request.data)
            task_serialize = TaskSerializer(task_aim, data = request.data, partial = True)
            if task_serialize.is_valid():
                updated_task = task_serialize.save()
                return Response({'Message':'Succesfully updated!!!!'})
            else:
                return Response(task_serialize.errors)
        except Exception as e:
            return Response({'Error : ': e})
    
    def delete(self, request, taskid):
        try:
            user = request.user
            task_aim = task.objects.get(id = taskid, user = user)
            task_aim.delete()
        except Exception as e :
            return Response({'Error : ', e})




