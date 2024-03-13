from django.urls import path
from . import views

urlpatterns = [
    path('check-tables', views.check_tables, name='check-tables'),
    path('seed', views.seed_data, name='seed-data'),
    path('get-topics', views.get_topics, name='get-topics'),
    path('get-likelihood-relevance-sources', views.get_likelihood_relevance_sources, name='get-likelihood-relevance-sources'),
    path('get-intensity', views.get_intensity, name='get-intensity'),
    path('get-countries', views.get_countries, name='get-countries'),
    path('get-regions', views.get_regions, name='get-regions'),
    path('get-years', views.get_years, name='get-years'),
    path('get-sectors', views.get_sectors, name='get-sectors'),
    path('get-pestle', views.get_pestle, name='get-pestle'),
    path('get-quick-stats', views.get_quick_stats, name='get-quick-stats'),
    path('get-all', views.get_all, name='get-all'),

]
