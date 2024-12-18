from usuarios.models import User, Session, Celiac, Report, Block

# Lista de usernames a eliminar
USERNAMES = [
    'usu', 'foto', 'registrado', 'camara', 'ddionisio19', "dedio19",
"ddionisioo19",
"ddionisio19191",
"ddionisio",
"ddionisio19999",
"ddionisio20",
"ddionisio2020",
"Ddionisio22",
"Ddionisio222",
"Ddionisio2223",
"Ddionisio22234",
"dddioni19",
"ddddd",
"dddd1",
"ddddd19",
"ddddd18",
"Delfy19",
"delfyyyy",
"delfyna",
"delfinaaaaaasii",
"dlefyna",
"dddddddwii",
"delfynadionisio",
"delfynadionisio1",
"delfiiiiii19",
"dddddelfus",
"Delfuchis",
"delfiiiii1818",
"Delfuuuuchi",
"dididididdi",
"delfuchi123",
"delfuchu",
"Delfina19",
"delfii019",
"delfi192002",
"delfina22",
"Delfina23",
"Delfi24",
"delfi2024",
"gonfirpi",
"gonzalo",
"delfidionisio192002",
"nose",
"comerciardo",
"resto123",
"resto345",
"CieloCeliaco",
"almendra",
"usuariardo",
"deldel",
"Deldel1",
"Delfi19",
"Delfus",
"Delfus19",
"toxica",
"toxicas",
"toxicasa",
"toxicasasa",
"registered",
"regist",
"otherregisterr",
"delfina19",
"sofialmendraaa",
"sofialmendraaaa",
"sofialmendraaaaa",
"sofialmendraaaaaa",
"sofialmendrita",
"sofialmendraaaaaaa",
"soguita",
"sofia",
"solita",
"solitaaa",
"solitaaaa",
"solitaaaaa",
"nuevouser",
"hola",
]

for username in USERNAMES:
    try:
        user = User.objects.get(username=username)
        
        # Eliminar sesiones asociadas
        if hasattr(user, 'session'):
            user.session.delete()
            print(f"Sesión eliminada para el usuario {username}")

        # Eliminar datos específicos del usuario celíaco
        if hasattr(user, 'celiac'):
            user.celiac.delete()
            print(f"Datos de celiaco eliminados para el usuario {username}")

        # Eliminar reportes donde el usuario es reportado o creador
        reports_made = Report.objects.filter(reported_by=user)
        reports_received = Report.objects.filter(reported_user=user)
        reports_made.delete()
        reports_received.delete()
        print(f"Reportes eliminados para el usuario {username}")

        # Eliminar bloqueos asociados
        blocks = Block.objects.filter(user=user)
        blocks_made = Block.objects.filter(blocked_by=user)
        blocks.delete()
        blocks_made.delete()
        print(f"Bloqueos eliminados para el usuario {username}")

        # Finalmente, eliminar el usuario
        user.delete()
        print(f"Usuario {username} y todas sus relaciones han sido eliminados correctamente.")

    except User.DoesNotExist:
        print(f"Usuario {username} no encontrado.")
