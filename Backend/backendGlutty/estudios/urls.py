from django.urls import include, path
from rest_framework import routers
from .views import *

urlpatterns = [
    path("register/", register_analysis, name="register_analysis"),
    path("get-all-analysis/", get_all_analysis, name="get_all_analysis"),
    path("get-analysis/", get_analysis, name="get_analysis"),
    path("get-analysis-pdf/", get_analysis_pdf, name="get_analysis_pdf"),
    path("get-glutty-tips/", get_glutty_tips, name="get_glutty_tips"),
    path("get-initial-data/", get_initial_data, name="get_initial_data"),
    path("get-laboratories/", get_laboratories, name="get_laboratories"),
    path("save-medical-message/", save_medical_message, name="save_medical_message"),
    path("save-analysis-date/", save_analysis_date, name="save_analysis_date"),
    path("cancel-analysis-date/", cancel_analysis_date, name="cancel_analysis_date"),
    path("extract-values-pdf/", extract_medical_data, name="extract_values"),
    path("update-analysis/", update_analysis, name="update_analysis"),
    path("delete-analysis/", delete_analysis, name="delete_analysis"),
    path("get-statistics/", get_statistics, name="get_statistics"),
]