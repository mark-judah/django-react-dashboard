def build_filters(data):
    all_filters = {}
    if 'filters' in data:
        filters = data['filters']
        # Extract individual filter values
        end_year = filters.get('end_year', '')
        topic = filters.get('topic', '')
        sector = filters.get('sector', '')
        region = filters.get('region', '')
        pest = filters.get('pest', '')
        source = filters.get('source', '')
        country = filters.get('country', '')

        if end_year:
            all_filters['end_year__exact'] = end_year
        if topic:
            all_filters['topic__exact'] = topic
        if sector:
            all_filters['sector__exact'] = sector
        if region:
            all_filters['region__exact'] = region
        if pest:
            all_filters['pestle__exact'] = pest
        if source:
            all_filters['source__exact'] = source
        if country:
            all_filters['country__exact'] = country
    
    return all_filters