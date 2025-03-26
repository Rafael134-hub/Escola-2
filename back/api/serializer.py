from rest_framework import serializers
from .models import *

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class DisciplinasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplinas
        fields = '__all__'

class TurmasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turmas
        fields = '__all__'


class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos
        fields = '__all__'

