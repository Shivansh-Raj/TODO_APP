from rest_framework import serializers
from django.contrib.auth.models import User
from .models import task

class userSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('username','password')
        extra_kwargs = {'password': {'write_only':True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ['username','task_name','status','priority', 'end_date','end_time']
        extra_kwargs = {'username':{'read_only':True}}
    
    def create(self, validated_data):
        try:
            user_name = self.context['request'].user
            validated_data['username'] = user_name
            return super().create(validated_data)
        except KeyError:
            raise serializers.ValidationError("No user found in the request context.")
    
    def update(self, task_instance, validated_data):
        # print("value-------------------",validated_data)
        try:
            for field, value in validated_data.items():
                if hasattr(task_instance, field):
                    setattr(task_instance, field, value)
                else:
                    raise serializers.ValidationError(f"Field '{field}' does not exist on task model.")
            task_instance.save()
            return task_instance
        except Exception as e:
            raise serializers.ValidationError(f"Error during update: {str(e)}")



