from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Professor.objects.all()
        serializer = ProfessorSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            

class ProfessoresView(ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_disciplinas(request):
    if request.method == 'GET':
        queryset = Disciplinas.objects.all()
        serializer = DisciplinasSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DisciplinasSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            

class DisciplinasView(ListCreateAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsAuthenticated]

class DisciplinasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsAuthenticated]



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_turmas(request):
    if request.method == 'GET':
        queryset = Turmas.objects.all()
        serializer = TurmasSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TurmasSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            

class TurmasView(ListCreateAPIView):
    queryset = Turmas.objects.all()
    serializer_class = TurmasSerializer
    permission_classes = [IsAuthenticated]

class TurmasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Turmas.objects.all()
    serializer_class = TurmasSerializer
    permission_classes = [IsAuthenticated]



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_cursos(request):
    if request.method == 'GET':
        queryset = Cursos.objects.all()
        serializer = CursoSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CursoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            

class CursosView(ListCreateAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

class CursosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
def get_tipo_curso_choices(request):
    return Response(Cursos.TIPOS_CURSO)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_ambientes(request):
    if request.method == 'GET':
        queryset = Ambientes.objects.all()
        serializer = AmbienteSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AmbienteSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            

class AmbientesView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]

class AmbientesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
def get_periodo(request):
    return Response(Ambientes.PERIODO)

