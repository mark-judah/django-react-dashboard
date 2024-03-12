import uuid 
from django.db import models

# Create your models here.
class news_item(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    title=models.TextField(blank=True, null=True)
    sector=models.CharField(max_length=100,blank=True, null=True)
    topic=models.CharField(max_length=100,blank=True, null=True)
    source=models.CharField(max_length=100,blank=True, null=True)
    url=models.TextField(blank=True, null=True)
    insight=models.TextField(blank=True, null=True)
    region=models.CharField(max_length=100,blank=True, null=True)
    country=models.CharField(max_length=100,blank=True, null=True)
    pestle=models.CharField(max_length=100,blank=True, null=True)
    relevance=models.CharField(max_length=100,blank=True, null=True)
    intensity=models.CharField(max_length=100,blank=True, null=True)
    impact=models.CharField(max_length=100,blank=True, null=True)
    likelihood=models.CharField(max_length=100,blank=True, null=True)
    added=models.DateTimeField(blank=True, null=True)
    published=models.DateTimeField(blank=True, null=True)
    start_year=models.CharField(max_length=100,blank=True, null=True)
    end_year=models.CharField(max_length=100,blank=True, null=True)
    
    def __str__(self):
        return self.title


