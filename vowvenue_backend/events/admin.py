# events/admin.py

from django.contrib import admin
from .models import Event # 

@admin.register(Event) # 
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'date', 'is_available', 'created_at')
    search_fields = ('title', 'location', 'description')
    list_filter = ('location', 'is_available', 'date')
   
