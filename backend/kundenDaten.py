import mysql.connector
from mysql.connector import Error

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='w01f678f.kasserver.com',            # z.B. 'mysql5.all-inkl.com'
            user='d0418500',    # dein MySQL-Benutzername
            password='Silleman1122.',     # dein MySQL-Passwort
            database='d0418500'    # deine MySQL-Datenbank
        )
        print("Verbindung zur Datenbank erfolgreich")
    except Error as e:
        print(f"Fehler beim Verbinden zur Datenbank: {e}")
    
    return connection

def fetch_data(connection):
    cursor = connection.cursor()
    select_query = "SELECT * FROM `Kunden-Tabelle`"  # Ändere 'benutzer' in den Namen deiner Tabelle
    cursor.execute(select_query)

    # Hole die Spaltennamen
    columns = [column[0] for column in cursor.description]

    rows = cursor.fetchall()

    kundenDaten=[]

    for row in rows:
        row_dict = dict(zip(columns, row))
        kundenDaten.append([row_dict['Kundennummer'],row_dict['Nachname'],row_dict['Name']])

    print('KundenDaten von allen Kunden: ',kundenDaten)

if __name__=="__main__":
    # Beispielaufruf
    conn = create_connection()

    # Beispielaufruf
    if conn:
        fetch_data(conn)
        conn.close()
        print("Datenbank wurde geschlossen!")
