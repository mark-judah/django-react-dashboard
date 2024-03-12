from collections import Counter, OrderedDict
from datetime import datetime
import json
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view

from dashApp.models import news_item
from dashApp.jsondata import json_data
from django.core.serializers import serialize

# Create your views here.


@api_view(['POST'])
def seed_data(request):

    for i in json_data.jsondata:
        formatted_added_date = None
        formatted_published_date = None

        if i['start_year'] != '':
            added_date = datetime.strptime(i['added'], '%B, %d %Y %H:%M:%S')
            formatted_added_date = added_date.strftime('%Y-%m-%d %H:%M:%S')

        if i['published'] != '':
            published_date = datetime.strptime(
                i['published'], '%B, %d %Y %H:%M:%S')
            formatted_published_date = published_date.strftime(
                '%Y-%m-%d %H:%M:%S')

        news_item.objects.create(
            title=i['title'],
            sector=i['sector'],
            topic=i['topic'],
            source=i['source'],
            url=i['url'],
            insight=i['insight'],
            region=i['region'],
            country=i['country'],
            pestle=i['pestle'],
            relevance=i['relevance'],
            intensity=i['intensity'],
            impact=i['impact'],
            likelihood=i['likelihood'],
            added=formatted_added_date,
            published=formatted_published_date,
            start_year=i['start_year'],
            end_year=i['end_year'],
        )

    return HttpResponse('Database seeding complete', content_type='text/plain')


@api_view(['GET'])
def get_topics(request):
    topics = news_item.objects.values_list('topic')
    key_val = query_set_to_dict(topics)
    sorted_key_vals = OrderedDict(
        sorted(key_val.items(), key=lambda item: item[1], reverse=True))
    return HttpResponse(json.dumps(sorted_key_vals), content_type="application/json")


@api_view(['GET'])
def get_likelihood_relevance_sources(request):
    data = news_item.objects.all()
    result_list = list(data.values('likelihood', 'relevance', 'source'))
    sources = []
    for i in result_list:
        print(i['source'])
        sources.append(i['source'])
    sources_occurences = Counter(sources)

    sorted_key_vals = OrderedDict(
        sorted(sources_occurences.items(), key=lambda item: item[1], reverse=True))
    ordered_result_list = []
    for i in sorted_key_vals:
        average_likelihood = 0
        average_relevance = 0
        total_likelihood = 0
        total_relevance = 0
        data = {}
        for j in result_list:
            if j['source'] == i:
                if len(j['likelihood']) > 0:
                    total_likelihood = total_likelihood+int(j['likelihood'])
                if len(j['relevance']) > 0:
                    total_relevance = total_relevance+int(j['relevance'])
        average_likelihood = round(total_likelihood/sorted_key_vals[i], 2)
        average_relevance = round(total_relevance/sorted_key_vals[i], 2)

        data['source'] = i
        data['average_likelihood'] = average_likelihood
        data['average_relevance'] = average_relevance
        ordered_result_list.append(data)
    return HttpResponse(json.dumps(ordered_result_list), content_type="application/json")


@api_view(['GET'])
def get_intensity(request):
    data = news_item.objects.all()
    result_list = list(data.values('intensity', 'published', 'title'))
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    all_data = []
    print(result_list)
    for m in months:
        intensity_values = []
        titles = []
        years=[]
        object = {}
        for i in result_list:
            published = i['published']
            date_format = '%Y-%m-%d %H:%M:%S%z'
            if published != None:
                date_time = datetime.strptime(str(published), date_format)
                month = date_time.strftime('%b')
                if i['intensity'] != '':
                    if month == m:
                        print(month+m)                 
                        intensity_values.append(int(i['intensity']))
                        years.append(date_time.year)
                        titles.append(i['title'])
                        object['name'] = month
                        object['data'] = intensity_values
                        object['title'] = titles
                        object['year']=years
        all_data.append(object)

    return HttpResponse(json.dumps(list(all_data)), content_type="application/json")



@api_view(['GET'])
def get_countries(request):
    country = news_item.objects.values_list('country')
    key_val = query_set_to_dict(country)
    sorted_key_vals = OrderedDict(
        sorted(key_val.items(), key=lambda item: item[1], reverse=True))
    return HttpResponse(json.dumps(sorted_key_vals), content_type="application/json")


def get_regions(request):
    regions = news_item.objects.values_list('region')
    key_val = query_set_to_dict(regions)
    sorted_key_vals = OrderedDict(
        sorted(key_val.items(), key=lambda item: item[1], reverse=True))
    return HttpResponse(json.dumps(sorted_key_vals), content_type="application/json")

def get_years(request):
    values=[]
    data = news_item.objects.all()
    years = list(data.values('published'))
    for year in years:
        published = year['published']
        date_format = '%Y-%m-%d %H:%M:%S%z'
        if published != None:
            date_time = datetime.strptime(str(year['published']), date_format)
            values.append(date_time.year)
    occurences=Counter(values)
    return HttpResponse(json.dumps(occurences), content_type="application/json")

def get_sectors(request):
    sectors = news_item.objects.values_list('sector')
    key_val = query_set_to_dict(sectors)
    sorted_key_vals = OrderedDict(
        sorted(key_val.items(), key=lambda item: item[1], reverse=True))
    return HttpResponse(json.dumps(sorted_key_vals), content_type="application/json")

def get_pestle(request):
    pestle = news_item.objects.values_list('pestle')
    key_val = query_set_to_dict(pestle)
    sorted_key_vals = OrderedDict(
        sorted(key_val.items(), key=lambda item: item[1], reverse=True))
    return HttpResponse(json.dumps(sorted_key_vals), content_type="application/json")

def get_quick_stats(request):
    data = news_item.objects.all()
    year_values=[]
    country_values=[]
    region_values=[]
    source_values=[]

    all_data={}

    sources = list(data.values('source'))
    years = list(data.values('published'))
    countries = list(data.values('country'))
    regions = list(data.values('region'))

    for source in sources:
        if(source['source']!=''):
            source_values.append(source['source'])
    most_used_source=max(Counter(source_values),key=Counter(source_values).get)
    source_occurences=Counter(source_values)
    most_used_source_value=source_occurences.get(most_used_source)
    
    for year in years:
        published = year['published']
        date_format = '%Y-%m-%d %H:%M:%S%z'
        if published != None:
            date_time = datetime.strptime(str(year['published']), date_format)
            year_values.append(date_time.year)
    most_covered_year=max(Counter(year_values),key=Counter(year_values).get)
    year_occurences=Counter(year_values)
    most_covered_year_value=year_occurences.get(most_covered_year)

    for country in countries:
        if(country['country']!=''):
            country_values.append(country['country'])
    most_covered_country=max(Counter(country_values),key=Counter(country_values).get)
    country_occurences=Counter(country_values)
    most_covered_country_value=country_occurences.get(most_covered_country)

    for region in regions:
        if(region['region']!=''):
            region_values.append(region['region'])
    
    most_covered_region=max(Counter(region_values),key=Counter(region_values).get)
    region_occurences=Counter(region_values)
    most_covered_region_value=region_occurences.get(most_covered_region)

   
    
   


    all_data[most_used_source]=most_used_source_value
    all_data[most_covered_year]=most_covered_year_value
    all_data[most_covered_country]=most_covered_country_value
    all_data[most_covered_region]=most_covered_region_value

    return HttpResponse(json.dumps(all_data), content_type="application/json")




def query_set_to_dict(query_set):
    all_data = []

    for item in query_set:
        all_data.append(item)

    keys = Counter(all_data).keys()
    keys_list = []
    for i in keys:
        keys_list.append(str(i)[1:-1].replace("'", "").replace(",", ""))
    vals = Counter(all_data).values()

    combined = zip(keys_list, vals)
    key_val = dict(combined)
    return key_val
