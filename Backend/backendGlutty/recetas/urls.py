from django.urls import path
from .views import *

urlpatterns = [
    path("ask-chatbot/", ask_chatbot, name="ask_chatbot"),
    path("toggle-save-message/", toggle_save_message, name="add_favorite"),
    #path("get-message/", get_saved_message_by_id, name="get_saved_message_by_id"),
    path("get-all-messages/", get_saved_messages, name="get_saved_messages"),
]