import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import Engine
from sqlalchemy import create_engine, event

load_dotenv()

# activate foreign_key constraint checking
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

# configure Session class with desired options
Session = sessionmaker()

# later, we create the engine
engine = create_engine(os.getenv("SQLITE_URI"), echo=True, future=True)

# associate it with our custom Session class
Session.configure(bind=engine)
