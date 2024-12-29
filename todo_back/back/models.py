from django.db import models
from django.contrib.auth.models import User

class task(models.Model):
    username = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=100)
    priority = models.IntegerField()
    status = models.IntegerField(default=1)
    start_date = models.DateField(auto_now=True, auto_now_add=False, null=True)
    start_time = models.TimeField(auto_now=True, auto_now_add=False, null=True)
    end_date = models.DateField(auto_now=False, auto_now_add=False, null=True)
    end_time = models.TimeField(auto_now=False, auto_now_add=False, null=True)
    def __str__(self):
        return self.task_name



