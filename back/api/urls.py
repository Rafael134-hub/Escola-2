from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),
    path('disciplinas', listar_disciplinas),
    path('turmas', listar_turmas),
    path('cursos', CursosView.as_view()),
    path('tipo_curso_choices', get_tipo_curso_choices),
    path('ambientes', listar_ambientes),
    path('periodo_choices', get_periodo),
    path('prof', ProfessoresView.as_view()),
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),
    path('disciplina/<int:pk>', DisciplinasDetailView.as_view()),
    path('turma/<int:pk>', TurmasDetailView.as_view()),
    path('curso/<int:pk>', CursosDetailView.as_view()),
    path('ambiente/<int:pk>', AmbientesDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

