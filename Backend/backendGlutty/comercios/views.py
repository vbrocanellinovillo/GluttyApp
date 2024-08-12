from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Commerce, Branch

# Create your views here.
def get_commerce_info(user):
    # Obtenemos el comercio asociado al usuario
    commerce = get_object_or_404(Commerce, user=user)
    
    # Información del comercio
    commerce_data = {
        "name": commerce.name,
        "cuit": commerce.cuit,
        "description": commerce.description,
    }
    
    # Información de las sucursales
    branches = Branch.objects.filter(commerce=commerce)
    branch_data = [
        {
            "name": branch.name,
            "location": branch.location,
            "phone": branch.phone,
            "optional_phone": branch.optional_phone,
            "separated_kitchen": branch.separated_kitchen,
            "just_takeaway": branch.just_takeaway
        } for branch in branches
    ]
    
    return commerce_data, branch_data