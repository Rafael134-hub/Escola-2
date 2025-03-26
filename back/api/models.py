from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=255)
    ocupacao = models.FloatField()
    
class Disciplinas(models.Model):
    nome_disciplina = models.CharField(max_length=255)
    codigo = models.CharField(max_length=255)
    carga_horaria = models.IntegerField()

class Turmas(models.Model):
    codigo = models.CharField(max_length = 255)
    turma = models.CharField(max_length = 255)

    
class Cursos(models.Model):

    TIPOS_CURSO = [
        ("CT", "Curso técnico"), 
        ("CAI", "Curso de aprendizagem industrial"), 
        ("CS", "Curso superior"), 
        ("FIC", "Curso avulso")
    ]
    
    codigo = models.CharField(max_length = 255)
    nome_curso = models.CharField(max_length = 255)
    tipo = models.CharField(max_length = 255, choices = TIPOS_CURSO)
    hora_aula = models.TimeField()
    sigla = models.CharField(max_length = 255)


class Ambientes(models.Model):

    PERIODO = [
        ("M", "Manhã"), 
        ("T", "Tarde"), 
        ("N", "Noite"), 
        ("S", "Sábado")
    ]

    codigo = models.CharField(max_length = 255)
    nome_sala = models.CharField(max_length = 255)
    capacidade = models.IntegerField()
    responsavel = models.CharField(max_length = 255)
    periodo = models.CharField(max_length = 255, choices = PERIODO)