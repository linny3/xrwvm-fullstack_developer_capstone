from django.contrib import admin
from .models import CarMake, CarModel


# Register your models here.

class CarMakeInline(admin.StackedInline):
    model = CarMake
    extra = 5

class CarModleInline(admin.StackedInline):
    model = CarModel
    extra = 5

admin.site.register(CarMake)
admin.site.register(CarModel)

